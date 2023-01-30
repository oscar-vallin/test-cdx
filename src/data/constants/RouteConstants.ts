export const ROUTES_ID = {
  HOME: 'home',
  LOGIN: 'login',
  SSO_LOGIN: 'sso-login',
  USER_SETTINGS: 'user-settings',
  DASHBOARD: 'dashboard',
  FILE_STATUS: 'file-status',
  ARCHIVES: 'archives',
  SCHEDULE: 'schedule',
  TRANSMISSIONS: 'transmissions',
  ERRORS: 'errors',
  VISUALIZATIONS: 'visualizations',
  ADMIN: 'admin',
  AM_GROUPS: 'access-management-groups',
  AM_POLICIES: 'access-management-policies',
  AM_SPECIALIZATION: 'access-management-specialization',
  ACTIVE_ORGS: 'active-orgs',
  ORG_ACTIVITY: 'current-activity',
  DELETED_ORGS: 'deleted-orgs',
  EXTERNAL_ORGS: 'external-orgs',
  COLOR_PALETTES: 'color-palettes',
  DEFAULT_THEME: 'default-theme',
  ACTIVE_USERS: 'active-users',
  USER_AUDIT_LOGS: 'user-audit-logs',
  DELETED_USERS: 'deleted-users',
  EXTERNAL_USERS: 'external-users',
  XCHANGE_LIST: 'xchange-list',
  FULL_SPEC_LIBRARY: 'full-spec-library',
  VENDOR_SPEC_LIBRARY: 'vendor_spec_library',
  ONTOLOGY_BROWSER: 'ontology-browser',
  XCHANGE_NAMING: 'xchange_naming',
  XCHANGE_ALERTS: 'xchange-alerts',
  XCHANGE_JOB_GROUPS: 'xchange-job-groups',
  XCHANGE_DETAILS: 'xchange-details',
  SUPPORTED_PLATFORMS: 'supported_platforms',
  FTP_TEST: 'ftp-test',
  IMPL_DEPLOY: 'implementation-deploy',
  V1LIB_DEPLOY: 'v1lib-deploy',
  PASSWORD_RULES: 'password-rules',
  PASSWORD_RESET: 'password-reset',
  SSO_CONFIG: 'sso-config',
  PAGE_NOT_FOUND: 'page-not-found',
  UNAUTHORIZED: 'unauthorized',
  SECURITY_SETTINGS: 'security-settings',
};

export const URL_ROUTES = {
  HOME: '/',
  LOGIN: `/${ROUTES_ID.LOGIN}`,
  SSO_LOGIN: `/${ROUTES_ID.SSO_LOGIN}`,
  USER_SETTINGS: `/${ROUTES_ID.USER_SETTINGS}`,
  DASHBOARD: `/${ROUTES_ID.DASHBOARD}`,
  DASHBOARD_TO_FILE_STATUS: `/${ROUTES_ID.FILE_STATUS}/filter/:id`,
  FILE_STATUS: `/${ROUTES_ID.FILE_STATUS}`,
  FILE_STATUS_DETAILS: `/${ROUTES_ID.FILE_STATUS}/:id`,
  ARCHIVES: `/${ROUTES_ID.ARCHIVES}`,
  SCHEDULE: `/${ROUTES_ID.SCHEDULE}`,
  VISUALIZATIONS: `/${ROUTES_ID.VISUALIZATIONS}`,
  TRANSMISSIONS: `/${ROUTES_ID.TRANSMISSIONS}`,
  ERRORS: `/${ROUTES_ID.ERRORS}`,
  AM_GROUPS: `/${ROUTES_ID.ADMIN}/access-management/groups`,
  AM_POLICIES: `/${ROUTES_ID.ADMIN}/access-management/policies`,
  AM_SPECIALIZATION: `/${ROUTES_ID.ADMIN}/access-management/specialization`,
  ACTIVE_ORGS: `/${ROUTES_ID.ADMIN}/organizations/active-orgs`,
  EXTERNAL_ORGS: `/${ROUTES_ID.ADMIN}/organizations/external-orgs`,
  ORG_ACTIVITY: `/${ROUTES_ID.ADMIN}/organizations/current-activity`,
  DELETED_ORGS: `/${ROUTES_ID.ADMIN}/organizations/deleted-orgs`,
  COLOR_PALETTES: `/${ROUTES_ID.ADMIN}/dashboard-site/color-palettes`,
  DEFAULT_THEME: `/${ROUTES_ID.ADMIN}/dashboard-site/default-theme`,
  ACTIVE_USERS: `/${ROUTES_ID.ACTIVE_USERS}`,
  USER_AUDIT_LOGS: `/${ROUTES_ID.USER_AUDIT_LOGS}`,
  DELETED_USERS: `/${ROUTES_ID.DELETED_USERS}`,
  EXTERNAL_USERS: `/${ROUTES_ID.EXTERNAL_USERS}`,
  XCHANGE_LIST: `/${ROUTES_ID.XCHANGE_LIST}`,
  FULL_SPEC_LIBRARY: `/${ROUTES_ID.FULL_SPEC_LIBRARY}`,
  VENDOR_SPEC_LIBRARY: `/${ROUTES_ID.VENDOR_SPEC_LIBRARY}`,
  ONTOLOGY_BROWSER: `/${ROUTES_ID.ONTOLOGY_BROWSER}`,
  XCHANGE_NAMING: `/${ROUTES_ID.XCHANGE_NAMING}`,
  XCHANGE_ALERTS: `/${ROUTES_ID.XCHANGE_ALERTS}`,
  XCHANGE_JOB_GROUPS: `/${ROUTES_ID.XCHANGE_JOB_GROUPS}`,
  XCHANGE_DETAILS: `/${ROUTES_ID.XCHANGE_DETAILS}`,
  SUPPORTED_PLATFORMS: `/${ROUTES_ID.SUPPORTED_PLATFORMS}`,
  FTP_TEST: `/${ROUTES_ID.FTP_TEST}`,
  IMPL_DEPLOY: `/${ROUTES_ID.IMPL_DEPLOY}`,
  V1LIB_DEPLOY: `/${ROUTES_ID.V1LIB_DEPLOY}`,
  PASSWORD_RULES: `/${ROUTES_ID.PASSWORD_RULES}`,
  PASSWORD_RESET: `/ua/${ROUTES_ID.PASSWORD_RESET}/:token`,
  SSO_CONFIG: `/${ROUTES_ID.SSO_CONFIG}`,
  PAGE_NOT_FOUND: `/${ROUTES_ID.PAGE_NOT_FOUND}`,
  UNAUTHORIZED: `/${ROUTES_ID.UNAUTHORIZED}`,
  SECURITY_SETTINGS: `/${ROUTES_ID.SECURITY_SETTINGS}`,
};

export type RouteType = {
  ID: string;
  TITLE: string;
  URL: string;
  MAIN_MENU: boolean;
  API_ID: string;
};

export const ROUTE_HOME: RouteType = {
  ID: ROUTES_ID.HOME,
  TITLE: '',
  URL: URL_ROUTES.HOME,
  MAIN_MENU: false,
  API_ID: 'HOME',
};

export const ROUTE_LOGIN: RouteType = {
  ID: ROUTES_ID.LOGIN,
  TITLE: 'Login',
  URL: URL_ROUTES.LOGIN,
  MAIN_MENU: false,
  API_ID: 'LOGIN',
};

export const ROUTE_SSO_LOGIN: RouteType = {
  ID: ROUTES_ID.SSO_LOGIN,
  TITLE: 'Login',
  URL: URL_ROUTES.SSO_LOGIN,
  MAIN_MENU: false,
  API_ID: 'LOGIN',
};

export const ROUTE_DASHBOARD: RouteType = {
  ID: ROUTES_ID.DASHBOARD,
  TITLE: 'CDX Dashboard',
  URL: URL_ROUTES.DASHBOARD,
  MAIN_MENU: true,
  API_ID: 'DASHBOARD',
};

export const ROUTE_USER_SETTINGS: RouteType = {
  ID: ROUTES_ID.USER_SETTINGS,
  TITLE: 'User Settings',
  URL: URL_ROUTES.USER_SETTINGS,
  MAIN_MENU: false,
  API_ID: 'USER_SETTINGS',
};

export const ROUTE_FILE_STATUS: RouteType = {
  ID: ROUTES_ID.FILE_STATUS,
  TITLE: 'File Status',
  URL: URL_ROUTES.FILE_STATUS,
  MAIN_MENU: true,
  API_ID: 'FILE_STATUS',
};

export const ROUTE_FILE_STATUS_DETAILS: RouteType = {
  ID: ROUTES_ID.FILE_STATUS,
  TITLE: 'File Status Details',
  URL: URL_ROUTES.FILE_STATUS_DETAILS,
  MAIN_MENU: false,
  API_ID: 'DASHBOARD',
};

export const ROUTE_ARCHIVES: RouteType = {
  ID: ROUTES_ID.ARCHIVES,
  TITLE: 'Archives',
  URL: URL_ROUTES.ARCHIVES,
  MAIN_MENU: true,
  API_ID: 'ARCHIVES',
};

export const ROUTE_SCHEDULE: RouteType = {
  ID: ROUTES_ID.SCHEDULE,
  TITLE: 'Schedule',
  URL: URL_ROUTES.SCHEDULE,
  MAIN_MENU: true,
  API_ID: 'SCHEDULE',
};

export const ROUTE_TRANSMISSIONS: RouteType = {
  ID: ROUTES_ID.TRANSMISSIONS,
  TITLE: 'Transmissions',
  URL: URL_ROUTES.TRANSMISSIONS,
  MAIN_MENU: true,
  API_ID: 'TRANSMISSIONS',
};

export const ROUTE_ERRORS: RouteType = {
  ID: ROUTES_ID.ERRORS,
  TITLE: 'Errors',
  URL: URL_ROUTES.ERRORS,
  MAIN_MENU: true,
  API_ID: 'ERRORS',
};

export const ROUTE_VISUALIZATIONS: RouteType = {
  ID: ROUTES_ID.VISUALIZATIONS,
  TITLE: 'Visualizations',
  URL: URL_ROUTES.VISUALIZATIONS,
  MAIN_MENU: true,
  API_ID: 'VISUALIZATIONS',
};

export const ROUTE_AM_GROUPS: RouteType = {
  ID: ROUTES_ID.AM_GROUPS,
  TITLE: 'Groups',
  URL: URL_ROUTES.AM_GROUPS,
  MAIN_MENU: false,
  API_ID: 'AM_GROUPS',
};

export const ROUTE_AM_POLICIES: RouteType = {
  ID: ROUTES_ID.AM_POLICIES,
  TITLE: 'Policies',
  URL: URL_ROUTES.AM_POLICIES,
  MAIN_MENU: false,
  API_ID: 'AM_POLICIES',
};

export const ROUTE_AM_SPECIALIZATION: RouteType = {
  ID: ROUTES_ID.AM_SPECIALIZATION,
  TITLE: 'Access Specialization',
  URL: URL_ROUTES.AM_SPECIALIZATION,
  MAIN_MENU: false,
  API_ID: 'AM_SPECIALIZATION',
};

export const ROUTE_ACTIVE_ORGS: RouteType = {
  ID: ROUTES_ID.ACTIVE_ORGS,
  TITLE: 'Active Orgs',
  URL: URL_ROUTES.ACTIVE_ORGS,
  MAIN_MENU: false,
  API_ID: 'ACTIVE_ORGS',
};

export const ROUTE_EXTERNAL_ORGS: RouteType = {
  ID: ROUTES_ID.ACTIVE_ORGS,
  TITLE: 'External Orgs',
  URL: URL_ROUTES.EXTERNAL_ORGS,
  MAIN_MENU: false,
  API_ID: 'EXTERNAL_ORGS',
};

export const ROUTE_DELETED_ORGS: RouteType = {
  ID: ROUTES_ID.DELETED_ORGS,
  TITLE: 'Inactive Orgs',
  URL: URL_ROUTES.DELETED_ORGS,
  MAIN_MENU: false,
  API_ID: 'DELETED_ORGS',
};

export const ROUTE_ACTIVITY_CURRENT: RouteType = {
  ID: ROUTES_ID.ORG_ACTIVITY,
  TITLE: 'Current Activity',
  URL: URL_ROUTES.ORG_ACTIVITY,
  MAIN_MENU: false,
  API_ID: 'ORG_ACTIVITY',
};

export const ROUTE_COLOR_PALETTES: RouteType = {
  ID: ROUTES_ID.COLOR_PALETTES,
  TITLE: 'Color Palettes',
  URL: URL_ROUTES.COLOR_PALETTES,
  MAIN_MENU: false,
  API_ID: 'COLOR_PALETTES',
};

export const ROUTE_DEFAULT_THEME: RouteType = {
  ID: ROUTES_ID.DEFAULT_THEME,
  TITLE: 'Default Theme',
  URL: URL_ROUTES.DEFAULT_THEME,
  MAIN_MENU: false,
  API_ID: 'THEME',
};

export const ROUTE_DASHBOARD_TO_FILE_STATUS: RouteType = {
  ID: ROUTES_ID.FILE_STATUS,
  TITLE: 'File Status',
  URL: URL_ROUTES.DASHBOARD_TO_FILE_STATUS,
  MAIN_MENU: false,
  API_ID: 'DASHBOARD_TO_FILE_STATUS',
};

export const ROUTE_ACTIVE_USERS: RouteType = {
  ID: ROUTES_ID.ACTIVE_USERS,
  TITLE: 'Active Users',
  URL: URL_ROUTES.ACTIVE_USERS,
  MAIN_MENU: false,
  API_ID: 'ACTIVE_USERS',
};

export const ROUTE_USER_AUDIT_LOGS: RouteType = {
  ID: ROUTES_ID.USER_AUDIT_LOGS,
  TITLE: 'User Audit Logs',
  URL: URL_ROUTES.USER_AUDIT_LOGS,
  MAIN_MENU: false,
  API_ID: 'USER_AUDIT_LOGS',
};

export const ROUTE_DELETED_USERS: RouteType = {
  ID: ROUTES_ID.DELETED_USERS,
  TITLE: 'Inactive Users',
  URL: URL_ROUTES.DELETED_USERS,
  MAIN_MENU: false,
  API_ID: 'DELETED_USERS',
};

export const ROUTE_EXTERNAL_USERS: RouteType = {
  ID: ROUTES_ID.EXTERNAL_USERS,
  TITLE: 'External Users',
  URL: URL_ROUTES.EXTERNAL_USERS,
  MAIN_MENU: false,
  API_ID: 'EXTERNAL_USERS',
};

export const ROUTE_XCHANGE_LIST: RouteType = {
  ID: ROUTES_ID.XCHANGE_LIST,
  TITLE: 'XChange List',
  URL: URL_ROUTES.XCHANGE_LIST,
  MAIN_MENU: false,
  API_ID: 'XCHANGE_LIST',
};

export const ROUTE_FULL_SPEC_LIBRARY: RouteType = {
  ID: ROUTES_ID.FULL_SPEC_LIBRARY,
  TITLE: 'Full Spec Library',
  URL: URL_ROUTES.FULL_SPEC_LIBRARY,
  MAIN_MENU: false,
  API_ID: 'FULL_SPEC_LIBRARY',
};

export const ROUTE_VENDOR_SPEC_LIBRARY: RouteType = {
  ID: ROUTES_ID.VENDOR_SPEC_LIBRARY,
  TITLE: 'Vendor Spec Library',
  URL: URL_ROUTES.VENDOR_SPEC_LIBRARY,
  MAIN_MENU: false,
  API_ID: 'VENDOR_SPEC_LIBRARY',
};

export const ROUTE_ONTOLOGY_BROWSER: RouteType = {
  ID: ROUTES_ID.ONTOLOGY_BROWSER,
  TITLE: 'Ontology Browser',
  URL: URL_ROUTES.ONTOLOGY_BROWSER,
  MAIN_MENU: false,
  API_ID: 'ONTOLOGY_BROWSER',
};

export const ROUTE_XCHANGE_NAMING: RouteType = {
  ID: ROUTES_ID.XCHANGE_NAMING,
  TITLE: 'Ontology Browser',
  URL: URL_ROUTES.XCHANGE_NAMING,
  MAIN_MENU: false,
  API_ID: 'XCHANGE_NAMING',
};

export const ROUTE_XCHANGE_ALERTS: RouteType = {
  ID: ROUTES_ID.XCHANGE_ALERTS,
  TITLE: 'Xchange Alerts',
  URL: URL_ROUTES.XCHANGE_ALERTS,
  MAIN_MENU: false,
  API_ID: 'XCHANGE_ALERTS',
};

export const ROUTE_XCHANGE_JOB_GROUPS: RouteType = {
  ID: ROUTES_ID.XCHANGE_JOB_GROUPS,
  TITLE: 'Xchange Job Groups',
  URL: URL_ROUTES.XCHANGE_JOB_GROUPS,
  MAIN_MENU: false,
  API_ID: 'XCHANGE_JOB_GROUPS',
};

export const ROUTE_XCHANGE_DETAILS: RouteType = {
  ID: ROUTES_ID.XCHANGE_DETAILS,
  TITLE: 'Xchange Details',
  URL: URL_ROUTES.XCHANGE_DETAILS,
  MAIN_MENU: false,
  API_ID: 'XCHANGE_DETAILS',
};

export const ROUTE_SUPPORTED_PLATFORMS: RouteType = {
  ID: ROUTES_ID.SUPPORTED_PLATFORMS,
  TITLE: 'Supported Platforms',
  URL: URL_ROUTES.SUPPORTED_PLATFORMS,
  MAIN_MENU: false,
  API_ID: 'SUPPORTED_PLATFORMS',
};

export const ROUTE_FTP_TEST: RouteType = {
  ID: ROUTES_ID.FTP_TEST,
  TITLE: 'FTP Test',
  URL: URL_ROUTES.FTP_TEST,
  MAIN_MENU: false,
  API_ID: 'FTP_TEST',
};

export const ROUTE_IMPL_DEPLOY: RouteType = {
  ID: ROUTES_ID.IMPL_DEPLOY,
  TITLE: 'Implementation Deploy',
  URL: URL_ROUTES.IMPL_DEPLOY,
  MAIN_MENU: false,
  API_ID: 'IMPL_DEPLOY',
};

export const ROUTE_V1LIB_DEPLOY: RouteType = {
  ID: ROUTES_ID.V1LIB_DEPLOY,
  TITLE: 'V1 Library Deploy',
  URL: URL_ROUTES.V1LIB_DEPLOY,
  MAIN_MENU: false,
  API_ID: 'V1LIB_DEPLOY',
};

export const ROUTE_PASSWORD_RULES = {
  ID: ROUTES_ID.PASSWORD_RULES,
  TITLE: 'Password Rules',
  URL: URL_ROUTES.PASSWORD_RULES,
  MAIN_MENU: false,
  API_ID: 'PASSWORD_RULES',
};

export const ROUTE_SECURITY_SETTINGS: RouteType = {
  ID: ROUTES_ID.SECURITY_SETTINGS,
  TITLE: 'Organization Security Settings',
  URL: URL_ROUTES.SECURITY_SETTINGS,
  MAIN_MENU: false,
  API_ID: 'SECURITY_SETTINGS',
};

export const ROUTE_PASSWORD_RESET: RouteType = {
  ID: ROUTES_ID.PASSWORD_RESET,
  TITLE: 'Password Reset',
  URL: URL_ROUTES.PASSWORD_RESET,
  MAIN_MENU: false,
  API_ID: 'N/A',
};

export const ROUTE_SSO_CONFIG: RouteType = {
  ID: ROUTES_ID.SSO_CONFIG,
  TITLE: 'Single Sign On',
  URL: URL_ROUTES.SSO_CONFIG,
  MAIN_MENU: false,
  API_ID: 'SSO_CONFIG',
};

export const ROUTE_PAGE_NOT_FOUND: RouteType = {
  ID: ROUTES_ID.PAGE_NOT_FOUND,
  TITLE: 'Page not found',
  URL: URL_ROUTES.PAGE_NOT_FOUND,
  MAIN_MENU: false,
  API_ID: 'N/A',
};

export const ROUTE_UNAUTHORIZED: RouteType = {
  ID: ROUTES_ID.UNAUTHORIZED,
  TITLE: 'Not authorized',
  URL: URL_ROUTES.UNAUTHORIZED,
  MAIN_MENU: false,
  API_ID: 'N/A',
};

export const ROUTES = {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SSO_LOGIN,
  ROUTE_USER_SETTINGS,
  ROUTE_DASHBOARD,
  ROUTE_DASHBOARD_TO_FILE_STATUS,
  ROUTE_FILE_STATUS,
  ROUTE_FILE_STATUS_DETAILS,
  ROUTE_ARCHIVES,
  ROUTE_SCHEDULE,
  ROUTE_TRANSMISSIONS,
  ROUTE_ERRORS,
  ROUTE_VISUALIZATIONS,
  ROUTE_ACCESS_MANAGEMENT_GROUPS: ROUTE_AM_GROUPS,
  ROUTE_ACCESS_MANAGEMENT_POLICIES: ROUTE_AM_POLICIES,
  ROUTE_ACCESS_MANAGEMENT_SPECIALIZATION: ROUTE_AM_SPECIALIZATION,
  ROUTE_ACTIVE_ORGS,
  ROUTE_EXTERNAL_ORGS,
  ROUTE_DELETED_ORGS,
  ROUTE_ACTIVITY_CURRENT,
  ROUTE_COLOR_PALETTES,
  ROUTE_DEFAULT_THEME,
  ROUTE_ACTIVE_USERS,
  ROUTE_DELETED_USERS,
  ROUTE_USER_AUDIT_LOGS,
  ROUTE_XCHANGE_LIST,
  ROUTE_FULL_SPEC_LIBRARY,
  ROUTE_VENDOR_SPEC_LIBRARY,
  ROUTE_ONTOLOGY_BROWSER,
  ROUTE_XCHANGE_NAMING,
  ROUTE_XCHANGE_ALERTS,
  ROUTE_XCHANGE_JOB_GROUPS,
  ROUTE_XCHANGE_DETAILS,
  ROUTE_SUPPORTED_PLATFORMS,
  ROUTE_FTP_TEST,
  ROUTE_IMPL_DEPLOY,
  ROUTE_V1LIB_DEPLOY,
  ROUTE_PASSWORD_RULES,
  ROUTE_PASSWORD_RESET,
  ROUTE_SSO_CONFIG,
  ROUTE_PAGE_NOT_FOUND,
  ROUTE_UNAUTHORIZED,
  ROUTE_SECURITY_SETTINGS,
  ROUTE_EXTERNAL_USERS,
};

export const ROUTES_ARRAY: RouteType[] = [
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SSO_LOGIN,
  ROUTE_USER_SETTINGS,
  ROUTE_DASHBOARD,
  ROUTE_DASHBOARD_TO_FILE_STATUS,
  ROUTE_FILE_STATUS,
  ROUTE_FILE_STATUS_DETAILS,
  ROUTE_ARCHIVES,
  ROUTE_SCHEDULE,
  ROUTE_TRANSMISSIONS,
  ROUTE_ERRORS,
  ROUTE_VISUALIZATIONS,
  ROUTE_AM_GROUPS,
  ROUTE_AM_POLICIES,
  ROUTE_AM_SPECIALIZATION,
  ROUTE_ACTIVE_ORGS,
  ROUTE_EXTERNAL_ORGS,
  ROUTE_DELETED_ORGS,
  ROUTE_ACTIVITY_CURRENT,
  ROUTE_COLOR_PALETTES,
  ROUTE_DEFAULT_THEME,
  ROUTE_ACTIVE_USERS,
  ROUTE_USER_AUDIT_LOGS,
  ROUTE_DELETED_USERS,
  ROUTE_XCHANGE_LIST,
  ROUTE_FULL_SPEC_LIBRARY,
  ROUTE_VENDOR_SPEC_LIBRARY,
  ROUTE_ONTOLOGY_BROWSER,
  ROUTE_XCHANGE_NAMING,
  ROUTE_XCHANGE_ALERTS,
  ROUTE_XCHANGE_JOB_GROUPS,
  ROUTE_XCHANGE_DETAILS,
  ROUTE_SUPPORTED_PLATFORMS,
  ROUTE_FTP_TEST,
  ROUTE_IMPL_DEPLOY,
  ROUTE_V1LIB_DEPLOY,
  ROUTE_PASSWORD_RULES,
  ROUTE_SECURITY_SETTINGS,
  ROUTE_SSO_CONFIG,
  ROUTE_EXTERNAL_USERS,
];

export const getRouteByApiId = (_apiId) => {
  const routeResult = ROUTES_ARRAY.find((route) => route.API_ID === _apiId);

  if (!routeResult) {
    return ROUTES_ARRAY.find((route) => route.API_ID === ROUTE_FILE_STATUS.API_ID);
  }

  return routeResult;
};
