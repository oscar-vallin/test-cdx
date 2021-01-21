import React from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { TableErrors } from '../../containers/tables/TableErrors';

const _ErrorsPage = () => {
  return (
    <LayoutDashboard id="PageDashboard" menuOptionSelected={ROUTES.ROUTE_ERRORS.ID}>
      <TableErrors />
    </LayoutDashboard>
  );
};

const ErrorsPage = React.memo(_ErrorsPage);

export { ErrorsPage };
