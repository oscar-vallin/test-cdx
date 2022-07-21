import React, { useEffect, useState } from 'react';
import { IComboBoxOption } from '@fluentui/react';

import { PaginationInfo, UserAccountAuditEvent, UserAccountAuditLogsQuery } from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { Paginator } from 'src/components/tables/Paginator';
import { TableFilters } from 'src/containers/tables/TableFilters';
import { Box, Container } from 'src/components/layouts';
import { useSortableColumns } from 'src/containers/tables/useSortableColumns';
import { ScrollableTable } from 'src/containers/tables/ScrollableTable';
import { UserAuditLogsColumn, useUserAuditLogsColumns } from './UserAuditLogsTableColumn';

type UserAuditLogsTableParams = {
  id: string;
  cols: UserAuditLogsColumn[];
  lazyQuery: any; // lazy query from the generated Apollo graphql.ts
  getItems: (data: UserAccountAuditLogsQuery) => any[];
  tableFilters: TableFiltersType;
  onItemsListChange: (data: UserAccountAuditLogsQuery) => void;
};

export const getEventTypeName = (eventType?: UserAccountAuditEvent): string => {
  if (!eventType) {
    return '';
  }

  switch (eventType) {
    case UserAccountAuditEvent.AccountCreation:
      return 'Account Creation';
    case UserAccountAuditEvent.Activation:
      return 'Activation';
    case UserAccountAuditEvent.ArchiveAccess:
      return 'Archive Access';
    case UserAccountAuditEvent.Deactivation:
      return 'Deactivation';
    case UserAccountAuditEvent.GroupAssignmentUpdate:
      return 'Group Assigment Update';
    case UserAccountAuditEvent.InactiveLoginAttempt:
      return 'Inactive Login Attempt';
    case UserAccountAuditEvent.LockedLoginAttempt:
      return 'Locked Login Attempt';
    case UserAccountAuditEvent.LoginFail:
      return 'Login Fail';
    case UserAccountAuditEvent.LoginSuccess:
      return 'Login Success';
    case UserAccountAuditEvent.Logout:
      return 'Logout';
    case UserAccountAuditEvent.PasswordUpdate:
      return 'Password Update';
    case UserAccountAuditEvent.ProfileUpdate:
      return 'Profile Update';
    case UserAccountAuditEvent.ResetPasswordRequested:
      return 'Reset Password Requested';
    case UserAccountAuditEvent.UserMigration:
      return 'User Migration';
    default:
      return '';
  }
};

export const UserAuditLogsTable = ({
  id,
  cols,
  lazyQuery,
  getItems,
  tableFilters,
  onItemsListChange,
}: UserAuditLogsTableParams) => {
  const { orgSid } = useOrgSid();

  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });

  const { initialColumns } = useUserAuditLogsColumns(cols);

  const { columns } = useSortableColumns(tableFilters, initialColumns(), ['auditDateTime', 'event']);
  // const [columns, setColumns] = useState<IColumn[]>(initialColumns);
  const [items, setItems] = useState<any[]>([]);

  const [apiCall, { data, loading, error }] = useQueryHandler(lazyQuery);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgSid, tableFilters.eventType?.delayedValue, tableFilters.startDate.value, tableFilters.endDate.value]);

  useEffect(() => {
    if (tableFilters.startDate.value && tableFilters.endDate.value) {
      apiCall({
        variables: {
          orgSid,
          dateRange: { rangeStart: tableFilters.startDate.value, rangeEnd: tableFilters.endDate.value },
          pageableInput: tableFilters.pagingParams,
          events: tableFilters.eventType?.delayedValue.length ? tableFilters.eventType?.delayedValue : null,
          changedUserSid: tableFilters.userSid?.delayedValue.length ? tableFilters.userSid?.delayedValue : null,
          changedByUserSid: tableFilters.changedByUserSid?.delayedValue.length
            ? tableFilters.changedByUserSid?.delayedValue
            : null,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgSid, tableFilters.pagingParams]);

  useEffect(() => {
    if (!loading && data) {
      onItemsListChange(data);
      const transFormedItems = getItems(data);
      setItems(transFormedItems);

      // update the paging info
      const newPagingInfo = data?.userAccountAuditLogs?.paginationInfo;
      if (newPagingInfo) {
        setPagingInfo(newPagingInfo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  const setComboBoxOptions = () => {
    const options: IComboBoxOption[] = [];
    options.push({ key: 'All', text: '(All Event Types Included)' });
    for (const enumMember in UserAccountAuditEvent) {
      options.push({
        key: UserAccountAuditEvent[enumMember],
        text: getEventTypeName(UserAccountAuditEvent[enumMember]),
      });
    }
    return options;
  };

  return (
    <>
      <TableFilters
        id={id}
        eventType={tableFilters.eventType}
        evenTypesDropdownItems={setComboBoxOptions()}
        startDate={tableFilters.startDate}
        endDate={tableFilters.endDate}
      />
      <Container>
        <Box id={`${id}_TableWrap`}>
          <div id="Table_Detailed" style={{ width: '100%', height: 'calc(100vh - 325px)' }}>
            <ScrollableTable id={`${id}_Table`} columns={columns} items={items} error={error} />
          </div>
          <Paginator id="__Paginator" pagingInfo={pagingInfo} onPageChange={onPageChange} />
        </Box>
      </Container>
    </>
  );
};
