import React from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { TableArchive } from '../../containers/tables/TableArchive';

const _ArchivePage = () => {
  return (
    <LayoutDashboard id="PageDashboard" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}>
      <TableArchive />
    </LayoutDashboard>
  );
};

const ArchivePage = React.memo(_ArchivePage);

export { ArchivePage };
