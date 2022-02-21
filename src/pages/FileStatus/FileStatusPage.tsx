import React, { ReactElement, useState } from 'react';
import { Icon } from '@fluentui/react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { WorkPacketTable } from 'src/containers/tables/WorkPacketTable';
import {
  NullHandling,
  SortDirection,
  useWorkPacketStatusesLazyQuery,
  useWorkPacketStatusesPollQuery,
  WorkPacketStatus,
} from 'src/data/services/graphql';
import { WorkPacketColumns } from 'src/containers/tables/WorkPacketColumns';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { tableFiltersToQueryParams, useTableFilters } from 'src/hooks/useTableFilters';
import { DownloadLink } from 'src/containers/tables/WorkPacketTable.styles';

const _FileStatusPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: 0, loading: true });
  const { orgSid } = useOrgSid();
  const tableFilters = useTableFilters('Extract Name, Status, Vendor, etc.', [
    {
      property: 'timestamp',
      direction: SortDirection.Desc,
      nullHandling: NullHandling.NullsFirst,
      ignoreCase: true,
    },
  ]);

  const mapData = (data) => {
    const items: WorkPacketStatus[] = [];
    data?.workPacketStatuses?.nodes?.map((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  const renderTotalRecords = (): ReactElement => {
    if (!tableMeta.loading && tableMeta.count !== null) {
      return <span>{tableMeta.count > 0 ? `${tableMeta.count} results found` : 'No results found'}</span>;
    }

    return <span />;
  };

  const renderDownloadLink = (): ReactElement => {
    const graphQLUrl = process.env.REACT_APP_API_SERVER;
    const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

    if (!tableMeta.loading && tableMeta.count > 0) {
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

  return (
    <LayoutDashboard id="PageFileStatus" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.API_ID}>
      <PageHeader id="__FileStatusHeader">
        <Container>
          <Row>
            <Column sm="6" direction="row">
              <PageTitle id="__File-Status_Title" title="File Status" subTitle="Advanced search" icon="FilterSolid" />
            </Column>
            <Column sm="6" right>
              <Text size="large" right>
                {renderDownloadLink()}
                {renderTotalRecords()}
              </Text>
            </Column>
          </Row>
        </Container>
      </PageHeader>

      <WorkPacketTable
        id="TableFileStatus"
        cols={[
          WorkPacketColumns.TIMESTAMP,
          WorkPacketColumns.VENDOR,
          WorkPacketColumns.ORG_ID,
          WorkPacketColumns.INBOUND_FILENAME,
          WorkPacketColumns.PACKET_STATUS,
          WorkPacketColumns.PROGRESS,
        ]}
        lazyQuery={useWorkPacketStatusesLazyQuery}
        pollingQuery={useWorkPacketStatusesPollQuery}
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

const FileStatusPage = React.memo(_FileStatusPage);

export { FileStatusPage };
