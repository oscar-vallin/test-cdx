import React, { useState } from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { TableOrganizations } from '../../containers/tables/TableOrganizations';
import { data } from './OrganizationsPage.service';

const _OrganizationsPage = () => {
  return (
    <LayoutDashboard id="PageOrganizations" menuOptionSelected={ROUTES.ROUTE_ADMIN.API_ID}>
      <TableOrganizations data={data} />
    </LayoutDashboard>
  );
};

const OrganizationsPage = React.memo(_OrganizationsPage);

export { OrganizationsPage };
