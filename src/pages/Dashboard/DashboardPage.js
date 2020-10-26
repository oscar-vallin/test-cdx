import React from 'react';
// components
import { CardDashboard } from '../../containers/cards/CardDashboard';
import { TableDashboard } from '../../containers/tables/TableDashboard';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
// import { TableFileStatus } from '../../containers/tables';
import { StyledRow, StyledColumn } from './DashboardPage.styles';

const _DashboardPage = () => {
  const data = [
    { name: 'Completed', value: 25, color: '#219653' },
    { name: 'Transmissions', value: 75, color: '#D0D0D0' },
  ];

  const dataErrors = [
    { name: 'Failed', value: 10, color: '#A80000' },
    { name: 'Transmissions', value: 75, color: '#D0D0D0' },
  ];

  return (
    <LayoutDashboard id="PageDashboard">
      <StyledRow>
        <StyledColumn>
          <CardDashboard title="Transmissions" subtitle="Billing Units." levels={2} data={data} />
        </StyledColumn>
        <StyledColumn>
          <CardDashboard title="Failed Failes" subtitle="Billing Units." levels={2} data={dataErrors} />
        </StyledColumn>
      </StyledRow>
      <StyledRow>
        <StyledColumn>
          <TableDashboard />
        </StyledColumn>
        <StyledColumn>Table 2</StyledColumn>
      </StyledRow>
      {/* <Table></Table>FileStatus /> */}
    </LayoutDashboard>
  );
};

const DashboardPage = React.memo(_DashboardPage);

export { DashboardPage };
