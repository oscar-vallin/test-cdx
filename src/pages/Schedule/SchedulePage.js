import { memo } from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';
import { Schedule } from '../../containers/schedule';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';

const _SchedulePage = () => {
  return (
    <LayoutDashboard id="PageSchedule" menuOptionSelected={ROUTES.ROUTE_SCHEDULE.ID}>
      <Schedule />
    </LayoutDashboard>
  );
};

const SchedulePage = memo(_SchedulePage);

export { SchedulePage };
