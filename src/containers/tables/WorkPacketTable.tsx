import React, { useEffect, useState } from 'react';
import { PaginationInfo } from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { Paginator } from 'src/components/tables/Paginator';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useHistory } from 'react-router-dom';
import { UseFileStatusDetailsPanel } from 'src/pages/FileStatusDetails/useFileStatusDetailsPanel';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { ScrollableTable } from 'src/containers/tables/ScrollableTable';
import { useQueryParams } from 'src/hooks/useQueryParams';
import { useSortableColumns } from 'src/containers/tables/useSortableColumns';
import { useWorkPacketColumns, WorkPacketColumn } from './WorkPacketColumns';
import { TableFilters } from './TableFilters';
import { Box, Container } from './WorkPacketTable.styles';

type WorkPacketParams = {
  id: string;
  cols: WorkPacketColumn[];
  lazyQuery: any; // lazy query from the generated Apollo graphql.ts
  pollingQuery?: any; // lazy query to poll if there are any changes
  getItems: (data: any) => any[];
  tableFilters: TableFiltersType;
  useFileStatusDetailsPanel?: UseFileStatusDetailsPanel;
  onLoading: (loading: boolean) => void;
  onItemsListChange?: (data: any) => void;
  setContextualTitle?: (title: string) => void;
  routeId?: string;
  emptyTitle?: string;
  emptyDescription?: string;
};

export const WorkPacketTable = ({
  id,
  cols,
  lazyQuery,
  pollingQuery,
  getItems,
  tableFilters,
  onLoading,
  onItemsListChange,
  useFileStatusDetailsPanel,
  routeId,
  setContextualTitle,
  emptyTitle,
  emptyDescription,
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
  const QueryParams = useQueryParams();

  const openDetails = (fsOrgSid?: string | null, workOrderId?: string, tab?: string) => {
    // The rendering of the columns is only done upon initialization of the column
    // so we can't rely on state to change the parameters of the URL.
    // So we have to do this hack where we read the start date and end date parameters from the
    // url every time and not use any of the utilities we have to do so.

    const hash = tab ? `#${tab}` : '';
    const xParams = {
      workOrderId: workOrderId ?? '',
      fsOrgSid: fsOrgSid ?? '',
      tab: tab ?? 'enrollment',
      redirectUrl: true,
    };
    history.replace(QueryParams.merge(window.location, xParams));
    useFileStatusDetailsPanel?.showPanel(workOrderId ?? '', fsOrgSid ?? '', hash);
  };

  const { initialColumns } = useWorkPacketColumns(cols, openDetails);

  const { columns } = useSortableColumns(tableFilters, initialColumns());
  const [items, setItems] = useState<any[]>([]);

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
    : {};

  const onPageChange = (pageNumber: number) => {
    tableFilters.pagingParams.pageNumber = pageNumber;
    tableFilters.setPagingParams({
      pageNumber,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgSid, tableFilters.searchText.delayedValue, tableFilters.startDate.value, tableFilters.endDate.value]);

  useEffect(() => {
    if (tableFilters.startDate.value && tableFilters.endDate.value) {
      apiCall({
        variables: {
          orgSid,
          filter: {
            searchText: tableFilters.searchText.delayedValue,
            dateRange: {
              rangeStart: tableFilters.startDate.value,
              rangeEnd: tableFilters.endDate.value,
            },
            ...tableFilters.additionalFilters,
          },
          pageableInput: tableFilters.pagingParams,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgSid, tableFilters.pagingParams, tableFilters.additionalFilters, lastUpdated]);

  useEffect(() => {
    onLoading(loading);
    if (!loading) {
      if (onItemsListChange) {
        onItemsListChange(data);
      }
      const transFormedItems = getItems(data);
      setItems(transFormedItems);

      // update the paging info
      let newPagingInfo = data?.workPacketStatuses?.paginationInfo;
      if (!newPagingInfo) {
        newPagingInfo = data?.wpTransmissions?.paginationInfo;
      }
      if (!newPagingInfo) {
        newPagingInfo = data?.wpProcessErrors?.paginationInfo;
      }
      if (newPagingInfo) {
        setPagingInfo(newPagingInfo);
      }

      // update contextual page title
      if (data) {
        const key = Object.keys(data)[0];
        const listPageInfo = data?.[key]?.listPageInfo;

        if (listPageInfo && setContextualTitle) {
          if (routeId === ROUTES.ROUTE_ARCHIVES.ID) {
            setContextualTitle(listPageInfo.secondaryHeaderLabel);
          } else {
            setContextualTitle(listPageInfo.pageHeaderLabel);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  useEffect(() => {
    if (apiPolling.data && apiPolling.data.workPacketStatusesPoll && apiPolling.data.workPacketStatusesPoll > 0) {
      setLastUpdated(new Date());
    }
  }, [apiPolling.data]);

  useEffect(() => {
    handleError(apiPolling.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiPolling.error]);

  const hasMorePages = pagingInfo?.totalPages && pagingInfo.totalPages > 1;

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
          <div
            id="Table_Detailed"
            style={{ width: '100%', height: `calc(100vh - ${hasMorePages ? '325px' : '250px'})` }}
          >
            <ScrollableTable
              id={`${id}_Table`}
              columns={columns}
              items={items}
              error={error}
              emptyTitle={emptyTitle}
              emptyDescription={emptyDescription}
            />
          </div>
          <Paginator id="__Paginator" pagingInfo={pagingInfo} onPageChange={onPageChange} />
        </Box>
      </Container>
    </>
  );
};
