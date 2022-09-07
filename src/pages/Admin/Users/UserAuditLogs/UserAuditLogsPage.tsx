import React, { ReactElement, useState } from 'react';
import { Icon } from '@fluentui/react';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import {
  NullHandling,
  SortDirection,
  useUserAccountAuditLogsLazyQuery,
  UserAccountAuditLog,
  UserAccountAuditLogsQuery,
} from 'src/data/services/graphql';
import { tableFiltersToQueryParams, TableFiltersType, useTableFilters } from 'src/hooks/useTableFilters';
import { ROUTE_USER_AUDIT_LOGS } from 'src/data/constants/RouteConstants';
import { DownloadLink } from 'src/containers/tables/WorkPacketTable.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { UserAuditLogsColumn } from './UserAuditLogsTableColumn';
import { UserAuditLogsTable } from './UserAuditLogsTable';

const _UserAuditLogsPage = () => {
  const { orgSid } = useOrgSid();
  const [totalRecords, setTotalRecords] = useState(0);

  const tableFilters = useTableFilters('Extract Name, Status, Vendor, etc.', [
    {
      property: 'auditDateTime',
      direction: SortDirection.Desc,
      nullHandling: NullHandling.NullsFirst,
      ignoreCase: true,
    },
  ]);

  const mapData = (data?: UserAccountAuditLogsQuery) => {
    const items: UserAccountAuditLog[] = [];
    data?.userAccountAuditLogs?.nodes?.forEach((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  const getTotal = (data?: UserAccountAuditLogsQuery) => data?.userAccountAuditLogs?.paginationInfo?.totalElements ?? 0;

  const renderTotal = (totalRecords: number): ReactElement => <span>{totalRecords > 0 ? `${totalRecords} results found` : 'No results found'}</span>;

  const renderDownloadLink = (totalRecords: number, tableFilters: TableFiltersType): ReactElement => {
    const graphQLUrl = process.env.REACT_APP_API_SERVER;
    const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

    if (totalRecords > 0) {
      const filterString = tableFiltersToQueryParams(tableFilters);
      return (
        <DownloadLink
          target="_new"
          href={`${serverUrl}excel/userAuditLogs?orgSid=${orgSid}${filterString}`}
          title="Download results as Excel"
        >
          <Icon iconName="ExcelDocument" />
        </DownloadLink>
      );
    }

    return <span />;
  };

  return (
    <LayoutDashboard id="PageUserAuditLogs" menuOptionSelected={ROUTE_USER_AUDIT_LOGS.API_ID}>
      <PageHeader id="__UserAuditLogsHeader">
        <Container>
          <Row>
            <Column sm="6" direction="row">
              <PageTitle id="__User_Audit_Logs_Title" title="User Account Audit Logs" />
            </Column>
            <Column sm="6" right>
              <Text size="large" right>
                {renderDownloadLink(totalRecords, tableFilters)}
                {renderTotal(totalRecords)}
              </Text>
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
        onItemsListChange={(data) => {
          const total = getTotal(data);
          setTotalRecords(total);
        }}
      />
    </LayoutDashboard>
  );
};

const UserAuditLogsPage = React.memo(_UserAuditLogsPage);

export { UserAuditLogsPage };
