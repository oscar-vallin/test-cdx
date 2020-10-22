import React from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';

const _ErrorsPage = () => {
  return (
    <LayoutDashboard id="PageDashboard" menuOptionSelected={ROUTES.ROUTE_ERRORS.ID}>
      Body Errors
    </LayoutDashboard>
  );
};

const ErrorsPage = React.memo(_ErrorsPage);

export { ErrorsPage };
