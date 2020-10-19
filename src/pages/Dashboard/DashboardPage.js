import React from "react";

import { LayoutDashboard } from "../../layouts/LayoutDashboard";

const _DashboardPage = () => {
  return <LayoutDashboard id="PageDashboard">Body Dashboard</LayoutDashboard>;
};

const DashboardPage = React.memo(_DashboardPage);

export { DashboardPage };
