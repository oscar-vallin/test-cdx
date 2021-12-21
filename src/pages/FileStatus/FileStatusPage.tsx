import React, { ReactElement, useState } from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';
import { Column, Container, Row } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { PageTitle, Text } from '../../components/typography';
import { PageHeader } from '../../containers/headers/PageHeader';
import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { WorkPacketTable } from '../../containers/tables/WorkPacketTable';
import {
  NullHandling,
  SortDirection,
  useWorkPacketStatusesLazyQuery,
  useWorkPacketStatusesPollQuery,
  WorkPacketStatus,
} from '../../data/services/graphql';
import { WorkPacketColumns } from '../../containers/tables/WorkPacketColumns';

const _FileStatusPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: 0, loading: true });

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
      return <Text right>{tableMeta.count > 0 ? `${tableMeta.count} results found` : 'No results were found'}</Text>;
    }

    return <span />;
  };

  return (
    <LayoutDashboard
      id="PageFileStatus"
      menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}
      /* routeId={ROUTES.ROUTE_FILE_STATUS} */
    >
      <PageHeader spacing="0">
        <Container>
          <Spacing margin={{ top: 'double' }}>
            <Row>
              <Column lg="6" direction="row">
                <PageTitle id="__File-Status_Title" title="File Status" subTitle="Advanced search" icon="FilterSolid"
                />
              </Column>
              <Column lg="6" right>
                <Text right>{renderTotalRecords()}</Text>
              </Column>
            </Row>
          </Spacing>
        </Container>
      </PageHeader>

      <WorkPacketTable
        id="TableFileStatus"
        cols={[
          WorkPacketColumns.TIMESTAMP,
          WorkPacketColumns.VENDOR,
          WorkPacketColumns.PLAN_SPONSOR,
          WorkPacketColumns.INBOUND_FILENAME,
          WorkPacketColumns.PACKET_STATUS,
          WorkPacketColumns.PROGRESS,
        ]}
        lazyQuery={useWorkPacketStatusesLazyQuery}
        pollingQuery={useWorkPacketStatusesPollQuery}
        getItems={mapData}
        searchTextPlaceholder="Extract Name, Status, Vendor, etc."
        defaultSort={[
          {
            property: 'timestamp',
            direction: SortDirection.Desc,
            nullHandling: NullHandling.NullsFirst,
            ignoreCase: true,
          },
        ]}
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
