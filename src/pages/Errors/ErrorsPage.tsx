import React, { useState } from 'react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';

import { WorkPacketTable } from 'src/containers/tables/WorkPacketTable';
import { WorkPacketColumns } from 'src/containers/tables/WorkPacketColumns';
import { NullHandling, SortDirection, useWpProcessErrorsLazyQuery, WorkPacketStatus } from 'src/data/services/graphql';
import { useTableFilters } from 'src/hooks/useTableFilters';

const _ErrorsPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: 0, loading: true });
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
    data?.wpProcessErrors?.nodes?.map((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  return (
    <LayoutDashboard id="PageErrors" menuOptionSelected={ROUTES.ROUTE_ERRORS.API_ID}>
      <PageHeader id="__ErrorsPageHeader">
        <Container>
          <Row>
            <Column sm="6" direction="row">
              <PageTitle id="__Errors_Title" title="Errors" subTitle="Advanced search" icon="FilterSolid" />
            </Column>
            <Column sm="6" right>
              <Text right>
                {!tableMeta.loading && tableMeta.count !== null && (
                  <Text>{tableMeta.count > 0 ? `${tableMeta.count} results found` : 'No results found'}</Text>
                )}
              </Text>
            </Column>
          </Row>
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
        tableFilters={tableFilters}
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
