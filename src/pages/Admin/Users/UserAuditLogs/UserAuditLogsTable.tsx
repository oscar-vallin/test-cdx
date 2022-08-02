import React, { useEffect, useState } from 'react';
import { IComboBoxOption } from '@fluentui/react';

import { PaginationInfo, UserAccountAuditEvent, UserAccountAuditLogsQuery } from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { Paginator } from 'src/components/tables/Paginator';
import { Box, Container } from 'src/components/layouts';
import { useSortableColumns } from 'src/containers/tables/useSortableColumns';
import { TableFilters, ScrollableTable } from 'src/containers/tables';
import { prettyEnumValue } from 'src/utils/CDXUtils';
import { UserAuditLogsColumn, useUserAuditLogsColumns } from './UserAuditLogsTableColumn';

type UserAuditLogsTableParams = {
  id: string;
  cols: UserAuditLogsColumn[];
  lazyQuery: any; // lazy query from the generated Apollo graphql.ts
  getItems: (data: UserAccountAuditLogsQuery) => any[];
  tableFilters: TableFiltersType;
  onItemsListChange: (data: UserAccountAuditLogsQuery) => void;
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

  const { columns } = useSortableColumns(tableFilters, initialColumns());
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
        text: prettyEnumValue(UserAccountAuditEvent[enumMember]),
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
