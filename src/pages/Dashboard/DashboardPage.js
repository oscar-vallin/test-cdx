import React from 'react';
// components
import { CardDashboard } from '../../containers/cards/CardDashboard';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
// import { TableFileStatus } from '../../containers/tables';
import { StyledRow, StyledColumn } from './DashboardPage.styles';

const _DashboardPage = () => {
  const data = [
    { name: 'Completed', value: 25, color: '#219653' },
    { name: 'Transmissions', value: 75, color: '#D0D0D0' },
  ];

  return (
    <LayoutDashboard id="PageDashboard">
      <StyledRow>
        <StyledColumn>
          <CardDashboard title="Transmissions" subtitle="Billing Units." levels={2} data={data} />
        </StyledColumn>
        <StyledColumn>Card 2</StyledColumn>
      </StyledRow>
      <StyledRow>
        <StyledColumn>Table 1</StyledColumn>
        <StyledColumn>Table 2</StyledColumn>
      </StyledRow>
      {/* <TableFileStatus /> */}
    </LayoutDashboard>
  );
};

const DashboardPage = React.memo(_DashboardPage);

export { DashboardPage };
