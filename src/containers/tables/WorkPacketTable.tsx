import React, { useEffect, useState } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from 'office-ui-fabric-react/lib-commonjs/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib-commonjs/Styling';

import { useHistory, useLocation } from 'react-router-dom';
import { addDays, format, getHours, subDays } from 'date-fns';
import { SpinnerSize } from '@fluentui/react';
import { StyledContainer, StyledSpacing, StyledText } from '../../components/tables/Table/Table.styles';
import { Box, Column, Container, FilterSection, StyledRow } from './WorkPacketTable.styles';
import { InputText } from '../../components/inputs/InputText';
import { InputDateRange } from '../../components/inputs/InputDateRange';
import { Card } from '../../components/cards';
import { EmptyState } from '../states';
import { Spinner } from '../../components/spinners/Spinner';
import {
  NullHandling,
  PageableInput,
  SortDirection,
  SortOrderInput,
  WorkPacketStatus,
} from '../../data/services/graphql';
import { useWorkPacketColumns, WorkPacketColumns } from './WorkPacketColumns';
import { useDateValue } from '../../hooks/useDateValue';
import { useDelayedInputValue } from '../../hooks/useInputValue';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useQueryHandler } from '../../hooks/useQueryHandler';
import { useOrgSid } from '../../hooks/useOrgSid';

type WorkPacketParams = {
  id: string;
  cols: WorkPacketColumns[];
  lazyQuery: any; // lazy query from the generated Apollo graphql.ts
  getItems: (data: any) => any[];
  searchTextPlaceholder: string;
  defaultSort?: SortOrderInput[];
  onItemsListChange: (data: any, loading: boolean) => void;
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
  const doNothing = () => {};

  const QueryParams = useQueryParams();
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { orgSid } = useOrgSid();

  const hour = getHours(new Date());
  const startDate = useDateValue('Start Date...', hour < 9 ? subDays(new Date(), 1) : new Date());
  const endDate = useDateValue('End Date...', hour < 9 ? new Date() : addDays(new Date(), 1));
  const localInput = useDelayedInputValue('', searchTextPlaceholder, '', '');

  const [pagingParams, setPagingParams] = useState<PageableInput>({
    pageNumber: 0,
    pageSize: 100,
    sort: defaultSort,
  });

  const [apiCall, { data, loading, error }] = useQueryHandler(lazyQuery);

  const _addParamIfExists = (key, value) => (key ? { [key]: value } : {});

  const _pushQueryString = () => {
    const xParams = {
      ..._addParamIfExists('orgSid', orgSid),
      ..._addParamIfExists('filter', localInput.value),
      ..._addParamIfExists('startDate', format(startDate.value, 'yyyy-MM-dd')),
      ..._addParamIfExists('endDate', format(endDate.value, 'yyyy-MM-dd')),
    };

    location.search = QueryParams.stringify(xParams);

    history.replace(QueryParams.merge(location, xParams));
  };

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

  // Initialization
  useEffect(() => {
    if (urlParams.get('filter') != null) {
      localInput.setValue(urlParams.get('filter'));
    }

    const startDateParam = urlParams.get('startDate');
    if (startDateParam != null) {
      startDate.setValue(new Date(startDateParam));
    }

    const endDateParam = urlParams.get('endDate');
    if (endDateParam != null) {
      endDate.setValue(new Date(endDateParam));
    }
  }, []);

  useEffect(() => {
    _pushQueryString();
  }, [localInput.value, startDate.value, endDate.value]);

  useEffect(() => {
    apiCall({
      variables: {
        orgSid,
        searchText: localInput.delayedValue,
        dateRange: { rangeStart: startDate.value, rangeEnd: endDate.value },
        pageableInput: pagingParams,
      },
    });
  }, [orgSid, localInput.delayedValue, startDate.value, endDate.value, pagingParams]);

  useEffect(() => {
    onItemsListChange(data, loading);
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
      return <span>Error: {error}</span>;
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

    return <EmptyState description="None" filled={false} />;
  };

  return (
    <>
      <FilterSection id={`${id}-filters`}>
        <Container>
          <Card id={`${id}__SearchCard`} elevation="smallest" onClick="">
            <StyledRow>
              <Column lg="6">
                <Label>Search</Label>
                <InputText
                  id={`${id}__Card__Row__Input-Search`}
                  onKeyDown={doNothing}
                  onKeyEnter={doNothing}
                  autoFocus
                  disabled={false}
                  {...localInput}
                />
              </Column>
              <Column lg="6">
                <InputDateRange startDate={startDate} endDate={endDate} />
              </Column>
            </StyledRow>
          </Card>
        </Container>
      </FilterSection>

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
