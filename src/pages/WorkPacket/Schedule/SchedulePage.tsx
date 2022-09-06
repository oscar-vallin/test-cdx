import { memo } from 'react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { Schedule } from 'src/containers/schedule';

import { LayoutDashboard } from 'src/layouts/LayoutDashboard';

const _SchedulePage = () => (
  <LayoutDashboard id="PageSchedule" menuOptionSelected={ROUTES.ROUTE_SCHEDULE.API_ID}>
    <Schedule id="__Schedule" />
  </LayoutDashboard>
);

const SchedulePage = memo(_SchedulePage);

export { SchedulePage };
