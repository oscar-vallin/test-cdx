import React, { ReactElement } from 'react';
import { Icon } from '@fluentui/react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import {
  NullHandling,
  SortDirection,
  useWorkPacketStatusesLazyQuery,
  useWorkPacketStatusesPollQuery,
  WorkPacketStatus,
} from 'src/data/services/graphql';
import { WorkPacketColumn } from 'src/containers/tables/WorkPacketColumns';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { tableFiltersToQueryParams, TableFiltersType } from 'src/hooks/useTableFilters';
import { DownloadLink } from 'src/containers/tables/WorkPacketTable.styles';
import { WorkPacketListPage } from '../WorkPacketListPage';

export const FileStatusPage = () => {
  const { orgSid } = useOrgSid();

  const getItems = (data) => {
    const items: WorkPacketStatus[] = [];
    data?.workPacketStatuses?.nodes?.forEach((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  const getTotal = (data) => data?.workPacketStatuses?.paginationInfo?.totalElements ?? 0;

  const renderTotal = (totalRecords: number): ReactElement => <span>{totalRecords > 0 ? `${totalRecords} results found` : 'No results found'}</span>;

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
          href={`${serverUrl}excel/fileStatus?orgSid=${orgSid}${filterString}`}
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
      id="FileStatus"
      pageRoute={ROUTES.ROUTE_FILE_STATUS}
      columns={[
        WorkPacketColumn.TIMESTAMP,
        WorkPacketColumn.VENDOR,
        WorkPacketColumn.ORG_ID,
        WorkPacketColumn.INBOUND_FILENAME,
        WorkPacketColumn.PACKET_STATUS,
        WorkPacketColumn.PROGRESS,
      ]}
      defaultSort={[
        {
          property: 'timestamp',
          direction: SortDirection.Desc,
          nullHandling: NullHandling.NullsFirst,
          ignoreCase: true,
        },
      ]}
      pageDataQuery={useWorkPacketStatusesLazyQuery}
      getItems={getItems}
      getTotal={getTotal}
      pollingQuery={useWorkPacketStatusesPollQuery}
      renderTotalRecords={renderTotalRecords}
      emptyTitle="No files found"
      emptyDescription="There are no files found for the given date range with the provided filters."
    />
  );
};
