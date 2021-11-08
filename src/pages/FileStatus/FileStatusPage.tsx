import React, { ReactElement, useState } from 'react';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { ROUTES } from '../../data/constants/RouteConstants';
import { Column, Container, Row } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Text } from '../../components/typography';
import { PageHeader } from '../../containers/headers/PageHeader';
import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { WorkPacketTable } from '../../containers/tables/WorkPacketTable';
import {
  NullHandling,
  SortDirection,
  useWorkPacketStatusesLazyQuery,
  WorkPacketStatus,
} from '../../data/services/graphql';
import { WorkPacketColumns } from '../../containers/tables/WorkPacketColumns';

const _FileStatusPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: 0, loading: true });

  const mapData = (data) => {
    const items: object[] = [];
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
              <Column direction="row">
                <FontIcon iconName="FilterSolid" />
                <Text id="__Text_File-Status" variant="bold">
                  File Status
                </Text>
                <Text id="__Text_Advanced-search">&nbsp; — Advanced search</Text>
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
