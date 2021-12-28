import React, { useEffect, useState } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from 'office-ui-fabric-react/lib-commonjs/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib-commonjs/Styling';

import { StyledContainer } from '../../components/tables/Table/Table.styles';
import { Box, Container } from './WorkPacketTable.styles';
import { EmptyState } from '../states';
import { TableFilters } from './TableFilters';
import { NullHandling, PageableInput, PaginationInfo, SortDirection } from '../../data/services/graphql';
import { useWorkPacketColumns, WorkPacketColumns } from './WorkPacketColumns';
import { useQueryHandler } from '../../hooks/useQueryHandler';
import { useOrgSid } from '../../hooks/useOrgSid';
import { TableFiltersType } from '../../hooks/useTableFilters';
import { Paginator } from '../../components/tables/Paginator';
import { ErrorHandler } from '../../utils/ErrorHandler';

type WorkPacketParams = {
  id: string;
  cols: WorkPacketColumns[];
  lazyQuery: any; // lazy query from the generated Apollo graphql.ts
  pollingQuery?: any; // lazy query to poll if there are any changes
  getItems: (data: any) => any[];
  tableFilters: TableFiltersType;
  onItemsListChange?: (data: any, loading: boolean) => void;
};

export const WorkPacketTable = ({
  id,
  cols,
  lazyQuery,
  pollingQuery,
  getItems,
  tableFilters,
  onItemsListChange,
}: WorkPacketParams) => {
  const { orgSid } = useOrgSid();
  const handleError = ErrorHandler();

  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });

  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const [apiCall, { data, loading, error }] = useQueryHandler(lazyQuery);

  const { data: pollingData, error: pollingError } = pollingQuery
    ? pollingQuery({
        variables: {
          orgSid,
          searchText: tableFilters.searchText.delayedValue,
          dateRange: { rangeStart: tableFilters.startDate.value, rangeEnd: tableFilters.endDate.value },
          lastUpdated,
        },
        pollInterval: 20000,
      })
    : useState({});

  const _doSort = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol) => column.key === currCol.key)[0];
    let sortParam: PageableInput = tableFilters.pagingParams;
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        sortParam = {
          pageNumber: 0,
          pageSize: 100,
          sort: [
            {
              property: currColumn.key,
              direction: currColumn.isSortedDescending ? SortDirection.Desc : SortDirection.Asc,
              nullHandling: NullHandling.NullsFirst,
              ignoreCase: true,
            },
          ],
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    setColumns(newColumns);
    tableFilters.setPagingParams(sortParam);
  };

  const onPageChange = (pageNumber: number) => {
    tableFilters.pagingParams.pageNumber = pageNumber;
    tableFilters.setPagingParams({
      pageNumber,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
  };

  const { initialColumns } = useWorkPacketColumns(cols, _doSort);

  const [columns, setColumns] = useState<IColumn[]>(initialColumns);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Reset the page number when any filtering occurs
    tableFilters.setPagingParams({
      pageNumber: 0,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
  }, [orgSid, tableFilters.searchText.delayedValue, tableFilters.startDate.value, tableFilters.endDate.value]);

  useEffect(() => {
    if (tableFilters.startDate.value && tableFilters.endDate.value) {
      apiCall({
        variables: {
          orgSid,
          searchText: tableFilters.searchText.delayedValue,
          dateRange: { rangeStart: tableFilters.startDate.value, rangeEnd: tableFilters.endDate.value },
          pageableInput: tableFilters.pagingParams,
        },
      });
    }
  }, [orgSid, tableFilters.pagingParams, lastUpdated]);

  useEffect(() => {
    if (!loading) {
      if (onItemsListChange) {
        onItemsListChange(data, loading);
      }
      const transFormedItems = getItems(data);
      setItems(transFormedItems);

      // update the paging info
      const pagingInfo = data?.workPacketStatuses?.paginationInfo;
      if (pagingInfo) {
        setPagingInfo(pagingInfo);
      }
    }
  }, [data, loading]);

  useEffect(() => {
    if (pollingData && pollingData.workPacketStatusesPoll && pollingData.workPacketStatusesPoll > 0) {
      setLastUpdated(new Date());
    }
  }, [pollingData]);

  useEffect(() => {
    handleError(pollingError);
  }, [pollingError]);

  const renderTable = () => {
    const classNames = mergeStyleSets({
      root: {
        width: '100%',
      },

      headerDivider: {
        display: 'inline-block',
        height: '100%',
      },
    });

    if (error) {
      return <span id="__spanError">Error: {error?.message || 'Something went wrong'}</span>;
    }

    if (items && items.length > 0) {
      return (
        <DetailsList
          className={classNames.root}
          items={items}
          columns={columns}
          selectionMode={SelectionMode.none}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
        />
      );
    }

    return <EmptyState description="No data" filled={false} />;
  };

  return (
    <>
      <TableFilters
        id={id}
        searchText={tableFilters.searchText}
        startDate={tableFilters.startDate}
        endDate={tableFilters.endDate}
      />

      <Container>
        <Box id={`${id}_TableWrap`}>
          <StyledContainer id="Table_Detailed" style={{ width: '100%' }}>
            {renderTable()}
            <Paginator pagingInfo={pagingInfo} onPageChange={onPageChange} />
          </StyledContainer>
        </Box>
      </Container>
    </>
  );
};

export default WorkPacketTable;
