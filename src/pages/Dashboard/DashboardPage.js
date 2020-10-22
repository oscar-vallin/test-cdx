import React from 'react';
// components
import { CardDashboard } from '../../containers/cards/CardDashboard';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
// import { TableFileStatus } from '../../containers/tables';
import { StyledRow, StyledColumn } from './DashboardPage.styles';

const _DashboardPage = () => {
  return (
    <LayoutDashboard id="PageDashboard">
      <StyledRow>
        <StyledColumn>
          <CardDashboard title="Transmissions" subtitle="Billing Units." value={99} maxValue={9999} percentage={0.25} />
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
