import { memo } from 'react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { Schedule } from 'src/containers/schedule';

import { LayoutDashboard } from 'src/layouts/LayoutDashboard';

const _SchedulePage = () => {
  return (
    <LayoutDashboard id="PageSchedule" menuOptionSelected={ROUTES.ROUTE_SCHEDULE.ID}>
      <Schedule />
    </LayoutDashboard>
  );
};

const SchedulePage = memo(_SchedulePage);

export { SchedulePage };
