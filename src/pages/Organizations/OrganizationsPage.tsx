import { memo } from 'react';
import { ROUTES } from 'src/data/constants/RouteConstants';

import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { TableOrganizations } from 'src/containers/tables/TableOrganizations';

const _OrganizationsPage = () => {
  return (
    <LayoutDashboard id="PageOrganizations" menuOptionSelected={ROUTES.ROUTE_ADMIN.API_ID}>
      <TableOrganizations data={null} />
    </LayoutDashboard>
  );
};

const OrganizationsPage = memo(_OrganizationsPage);

export { OrganizationsPage };
