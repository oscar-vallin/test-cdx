import React, { memo, useState } from 'react';
import { FontIcon } from '@fluentui/react/lib-commonjs/Icon';
import { ROUTES } from '../../data/constants/RouteConstants';
import { Row, Column, Container } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Text } from '../../components/typography';
import { PageHeader } from '../../containers/headers/PageHeader';
import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { WorkPacketTable } from '../../containers/tables/WorkPacketTable';
import { WorkPacketColumns } from '../../containers/tables/WorkPacketColumns';
import { NullHandling, SortDirection, useWorkPacketStatusesLazyQuery } from '../../data/services/graphql';

const _ArchivePage = () => {
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

  return (
    <LayoutDashboard id="PageArchive" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}>
      <PageHeader spacing="0">
        <Container>
          <Spacing margin={{ top: 'double' }}>
            <Row>
              <Column lg="6" direction="row">
                <FontIcon iconName="FilterSolid" />

                <Text id="__Text_Archives" variant="bold">
                  Archives
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

      {/* <TableArchive onItemsListChange={setTableMeta} /> */}
      <WorkPacketTable
        id="TableArchive"
        cols={[
          WorkPacketColumns.TIMESTAMP,
          WorkPacketColumns.VENDOR,
          WorkPacketColumns.PLAN_SPONSOR,
          WorkPacketColumns.CLIENT_FILE,
          WorkPacketColumns.VENDOR_FILE,
        ]}
        lazyQuery={useWorkPacketStatusesLazyQuery}
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

const ArchivePage = memo(_ArchivePage);

export { ArchivePage };
