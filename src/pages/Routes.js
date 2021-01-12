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
import { OrganizationsPage } from './Organizations';

import AuthenticatedRoute from './AuthRoute';
import UnauthenticatedRoute from './UnauthRoute';

export const Routes = () => {
  return (
    <Switch>
      <UnauthenticatedRoute path="/login">
        <LoginPage />
      </UnauthenticatedRoute>
      {/* Authenticated */}
      <AuthenticatedRoute path="/">
        <DashboardPage />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.ROUTE_FILE_STATUS_DETAILS.URL}>
        <FileStatusDetailsPage />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.ROUTE_FILE_STATUS.URL}>
        <FileStatusPage />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.ROUTE_ARCHIVES.URL}>
        <ArchivePage />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.ROUTE_SCHEDULE.URL}>
        <SchedulePage />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.ROUTE_TRANSMISSIONS.URL}>
        <TransmissionsPage />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.ROUTE_ERRORS.URL}>
        <ErrorsPage />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.ROUTE_ADMIN.URL}>
        <AdminPage />
      </AuthenticatedRoute>
      <AuthenticatedRoute path={ROUTES.ROUTE_ORGANIZATIONS.URL}>
        <OrganizationsPage />
      </AuthenticatedRoute>
      {/* Not Found Route */}
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
