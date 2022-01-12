import { Switch } from 'react-router-dom';
import { ROUTES } from 'src/data/constants/RouteConstants';
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
import { ActiveOrgsPage } from './Admin/Organizations';
import { CurrentActivityPage } from './Admin/Activity';
import { ColorPalettesPage, DefaultThemePage } from './Admin/DashboardSite';
import { ActiveUsersPage } from './Admin/Users/ActiveUsers';
import { DeletedUsersPage } from './Admin/Users/DeletedUsers';
import { FtpTestPage } from './Admin/FtpTest';
import {
  AccessManagementGroupsPage,
  AccessManagementPoliciesPage,
  AccessManagementSpecializationPage,
} from './Admin/AccessManagement';

import AuthRoute from './AuthRoute';
import UnauthRoute from './UnauthRoute';
import { ImplementationDeployPage } from './Admin/ImplDeploy';

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
        <AccessManagementGroupsPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACCESS_MANAGEMENT_POLICIES.URL}>
        <AccessManagementPoliciesPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACCESS_MANAGEMENT_SPECIALIZATION.URL}>
        <AccessManagementSpecializationPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACTIVE_ORGS.URL}>
        <ActiveOrgsPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACTIVITY_CURRENT.URL}>
        <CurrentActivityPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_COLOR_PALETTES.URL}>
        <ColorPalettesPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_DEFAULT_THEME.URL}>
        <DefaultThemePage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ADMIN.URL}>
        <AdminPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ACTIVE_USERS.URL}>
        <ActiveUsersPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_DELETED_USERS.URL}>
        <DeletedUsersPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_FTP_TEST.URL}>
        <FtpTestPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_IMPL_DEPLOY.URL}>
        <ImplementationDeployPage />
      </AuthRoute>
      <AuthRoute>
        <NotFoundPage />
      </AuthRoute>
    </Switch>
  );
};
