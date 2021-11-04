import React, { useState } from 'react';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { ROUTES } from '../../data/constants/RouteConstants';
import { Row, Column, Container } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Text } from '../../components/typography';
import { PageHeader } from '../../containers/headers/PageHeader';
import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { WorkPacketTable } from '../../containers/tables/WorkPacketTable';
import { NullHandling, SortDirection, useWorkPacketStatusesLazyQuery } from '../../data/services/graphql';
import { WorkPacketColumns } from '../../containers/tables/WorkPacketColumns';

const _FileStatusPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: null, loading: null });

  const mapData = (data) => {
    const items = [];
    data?.workPacketStatuses?.nodes?.map((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  return (
    <LayoutDashboard
      id="PageFileStatus"
      menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}
      routeId={ROUTES.ROUTE_FILE_STATUS}
    >
      <PageHeader spacing="0">
        <Container>
          <Spacing margin={{ top: 'double' }}>
            <Row>
              <Column direction="row">
                <FontIcon iconName="FilterSolid" />
                <Text id="__Text_File-Status" variant="bold">
                  File Status
                </Text>
                <Text id="__Text_Advanced-search">&nbsp; — Advanced search</Text>
              </Column>
              <Column right>
                <Text right>
                  {!tableMeta.loading && tableMeta.count !== null && (
                    <Text>{tableMeta.count > 0 ? `${tableMeta.count} results found` : 'No results were found'}</Text>
                  )}
                </Text>
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
          WorkPacketColumns.STEP_STATUS,
          WorkPacketColumns.PROGRESS,
        ]}
        lazyQuery={useWorkPacketStatusesLazyQuery}
        getItems={mapData}
        searchTextPlaceholder="Extract Name,  Status, Vendor, etc."
        defaultSort={[
          {
            property: 'timestamp',
            direction: SortDirection.Desc,
            nullHandling: NullHandling.NullsFirst,
            ignoreCase: true,
          },
        ]}
      />
    </LayoutDashboard>
  );
};

const FileStatusPage = React.memo(_FileStatusPage);

export { FileStatusPage };
