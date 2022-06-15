import { Switch } from 'react-router-dom';
import { ROUTES } from 'src/data/constants/RouteConstants';
// Routes
import { PasswordResetPage } from 'src/pages/PasswordReset';
import { ExternalUsersPage } from 'src/pages/Admin/Users/ExternalUsers';
import { LoginPage } from './Login';
import { UserSettingsPage } from './UserSettings';
import { DashboardPage } from './Dashboard';
import { ArchivePage } from './Archives';
import { SchedulePage } from './Schedule';
import { TransmissionsPage } from './Transmissions';
import { ErrorsPage } from './Errors';
import { AccessDenied, PageNotFound } from './ErrorHandling';
import { FileStatusPage } from './FileStatus';
import { FileStatusDetailsPanel } from './FileStatusDetails';
import { ActiveOrgsPage } from './Admin/Organizations';
import { ExternalOrgsPage } from './Admin/ExternalOrganization';
import { CurrentActivityPage } from './Admin/Activity';
import { ColorPalettesPage, DefaultThemePage } from './Admin/DashboardSite';
import { ActiveUsersPage } from './Admin/Users/ActiveUsers';
import { DeletedUsersPage } from './Admin/Users/DeletedUsers';
import { OntologyPage, XChangePage, AlertsPage } from './Admin/XChange';
import { FtpTestPage } from './Admin/FtpTest';
import { UserAuditLogsPage } from './Admin/Users/UserAuditLogs';
import {
  AccessManagementGroupsPage,
  AccessManagementPoliciesPage,
  AccessManagementSpecializationPage,
} from './Admin/AccessManagement';

import AuthRoute from './AuthRoute';
import UnauthRoute from './UnauthRoute';
import { ImplementationDeployPage } from './Admin/ImplDeploy';
import { PasswordRulesPage } from './Admin/PasswordRules';
import { OrganizationSecuritySettingsPage } from './Admin/OrganizationSecuritySettings';

export const Routes = () => {
  return (
    <Switch>
      <UnauthRoute path="/login">
        <LoginPage />
      </UnauthRoute>
      <UnauthRoute path={ROUTES.ROUTE_PASSWORD_RESET.URL}>
        <PasswordResetPage />
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
        <FileStatusDetailsPanel />
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
      <AuthRoute path={ROUTES.ROUTE_EXTERNAL_ORGS.URL}>
        <ExternalOrgsPage />
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
      <AuthRoute path={ROUTES.ROUTE_ACTIVE_USERS.URL}>
        <ActiveUsersPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_DELETED_USERS.URL}>
        <DeletedUsersPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_EXTERNAL_USERS.URL}>
        <ExternalUsersPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_USER_AUDIT_LOGS.URL}>
        <UserAuditLogsPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_XCHANGE_LIST.URL}>
        <XChangePage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_ONTOLOGY_BROWSER.URL}>
        <OntologyPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_XCHANGE_ALERTS.URL}>
        <AlertsPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_FTP_TEST.URL}>
        <FtpTestPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_IMPL_DEPLOY.URL}>
        <ImplementationDeployPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_SECURITY_SETTINGS.URL}>
        <OrganizationSecuritySettingsPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_PASSWORD_RULES.URL}>
        <PasswordRulesPage />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_PAGE_NOT_FOUND.URL}>
        <PageNotFound />
      </AuthRoute>
      <AuthRoute path={ROUTES.ROUTE_UNAUTHORIZED.URL}>
        <AccessDenied />
      </AuthRoute>
      <AuthRoute>
        <PageNotFound />
      </AuthRoute>
    </Switch>
  );
};
