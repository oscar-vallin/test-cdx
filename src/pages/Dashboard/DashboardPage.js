import React from 'react';
// components
import { CardDashboard } from '../../containers/cards/CardDashboard';
import { TableDashboard } from '../../containers/tables/TableDashboard';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
// import { TableFileStatus } from '../../containers/tables';
import { StyledRow, StyledColumn } from './DashboardPage.styles';

const data = [
  { key: 0, name: 'Completed', value: 25, color: '#219653' },
  { key: 1, name: 'Transmissions', value: 75, color: '#D0D0D0' },
];

const dataErrors = [
  { key: 0, name: 'Failed', value: 10, color: '#A80000' },
  { key: 1, name: 'Transmissions', value: 75, color: '#D0D0D0' },
];

const dataTable1 = [
  { vendor: 'Ameritas', bus: '1/1788' },
  { vendor: 'BCBSofNE', bus: '1/1955' },
  { vendor: 'BCI', bus: '1/1573' },
  { vendor: 'BenefitWallet', bus: '1/1193' },
  { vendor: 'BostonMutual', bus: '1/1432' },
  { vendor: 'BrightHorizons', bus: '1/988' },
  { vendor: 'CVSCoremarks', bus: '1/323' },
  { vendor: 'DentalDentol', bus: '1/1' },
  { vendor: 'Hybit', bus: '1/99999999' },
];

const dataTableColumns = ['vendor', 'bus'];

const dataTable2 = [];

const _DashboardPage = () => {
  return (
    <LayoutDashboard id="PageDashboard">
      <StyledRow marginTop={30} sm={12} around>
        <StyledColumn sm={5}>
          <CardDashboard title="Transmissions" subtitle="Billing Units." levels={2} data={data} />
        </StyledColumn>
        <StyledColumn sm={5}>
          <CardDashboard title="Failed Files" subtitle="Billing Units." levels={2} data={dataErrors} />
        </StyledColumn>
      </StyledRow>
      <StyledRow marginBottom={30} marginTop={30} sm={12} around>
        <StyledColumn sm={5}>
          <TableDashboard columns={dataTableColumns} data={dataTable1} />
        </StyledColumn>
        <StyledColumn sm={5}>
          <TableDashboard columns={dataTableColumns} data={dataTable1} />
        </StyledColumn>
      </StyledRow>
    </LayoutDashboard>
  );
};

const DashboardPage = React.memo(_DashboardPage);

export { DashboardPage };
