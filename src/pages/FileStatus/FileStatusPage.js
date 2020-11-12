import React from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { TableFileStatus } from '../../containers/tables/TableFileStatus';

const _FileStatusPage = () => {
  return (
    <LayoutDashboard id="PageDashboard" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}>
      <TableFileStatus />
    </LayoutDashboard>
  );
};

const FileStatusPage = React.memo(_FileStatusPage);

export { FileStatusPage };
