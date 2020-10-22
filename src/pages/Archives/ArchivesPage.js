import React from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';

const _ArchivesPage = () => {
  return (
    <LayoutDashboard id="PageArchives" menuOptionSelected={ROUTES.ROUTE_ARCHIVES.ID}>
      Body Archives
    </LayoutDashboard>
  );
};

const ArchivesPage = React.memo(_ArchivesPage);

export { ArchivesPage };
