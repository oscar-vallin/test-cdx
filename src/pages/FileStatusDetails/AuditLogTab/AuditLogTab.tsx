import {
  PaginationInfo,
  UserAccountAuditLog,
  useUserAccountAuditLogsLazyQuery,
  WorkPacketStatusDetails,
} from 'src/data/services/graphql';
import React, { useEffect, useState } from 'react';
import {
  UserAuditLogsColumn,
  useUserAuditLogsColumns,
} from 'src/pages/Admin/Users/UserAuditLogs/UserAuditLogsTableColumn';
import { ScrollableTable, useSortableColumns } from 'src/containers/tables';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { EmptyState } from 'src/containers/states';
import { Paginator } from 'src/components/tables/Paginator';

type AuditLogsTabType = {
  packet?: WorkPacketStatusDetails
};

export const AuditLogTab = ({ packet } : AuditLogsTabType) => {
  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });

  const { initialColumns } = useUserAuditLogsColumns([
    UserAuditLogsColumn.DATETIME,
    UserAuditLogsColumn.EVENT_TYPE,
    UserAuditLogsColumn.DETAILS,
    UserAuditLogsColumn.INITIATED_BY,
  ]);
  const tableFilters = useTableFilters('')
  const { columns } = useSortableColumns(tableFilters, initialColumns());
  const [items, setItems] = useState<UserAccountAuditLog[]>([]);

  const [apiCall, { data, loading, error }] = useUserAccountAuditLogsLazyQuery();

  const onPageChange = (pageNumber: number) => {
    tableFilters.pagingParams.pageNumber = pageNumber;
    tableFilters.setPagingParams({
      pageNumber,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
  };

  useEffect(() => {
    apiCall({
      variables: {
        orgSid: packet?.orgSid ?? '',
        workOrderId: packet?.workOrderId,
        dateRange: {
          rangeStart: '1970-01-01T00:00:00.000Z',
          rangeEnd: '3000-12-31T23:59:59.999Z',
        },
        pageableInput: tableFilters.pagingParams,
      },
    });
  }, [packet, tableFilters.pagingParams])

  useEffect(() => {
    if (!loading && data) {
      setItems(data.userAccountAuditLogs?.nodes ?? []);

      // update the paging info
      const newPagingInfo = data?.userAccountAuditLogs?.paginationInfo;
      if (newPagingInfo) {
        setPagingInfo(newPagingInfo);
      }
    }
  }, [data, loading]);

  if (!packet) {
    return <EmptyState title="No audit logs for this exchange" />;
  }

  return (
    <>
      <div
        id="__AuditLogs_Table_Wrap"
        style={{
          width: '100%',
          height: 'calc(100vh - 450px)',
          position: 'relative',
        }}
      >
        <ScrollableTable id="__AuditLogs_Table" columns={columns} items={items} error={error} />
      </div>
      <Paginator id="__AuditLog_Paginator" pagingInfo={pagingInfo} onPageChange={onPageChange} />
    </>
  );
};
