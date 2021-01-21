import React from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';

const _SchedulePage = () => {
  return (
    <LayoutDashboard id="PageSchedule" menuOptionSelected={ROUTES.ROUTE_SCHEDULE.ID}>
      Body Schedule
    </LayoutDashboard>
  );
};

const SchedulePage = React.memo(_SchedulePage);

export { SchedulePage };
