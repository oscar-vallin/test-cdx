import React, { useState } from 'react';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { ROUTES } from '../../data/constants/RouteConstants';
import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { Row, Column, Container } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Text } from '../../components/typography';
import { PageHeader } from '../../containers/headers/PageHeader';
import { TableTransmissions } from '../../containers/tables/TableTransmissions';

const data = [
  {
    timestamp: 1608067551,
    fileName: 'filestatus/CHO-Boston-OracleHours.txt',
    file: 'CHO-Boston-OracleHours.txt',
    workStep: 'Transform',
    plan: 'CHO',
    vendor: 'TheHatford',
    message: 'Error',
  },
  {
    timestamp: 1608067551,
    fileName: 'filestatus/CHO-Boston-OracleHours.txt',
    file: 'CHO-Boston-OracleHours.txt',
    workStep: 'Transform',
    plan: 'CHO',
    vendor: 'TheHatford',
    message: 'Error',
  },
  {
    timestamp: 1608067551,
    fileName: 'filestatus/CHO-Boston-OracleHours.txt',
    file: 'CHO-Boston-OracleHours.txt',
    workStep: 'Transform',
    plan: 'CHO',
    vendor: 'TheHatford',
    message: 'Error',
  },
  {
    timestamp: 1608068919,
    fileName: 'filestatus/CHO-Boston-OracleHours.txt',
    file: 'CHO-Boston-OracleHours.txt',
    workStep: 'Transform',
    plan: 'CHO',
    vendor: 'TheHatford',
    message: 'Error',
  },
  {
    timestamp: 1608068919,
    fileName: 'filestatus/CHO-Boston-OracleHours.txt',
    file: 'CHO-Boston-OracleHours.txt',
    workStep: 'Transform',
    plan: 'CHO',
    vendor: 'TheHatford',
    message: 'Error',
  },
  {
    timestamp: 1608068919,
    fileName: 'filestatus/CHO-Boston-OracleHours.txt',
    file: 'CHO-Boston-OracleHours.txt',
    workStep: 'Transform',
    plan: 'CHO',
    vendor: 'TheHatford',
    message: 'Error',
  },
  {
    timestamp: 1608068919,
    fileName: 'filestatus/CHO-Boston-OracleHours.txt',
    file: 'CHO-Boston-OracleHours.txt',
    workStep: 'Transform',
    plan: 'CHO',
    vendor: 'TheHatford',
    message: 'Error',
  },
  {
    timestamp: 1608068919,
    fileName: 'filestatus/CHO-Boston-OracleHours.txt',
    file: 'CHO-Boston-OracleHours.txt',
    workStep: 'Transform',
    plan: 'CHO',
    vendor: 'TheHatford',
    message: 'Error',
  },
  {
    timestamp: 1608068919,
    fileName: 'filestatus/CHO-Boston-OracleHours.txt',
    file: 'CHO-Boston-OracleHours.txt',
    workStep: 'Transform',
    plan: 'CHO',
    vendor: 'TheHatford',
    message: 'Error',
  },
  {
    timestamp: 1608068919,
    fileName: 'filestatus/CHO-Boston-OracleHours.txt',
    file: 'CHO-Boston-OracleHours.txt',
    workStep: 'Transform',
    plan: 'CHO',
    vendor: 'TheHatford',
    message: 'Error',
  },
];

const _TransmissionsPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: null, loading: null });

  return (
    <LayoutDashboard id="PageTransmissions" menuOptionSelected={ROUTES.ROUTE_ADMIN.API_ID}>
      <PageHeader spacing="0">
        <Container>
          <Spacing margin={{ top: 'double' }}>
            <Row>
              <Column lg="6" direction="row">
                <FontIcon iconName="FilterSolid" />
                <Text id="__Text_Transmissions" variant="bold">
                  Transmissions
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

      <TableTransmissions data={data} onItemsListChange={setTableMeta} />
    </LayoutDashboard>
  );
};

const TransmissionsPage = React.memo(_TransmissionsPage);

export { TransmissionsPage };
