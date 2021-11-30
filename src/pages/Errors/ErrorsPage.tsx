import React, { useState } from 'react';
import { FontIcon } from '@fluentui/react/lib-commonjs/Icon';
import { ROUTES } from '../../data/constants/RouteConstants';
import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { Row, Column, Container } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Text } from '../../components/typography';
import { PageHeader } from '../../containers/headers/PageHeader';

import { WorkPacketTable } from '../../containers/tables/WorkPacketTable';
import { WorkPacketColumns } from '../../containers/tables/WorkPacketColumns';
import {
  NullHandling,
  SortDirection,
  useWpProcessErrorsLazyQuery,
  WorkPacketStatus,
} from '../../data/services/graphql';

const _ErrorsPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: 0, loading: true });
  const mapData = (data) => {
    const items: WorkPacketStatus[] = [];
    data?.wpProcessErrors?.nodes?.map((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  return (
    <LayoutDashboard id="PageErrors" menuOptionSelected={ROUTES.ROUTE_ERRORS.API_ID}>
      <PageHeader spacing="0">
        <Container>
          <Spacing margin={{ top: 'double' }}>
            <Row>
              <Column lg="6" direction="row">
                <FontIcon iconName="FilterSolid" />
                <Text id="__Text_Errors" variant="bold">
                  Errors
                </Text>
                <Text id="__Text_Advanced-search">&nbsp; — Advanced search</Text>
              </Column>
              <Column lg="6" right>
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
          WorkPacketColumns.START_TIME,
          WorkPacketColumns.INBOUND_FILENAME,
          WorkPacketColumns.STEP,
          WorkPacketColumns.PLAN_SPONSOR,
          WorkPacketColumns.VENDOR,
          WorkPacketColumns.MESSAGE,
        ]}
        lazyQuery={useWpProcessErrorsLazyQuery}
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
          const total = data?.wpProcessErrors?.paginationInfo?.totalElements ?? 0;
          setTableMeta({ count: total, loading });
        }}
      />
    </LayoutDashboard>
  );
};

const ErrorsPage = React.memo(_ErrorsPage);

export { ErrorsPage };
