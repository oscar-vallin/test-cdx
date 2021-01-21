import React from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { TableTransmissions } from '../../containers/tables/TableTransmissions';
import { data } from './TransmissionsPage.service';

const _TransmissionsPage = () => {
  return (
    <LayoutDashboard id="PageTransmissions" menuOptionSelected={ROUTES.ROUTE_ADMIN.API_ID}>
      <TableTransmissions data={data} />
    </LayoutDashboard>
  );
};

const TransmissionsPage = React.memo(_TransmissionsPage);

export { TransmissionsPage };
