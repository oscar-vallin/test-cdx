import React, { useState } from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { Row, Column, Container } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Text } from '../../components/typography/Text';
import { PageHeader } from '../../containers/headers/PageHeader';
import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { TableFileStatus } from '../../containers/tables/TableFileStatus';

const _FileStatusPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: null, loading: null });

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
              <Column lg="6" direction="row">
                <FontIcon iconName="FilterSolid" />
                <Text variant="bold">File Status</Text>
                <Text>&nbsp; — Advanced search</Text>
              </Column>
              <Column lg="6" right>
                <Text right>
                 {!tableMeta.loading && (
                    tableMeta.count !== null && (
                      <Text>{tableMeta.count > 0
                        ? `${tableMeta.count} results found`
                        : 'No results were found'
                      }</Text>
                    )
                  )}
                </Text>
              </Column>
            </Row>
          </Spacing>
        </Container>
      </PageHeader>
      
      <TableFileStatus onItemsListChange={setTableMeta} />
    </LayoutDashboard>
  );
};

const FileStatusPage = React.memo(_FileStatusPage);

export { FileStatusPage };
