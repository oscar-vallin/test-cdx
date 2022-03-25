import React, { ReactElement, useState } from 'react';
import { Icon } from '@fluentui/react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { UserAuditLogsTable } from './UserAuditLogsTable';
import {
  NullHandling,
  SortDirection,
  useUserAccountAuditLogsLazyQuery,
  UserAccountAuditLog
} from 'src/data/services/graphql';
import { UserAuditLogsColumn } from './UserAuditLogsTableColumn';
import { useTableFilters } from 'src/hooks/useTableFilters';

const _UserAuditLogsPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: 0, loading: true });

  const tableFilters = useTableFilters('Extract Name, Status, Vendor, etc.', [
    {
      property: 'auditDateTime',
      direction: SortDirection.Desc,
      nullHandling: NullHandling.NullsFirst,
      ignoreCase: true,
    },
  ]);

  const mapData = (data) => {
    const items: UserAccountAuditLog[] = [];
    data?.userAccountAuditLogs?.nodes?.forEach((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  
  return (
    <LayoutDashboard id="PageUserAuditLogs" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.API_ID}>
      <PageHeader id="__UserAuditLogsHeader">
        <Container>
          <Row>
            <Column sm="12" direction="row">
              <PageTitle id="__User_Audit_Logs_Title" title="User Account Audit Logs"/>
            </Column>            
          </Row>
        </Container>
      </PageHeader>

      <UserAuditLogsTable
        id="TableUserAuditLogs"
        cols={[
            UserAuditLogsColumn.DATETIME,
            UserAuditLogsColumn.USER,
            UserAuditLogsColumn.EVENT_TYPE,
            UserAuditLogsColumn.CHANGED_BY,
            UserAuditLogsColumn.NEW_VALUE,
            UserAuditLogsColumn.OLD_VALUE,
        ]}
        lazyQuery={useUserAccountAuditLogsLazyQuery}
        getItems={mapData}
        tableFilters={tableFilters}
        onItemsListChange={(data, loading) => {
          const total = data?.workPacketStatuses?.paginationInfo?.totalElements ?? 0;
          setTableMeta({ count: total, loading });
        }}
      />
    </LayoutDashboard>
  );
};

const UserAuditLogsPage = React.memo(_UserAuditLogsPage);

export { UserAuditLogsPage };
