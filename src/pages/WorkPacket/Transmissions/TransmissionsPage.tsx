import React, { ReactElement } from 'react';
import { Icon } from '@fluentui/react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { WorkPacketColumn } from 'src/containers/tables/WorkPacketColumns';
import { NullHandling, SortDirection, useWpTransmissionsLazyQuery, WpTransmission } from 'src/data/services/graphql';
import { tableFiltersToQueryParams, TableFiltersType } from 'src/hooks/useTableFilters';
import { DownloadLink } from 'src/containers/tables/WorkPacketTable.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { TableMetaData, WorkPacketListPage } from 'src/pages/WorkPacket/WorkPacketListPage';

export const TransmissionsPage = () => {
  const { orgSid } = useOrgSid();

  const getItems = (data) => {
    const items: WpTransmission[] = [];
    data?.wpTransmissions?.nodes?.forEach((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  const getTotal = (data) => data?.wpTransmissions?.paginationInfo?.totalElements ?? 0;

  const renderTotal = (tableMeta: TableMetaData) => {
    if (!tableMeta.loading && tableMeta.count !== null) {
      return <span>{tableMeta.count > 0 ? `${tableMeta.count} results found` : 'No results found'}</span>;
    }

    return <span />;
  };

  const renderDownloadLink = (tableMeta: TableMetaData, tableFilters: TableFiltersType): ReactElement => {
    const graphQLUrl = process.env.REACT_APP_API_SERVER;
    const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

    if (!tableMeta.loading && tableMeta.count > 0) {
      const filterString = tableFiltersToQueryParams(tableFilters);
      return (
        <DownloadLink
          target="_new"
          href={`${serverUrl}excel/transmissions?orgSid=${orgSid}${filterString}`}
          title="Download results as Excel"
        >
          <Icon iconName="ExcelDocument" />
        </DownloadLink>
      );
    }

    return <span />;
  };

  const renderTotalRecords = (tableMeta: TableMetaData, tableFilters: TableFiltersType) => {
    return (
      <>
        {renderDownloadLink(tableMeta, tableFilters)}
        {renderTotal(tableMeta)}
      </>
    );
  };

  return (
    <WorkPacketListPage
      id="Transmissions"
      pageRoute={ROUTES.ROUTE_TRANSMISSIONS}
      columns={[
        WorkPacketColumn.DATETIME,
        WorkPacketColumn.PLAN_SPONSOR,
        WorkPacketColumn.VENDOR,
        WorkPacketColumn.SPEC_ID,
        WorkPacketColumn.IMPLEMENTATION,
        WorkPacketColumn.INBOUND_FILENAME,
        WorkPacketColumn.OUTBOUND_FILENAME,
        WorkPacketColumn.OUTBOUND_FILESIZE,
        WorkPacketColumn.BILLING_COUNT,
        WorkPacketColumn.TOTAL_RECORDS,
        WorkPacketColumn.EXTRACT_TYPE,
        WorkPacketColumn.EXTRACT_VERSION,
      ]}
      defaultSort={[
        {
          property: 'deliveredOn',
          direction: SortDirection.Desc,
          nullHandling: NullHandling.NullsFirst,
          ignoreCase: true,
        },
      ]}
      pageDataQuery={useWpTransmissionsLazyQuery}
      getItems={getItems}
      getTotal={getTotal}
      renderTotalRecords={renderTotalRecords}
    />
  );
};
