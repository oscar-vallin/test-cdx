import React from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';

const _AdminPage = () => {
  return (
    <LayoutDashboard id="PageADmin" menuOptionSelected={ROUTES.ROUTE_ADMIN.ID}>
      Body Admin
    </LayoutDashboard>
  );
};

const AdminPage = React.memo(_AdminPage);

export { AdminPage };
