import React, { useEffect, useState } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from 'office-ui-fabric-react/lib-commonjs/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib-commonjs/Styling';

import { SpinnerSize } from '@fluentui/react';

import { StyledContainer, StyledSpacing } from '../../components/tables/Table/Table.styles';
import { Box, Container } from './WorkPacketTable.styles';
import { EmptyState } from '../states';
import { Spinner } from '../../components/spinners/Spinner';
import { TableFilters } from './TableFilters';
import {
  NullHandling,
  PageableInput,
  SortDirection,
  SortOrderInput,
  WorkPacketStatus,
} from '../../data/services/graphql';
import { useWorkPacketColumns, WorkPacketColumns } from './WorkPacketColumns';
import { useQueryHandler } from '../../hooks/useQueryHandler';
import { useOrgSid } from '../../hooks/useOrgSid';
import { useTableFilters } from '../../hooks/useTableFilters';

type WorkPacketParams = {
  id: string;
  cols: WorkPacketColumns[];
  lazyQuery: any; // lazy query from the generated Apollo graphql.ts
  getItems: (data: any) => any[];
  searchTextPlaceholder: string;
  defaultSort?: SortOrderInput[];
  onItemsListChange?: (data: any, loading: boolean) => void;
};

const WorkPacketTable = ({
  id,
  cols,
  lazyQuery,
  getItems,
  searchTextPlaceholder,
  defaultSort,
  onItemsListChange,
}: WorkPacketParams) => {
  const { orgSid } = useOrgSid();

  const { searchText, startDate, endDate } = useTableFilters(searchTextPlaceholder);

  const [pagingParams, setPagingParams] = useState<PageableInput>({
    pageNumber: 0,
    pageSize: 100,
    sort: defaultSort,
  });

  const [apiCall, { data, loading, error }] = useQueryHandler(lazyQuery);

  const _doSort = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol) => column.key === currCol.key)[0];
    let sortParam: PageableInput = pagingParams;
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
    setPagingParams(sortParam);
  };

  const { initialColumns } = useWorkPacketColumns(cols, _doSort);

  const [columns, setColumns] = useState<IColumn[]>(initialColumns);

  useEffect(() => {
    apiCall({
      variables: {
        orgSid,
        searchText: searchText.delayedValue,
        dateRange: { rangeStart: startDate.value, rangeEnd: endDate.value },
        pageableInput: pagingParams,
      },
    });
  }, [orgSid, searchText.delayedValue, startDate.value, endDate.value, pagingParams]);

  useEffect(() => {
    if (onItemsListChange) {
      onItemsListChange(data, loading);
    }
  }, [data, loading]);

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
      return <span>Error: {error?.message || 'Something went wrong'}</span>;
    }

    if (loading) {
      return (
        <StyledSpacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading data" />
        </StyledSpacing>
      );
    }

    const items: WorkPacketStatus[] = getItems(data);

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
      <TableFilters id={id} searchText={searchText} startDate={startDate} endDate={endDate} />

      <Container>
        <Box id={`${id}_TableWrap`}>
          <StyledContainer id="Table_Detailed" style={{ width: '100%' }}>
            {renderTable()}
          </StyledContainer>
        </Box>
      </Container>
    </>
  );
};

export { WorkPacketTable };
