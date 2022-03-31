import React, { useEffect, useState } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  mergeStyleSets,
  ScrollablePane,
  ScrollbarVisibility,
  IComboBoxOption,
} from '@fluentui/react';

import { StyledContainer } from 'src/components/tables/Table/Table.styles';
import {
  NullHandling,
  PageableInput,
  PaginationInfo,
  SortDirection,
  UserAccountAuditEvent,
} from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { Paginator } from 'src/components/tables/Paginator';
import { useUserAuditLogsColumns, UserAuditLogsColumn } from './UserAuditLogsTableColumn';
import { TableFilters } from 'src/containers/tables/TableFilters';
import { EmptyState } from 'src/containers/states';
import { Box, Container } from 'src/components/layouts';

type UserAuditLogsTableParams = {
  id: string;
  cols: UserAuditLogsColumn[];
  lazyQuery: any; // lazy query from the generated Apollo graphql.ts
  getItems: (data: any) => any[];
  tableFilters: TableFiltersType;
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
}: UserAuditLogsTableParams) => {
  const { orgSid } = useOrgSid();

  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });

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

  const { initialColumns } = useUserAuditLogsColumns(cols, _doSort);

  const [columns, setColumns] = useState<IColumn[]>(initialColumns);
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
          changedByUserSid: tableFilters.changedByUserSid?.delayedValue.length ? tableFilters.changedByUserSid?.delayedValue : null,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgSid, tableFilters.pagingParams]);

  useEffect(() => {
    if (!loading) {
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

  const setComboBoxOptions = () => {
    let options: IComboBoxOption[] = [];
    options.push({ key: 'All', text: '(All Event Types Included)' });
    for (var enumMember in UserAccountAuditEvent) {
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
          <StyledContainer id="Table_Detailed" style={{ width: '100%', height: 'calc(100vh - 325px)' }}>
            {renderTable()}
          </StyledContainer>
          <Paginator pagingInfo={pagingInfo} onPageChange={onPageChange} />
        </Box>
      </Container>
    </>
  );
};
