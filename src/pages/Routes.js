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
import { AccessManagementGroupsPage, AccessManagementPoliciesPage, CreatePoliciesPage } from './Admin/AccessManagement';
import { ActiveOrgsPage } from './Admin/Organizations';

import AuthRoute from './AuthRoute';
import UnauthRoute from './UnauthRoute';

export const Routes = () => {
  return (
    <Switch>
      <UnauthRoute path="/login">
        <LoginPage />
      </UnauthRoute>
      <AuthRoute exact path="/">
        <DashboardPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_DASHBOARD.URL}>
        <DashboardPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_FILE_STATUS_DETAILS.URL}>
        <FileStatusDetailsPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_FILE_STATUS.URL}>
        <FileStatusPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ARCHIVES.URL}>
        <ArchivePage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_SCHEDULE.URL}>
        <SchedulePage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_TRANSMISSIONS.URL}>
        <TransmissionsPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ERRORS.URL}>
        <ErrorsPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACCESS_MANAGEMENT_GROUPS.URL}>
        <AccessManagementGroupsPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_CREATE_POLICIES.URL}>
        <CreatePoliciesPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACCESS_MANAGEMENT_POLICIES.URL}>
        <AccessManagementPoliciesPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACTIVE_ORGS.URL}>
        <ActiveOrgsPage />
      </AuthRoute>
      {/* <AuthRoute path={ROUTES.ROUTE_ADMIN.URL}>
        <AdminPage />
      </AuthRoute> */}
      <AuthRoute>
        <NotFoundPage />
      </AuthRoute>
    </Switch>
  );
};
