import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../data/constants/RouteConstants';

// Routes
import { LoginPage } from './Login';
import { DashboardPage } from './Dashboard';
import { ArchivePage } from './Archives';
import { SchedulePage } from './Schedule';
import { TransmissionsPage } from './Transmissions';
import { ErrorsPage } from './Errors';
import { AdminPage } from './Admin';
import { NotFoundPage } from './NotFound';
import { FileStatusPage } from './FileStatus';
import { FileStatusDetailsPage } from './FileStatusDetails';
import {
  AccessManagementGroupsPage,
  AccessManagementPoliciesPage,
  CreatePoliciesPage
} from './Admin/AccessManagement';
import { ActiveOrgsPage } from './Admin/Organizations';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path={ROUTES.ROUTE_DASHBOARD.URL}>
        <DashboardPage />
      </Route>
      <Route path={ROUTES.ROUTE_FILE_STATUS_DETAILS.URL}>
        <FileStatusDetailsPage />
      </Route>
      <Route path={ROUTES.ROUTE_FILE_STATUS.URL}>
        <FileStatusPage />
      </Route>
      <Route path={ROUTES.ROUTE_ARCHIVES.URL}>
        <ArchivePage />
      </Route>
      <Route path={ROUTES.ROUTE_SCHEDULE.URL}>
        <SchedulePage />
      </Route>
      <Route path={ROUTES.ROUTE_TRANSMISSIONS.URL}>
        <TransmissionsPage />
      </Route>
      <Route path={ROUTES.ROUTE_ERRORS.URL}>
        <ErrorsPage />
      </Route>
      <Route path={ROUTES.ROUTE_ACCESS_MANAGEMENT_GROUPS.URL}>
        <AccessManagementGroupsPage />
      </Route>
      <Route path={ROUTES.ROUTE_CREATE_POLICIES.URL}>
        <CreatePoliciesPage />
      </Route>
      <Route path={ROUTES.ROUTE_ACCESS_MANAGEMENT_POLICIES.URL}>
        <AccessManagementPoliciesPage />
      </Route>
      <Route path={ROUTES.ROUTE_ACTIVE_ORGS.URL}>
        <ActiveOrgsPage />
      </Route>
      {/* <Route path={ROUTES.ROUTE_ADMIN.URL}>
        <AdminPage />
      </Route> */}
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
