import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ROUTES } from '../data/constants/RouteConstants';

// Routes
import { LoginPage } from './Login';
import { UserSettingsPage } from './UserSettings';
import { DashboardPage } from './Dashboard';
import { ArchivePage } from './Archives';
import { SchedulePage } from './Schedule';
import { TransmissionsPage } from './Transmissions';
import { ErrorsPage } from './Errors';
import { AdminPage } from './Admin';
import { NotFoundPage } from './NotFound';
import { FileStatusPage } from './FileStatus';
import { FileStatusDetailsPage } from './FileStatusDetails';
import { AccessManagementGroupsPage, AccessManagementPoliciesPage } from './Admin/AccessManagement';
import { ActiveOrgsPage } from './Admin/Organizations';
import { CurrentActivityPage } from './Admin/Activity';
import { ColorPalettesPage, DefaultThemePage } from './Admin/DashboardSite';
import { ActiveUsersPage } from './Admin/Users/ActiveUsers';
import { DeletedUsersPage } from './Admin/Users/DeletedUsers';
import { FtpTestPage } from './Admin/FtpTest';

import AuthRoute from './AuthRoute';
import UnauthRoute from './UnauthRoute';
import { AdminErrorBoundary } from '../containers/boundaries/AdminErrorBoundary';

export const Routes = () => {
  return (
    <Switch>
      <UnauthRoute path="/login">
        <LoginPage />
      </UnauthRoute>
      <AuthRoute exact path="/">
        <DashboardPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_USER_SETTINGS.URL}>
        <UserSettingsPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_DASHBOARD.URL}>
        <DashboardPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_DASHBOARD_TO_FILE_STATUS.URL}>
        <FileStatusPage />
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
        <ErrorBoundary FallbackComponent={AdminErrorBoundary}>
          <AccessManagementGroupsPage />
        </ErrorBoundary>
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACCESS_MANAGEMENT_POLICIES.URL}>
        <ErrorBoundary FallbackComponent={AdminErrorBoundary}>
          <AccessManagementPoliciesPage />
        </ErrorBoundary>
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACTIVE_ORGS.URL}>
        <ErrorBoundary FallbackComponent={AdminErrorBoundary}>
          <ActiveOrgsPage />
        </ErrorBoundary>
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACTIVITY_CURRENT.URL}>
        <ErrorBoundary FallbackComponent={AdminErrorBoundary}>
          <CurrentActivityPage />
        </ErrorBoundary>
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_COLOR_PALETTES.URL}>
        <ErrorBoundary FallbackComponent={AdminErrorBoundary}>
          <ColorPalettesPage />
        </ErrorBoundary>
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_DEFAULT_THEME.URL}>
        <ErrorBoundary FallbackComponent={AdminErrorBoundary}>
          <DefaultThemePage />
        </ErrorBoundary>
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ADMIN.URL}>
        <ErrorBoundary FallbackComponent={AdminErrorBoundary}>
          <AdminPage />
        </ErrorBoundary>
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACTIVE_USERS.URL}>
        <ErrorBoundary FallbackComponent={AdminErrorBoundary}>
          <ActiveUsersPage />
        </ErrorBoundary>
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_DELETED_USERS.URL}>
        <ErrorBoundary FallbackComponent={AdminErrorBoundary}>
          <DeletedUsersPage />
        </ErrorBoundary>
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_FTP_TEST.URL}>
        <ErrorBoundary FallbackComponent={AdminErrorBoundary}>
          <FtpTestPage />
        </ErrorBoundary>
      </AuthRoute>

      <AuthRoute>
        <NotFoundPage />
      </AuthRoute>
    </Switch>
  );
};
