import React, { useEffect, useState } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  mergeStyleSets,
  ScrollablePane,
  ScrollbarVisibility,
} from '@fluentui/react';

import { StyledContainer } from 'src/components/tables/Table/Table.styles';
import { NullHandling, PageableInput, PaginationInfo, SortDirection } from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { Paginator } from 'src/components/tables/Paginator';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useWorkPacketColumns, WorkPacketColumns } from './WorkPacketColumns';
import { TableFilters } from './TableFilters';
import { EmptyState } from '../states';
import { Box, Container } from './WorkPacketTable.styles';
import { useHistory } from 'react-router-dom';

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
  const POLL_INTERVAL = 20000;
  const { orgSid } = useOrgSid();
  const history = useHistory();
  const handleError = ErrorHandler();

  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });

  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const [apiCall, { data, loading, error }] = useQueryHandler(lazyQuery);

  const apiPolling = pollingQuery
    ? pollingQuery({
        variables: {
          orgSid,
          searchText: tableFilters.searchText.delayedValue,
          dateRange: { rangeStart: tableFilters.startDate.value, rangeEnd: tableFilters.endDate.value },
          lastUpdated,
        },
        pollInterval: POLL_INTERVAL,
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

  const openDetails = (orgSid?: string | null, workOrderId?: string, tab?: string) => {
    // The rendering of the columns is only done upon initialization of the column
    // so we can't rely on state to change the parameters of the URL.
    // So we have to do this hack where we read the start date and end date parameters from the
    // url every time and not use any of the utilities we have to do so.

    // const startDate = yyyyMMdd(tableFilters.startDate.value);
    // const endDate = yyyyMMdd(tableFilters.endDate.value);

    const urlParams = new URLSearchParams(window.location.search);
    const startDate = urlParams.get('startDate');
    const endDate = urlParams.get('endDate');
    const hash = tab ? `#${tab}` : '';
    history.push(`/file-status/${workOrderId}?orgSid=${orgSid}&startDate=${startDate}&endDate=${endDate}${hash}`);
  };

  const { initialColumns } = useWorkPacketColumns(cols, openDetails, _doSort);

  const [columns, setColumns] = useState<IColumn[]>(initialColumns);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Reset the page number when any filtering occurs
    tableFilters.setPagingParams({
      pageNumber: 0,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
    // Ticket #6 - Only poll if today is included in the date range
    if ('stopPolling' in apiPolling) {
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      const todayMillis = today.getTime();
      const startDateMillis = tableFilters.startDate?.value
        ? tableFilters.startDate?.value?.getTime()
        : Number.POSITIVE_INFINITY;
      const endDateMillis = tableFilters.endDate?.value ? tableFilters.endDate?.value?.getTime() : 0;
      if (startDateMillis <= todayMillis && endDateMillis >= todayMillis) {
        apiPolling?.startPolling(POLL_INTERVAL);
      } else {
        apiPolling?.stopPolling();
      }
    }
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
    if (
      apiPolling.pollingData &&
      apiPolling.pollingData.workPacketStatusesPoll &&
      apiPolling.pollingData.workPacketStatusesPoll > 0
    ) {
      setLastUpdated(new Date());
    }
  }, [apiPolling.pollingData]);

  useEffect(() => {
    handleError(apiPolling.pollingDatapollingError);
  }, [apiPolling.pollingDatapollingError]);

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
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <DetailsList
            className={classNames.root}
            items={items}
            columns={columns}
            selectionMode={SelectionMode.none}
            setKey="none"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible
          />
        </ScrollablePane>
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
          <StyledContainer id="Table_Detailed" style={{ width: '100%', height: 'calc(100vh - 325px)' }}>
            {renderTable()}
          </StyledContainer>
          <Paginator pagingInfo={pagingInfo} onPageChange={onPageChange} />
        </Box>
      </Container>
    </>
  );
};

export default WorkPacketTable;
