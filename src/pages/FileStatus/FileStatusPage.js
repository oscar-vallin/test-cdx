import React from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';

const _FileStatusPage = () => {
  return (
    <LayoutDashboard id="PageDashboard" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}>
      FileStatus Page
    </LayoutDashboard>
  );
};

const FileStatusPage = React.memo(_FileStatusPage);

export { FileStatusPage };
