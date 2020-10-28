import React from 'react';
// components
import { CardDashboard } from '../../containers/cards/CardDashboard';
import { TableDashboard } from '../../containers/tables/TableDashboard';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
// import { TableFileStatus } from '../../containers/tables';
import { StyledRow, StyledColumn } from './DashboardPage.styles';
import { TABLE_NAMES } from '../../data/constants/TableConstants';

const data = [
  { key: 0, name: 'Completed', value: 25, color: '#219653' },
  { key: 1, name: 'Transmissions', value: 75, color: '#D0D0D0' },
];

const dataErrors = [
  { key: 0, name: 'Failed', value: 10, color: '#A80000' },
  { key: 1, name: 'Transmissions', value: 75, color: '#D0D0D0' },
];

const dataTable0 = [
  { vendor: 'Ameritas', bus: '1/1788', specs: 'AAAA' },
  { vendor: 'BCBSofNE', bus: '1/1955', specs: 'bbbb' },
  { vendor: 'BCI', bus: '1/1573', specs: 'CCCCCC' },
  { vendor: 'BenefitWallet', bus: '1/1193', specs: 'DDDDDD' },
  { vendor: 'BostonMutual', bus: '1/1432', specs: 'EEEEE' },
  { vendor: 'BrightHorizons', bus: '1/988', specs: 'FFFFF' },
  { vendor: 'CVSCoremarks', bus: '1/323', specs: 'GGGGG' },
  { vendor: 'DentalDentol', bus: '1/1', specs: 'HHHH' },
  { vendor: 'Hybit', bus: '1/99999999', specs: 'I' },
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
          <TableDashboard
            columns={dataTableColumns}
            tableID={TABLE_NAMES.DASHBOARD_TRANSMISSIONS_VENDOR}
            data={dataTable1}
          />
        </StyledColumn>
        <StyledColumn sm={5}>
          <TableDashboard columns={dataTableColumns} tableID={TABLE_NAMES.DASHBOARD_ERRORS_VENDOR} data={dataTable1} />
        </StyledColumn>
      </StyledRow>
      <StyledRow marginBottom={30} marginTop={30} sm={12} around>
        <StyledColumn sm={5}>
          <TableDashboard
            columns={dataTableColumns}
            tableID={TABLE_NAMES.DASHBOARD_TRANSMISSIONS_FILES}
            data={dataTable1}
          />
        </StyledColumn>
        <StyledColumn sm={5}>
          <TableDashboard columns={dataTableColumns} tableID={TABLE_NAMES.DASHBOARD_ERRORS_FILES} data={dataTable1} />
        </StyledColumn>
      </StyledRow>
    </LayoutDashboard>
  );
};

const DashboardPage = React.memo(_DashboardPage);

export { DashboardPage };
