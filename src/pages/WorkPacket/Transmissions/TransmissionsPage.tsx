import React, { ReactElement } from 'react';
import { Icon } from '@fluentui/react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { WorkPacketColumn } from 'src/containers/tables/WorkPacketColumns';
import {
  NullHandling, SortDirection, useWpTransmissionsLazyQuery, WpTransmission,
} from 'src/data/services/graphql';
import { tableFiltersToQueryParams, TableFiltersType } from 'src/hooks/useTableFilters';
import { DownloadLink } from 'src/containers/tables/WorkPacketTable.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { WorkPacketListPage } from 'src/pages/WorkPacket/WorkPacketListPage';

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

  const renderTotal = (totalRecords: number) => <span>{totalRecords > 0 ? `${totalRecords} results found` : 'No results found'}</span>;

  const renderDownloadLink = (
    totalRecords: number,
    tableFilters: TableFiltersType,
  ): ReactElement => {
    const graphQLUrl = process.env.REACT_APP_API_SERVER;
    const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

    if (totalRecords > 0) {
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

  const renderTotalRecords = (totalRecords: number, tableFilters: TableFiltersType) => (
    <>
      {renderDownloadLink(totalRecords, tableFilters)}
      {renderTotal(totalRecords)}
    </>
  );

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
      emptyTitle="No file transmissions found"
      emptyDescription="There are no file transmissions found for the given date range with the provided filters."
    />
  );
};
