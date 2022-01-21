export const ROUTES_ID = {
  HOME: 'home',
  LOGIN: 'login',
  USER_SETTINGS: 'user-settings',
  DASHBOARD: 'dashboard',
  FILE_STATUS: 'file-status',
  ARCHIVES: 'archives',
  SCHEDULE: 'schedule',
  TRANSMISSIONS: 'transmissions',
  ERRORS: 'errors',
  ADMIN: 'admin',
  ACCESS_MANAGEMENT_GROUPS: 'access-management-groups',
  ACCESS_MANAGEMENT_POLICIES: 'access-management-policies',
  ACCESS_MANAGEMENT_SPECIALIZATION: 'access-management-specialization',
  ACTIVE_ORGS: 'active-orgs',
  ORG_ACTIVITY: 'current-activity',
  COLOR_PALETTES: 'color-palettes',
  DEFAULT_THEME: 'default-theme',
  ACTIVE_USERS: 'active-users',
  DELETED_USERS: 'deleted-users',
  FTP_TEST: 'ftp-test',
  IMPL_DEPLOY: 'implementation-deploy',
  PASSWORD_RULES: 'password-rules',
  PASSWORD_RESET: 'password-reset',
};

export const URL_ROUTES = {
  HOME: '/',
  LOGIN: `/${ROUTES_ID.LOGIN}`,
  USER_SETTINGS: `/${ROUTES_ID.USER_SETTINGS}`,
  DASHBOARD: `/${ROUTES_ID.DASHBOARD}`,
  DASHBOARD_TO_FILE_STATUS: `/${ROUTES_ID.FILE_STATUS}/filter/:id`,
  FILE_STATUS: `/${ROUTES_ID.FILE_STATUS}`,
  FILE_STATUS_DETAILS: `/${ROUTES_ID.FILE_STATUS}/:id`,
  ARCHIVES: `/${ROUTES_ID.ARCHIVES}`,
  SCHEDULE: `/${ROUTES_ID.SCHEDULE}`,
  TRANSMISSIONS: `/${ROUTES_ID.TRANSMISSIONS}`,
  ERRORS: `/${ROUTES_ID.ERRORS}`,
  ADMIN: `/${ROUTES_ID.ADMIN}`,
  ACCESS_MANAGEMENT_GROUPS: `/${ROUTES_ID.ADMIN}/access-management/groups`,
  ACCESS_MANAGEMENT_POLICIES: `/${ROUTES_ID.ADMIN}/access-management/policies`,
  ACCESS_MANAGEMENT_SPECIALIZATION: `/${ROUTES_ID.ADMIN}/access-management/specialization`,
  ACTIVE_ORGS: `/${ROUTES_ID.ADMIN}/organizations/active-orgs`,
  ORG_ACTIVITY: `/${ROUTES_ID.ADMIN}/organizations/current-activity`,
  COLOR_PALETTES: `/${ROUTES_ID.ADMIN}/dashboard-site/color-palettes`,
  DEFAULT_THEME: `/${ROUTES_ID.ADMIN}/dashboard-site/default-theme`,
  ACTIVE_USERS: `/${ROUTES_ID.ACTIVE_USERS}`,
  DELETED_USERS: `/${ROUTES_ID.DELETED_USERS}`,
  FTP_TEST: `/${ROUTES_ID.FTP_TEST}`,
  IMPL_DEPLOY: `/${ROUTES_ID.IMPL_DEPLOY}`,
  PASSWORD_RULES: `/${ROUTES_ID.PASSWORD_RULES}`,
  PASSWORD_RESET: `/ua/${ROUTES_ID.PASSWORD_RESET}/:token`,
};

type RouteType = {
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

export const ROUTE_ADMIN: RouteType = {
  ID: ROUTES_ID.ADMIN,
  TITLE: 'Admin',
  URL: URL_ROUTES.ADMIN,
  MAIN_MENU: true,
  API_ID: 'ADMIN',
};

export const ROUTE_ACCESS_MANAGEMENT_GROUPS: RouteType = {
  ID: ROUTES_ID.ACCESS_MANAGEMENT_GROUPS,
  TITLE: 'Groups',
  URL: URL_ROUTES.ACCESS_MANAGEMENT_GROUPS,
  MAIN_MENU: false,
  API_ID: 'AM_GROUPS',
};

export const ROUTE_ACCESS_MANAGEMENT_POLICIES: RouteType = {
  ID: ROUTES_ID.ACCESS_MANAGEMENT_POLICIES,
  TITLE: 'Policies',
  URL: URL_ROUTES.ACCESS_MANAGEMENT_POLICIES,
  MAIN_MENU: false,
  API_ID: 'AM_POLICIES',
};

export const ROUTE_ACCESS_MANAGEMENT_SPECIALIZATION: RouteType = {
  ID: ROUTES_ID.ACCESS_MANAGEMENT_SPECIALIZATION,
  TITLE: 'Access Specialization',
  URL: URL_ROUTES.ACCESS_MANAGEMENT_SPECIALIZATION,
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

export const ROUTE_DELETED_USERS: RouteType = {
  ID: ROUTES_ID.DELETED_USERS,
  TITLE: 'Inactive Users',
  URL: URL_ROUTES.DELETED_USERS,
  MAIN_MENU: false,
  API_ID: 'DELETED_USERS',
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

export const ROUTE_PASSWORD_RULES = {
  ID: ROUTES_ID.PASSWORD_RULES,
  TITLE: 'Password Rules',
  URL: URL_ROUTES.PASSWORD_RULES,
  MAIN_MENU: false,
  API_ID: 'PASSWORD_RULES',
};

export const ROUTE_PASSWORD_RESET: RouteType = {
  ID: ROUTES_ID.PASSWORD_RESET,
  TITLE: 'Password Reset',
  URL: URL_ROUTES.PASSWORD_RESET,
  MAIN_MENU: false,
  API_ID: 'N/A',
};

export const ROUTES = {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_USER_SETTINGS,
  ROUTE_DASHBOARD,
  ROUTE_DASHBOARD_TO_FILE_STATUS,
  ROUTE_FILE_STATUS,
  ROUTE_FILE_STATUS_DETAILS,
  ROUTE_ARCHIVES,
  ROUTE_SCHEDULE,
  ROUTE_TRANSMISSIONS,
  ROUTE_ERRORS,
  ROUTE_ADMIN,
  ROUTE_ACCESS_MANAGEMENT_GROUPS,
  ROUTE_ACCESS_MANAGEMENT_POLICIES,
  ROUTE_ACCESS_MANAGEMENT_SPECIALIZATION,
  ROUTE_ACTIVE_ORGS,
  ROUTE_ACTIVITY_CURRENT,
  ROUTE_COLOR_PALETTES,
  ROUTE_DEFAULT_THEME,
  ROUTE_ACTIVE_USERS,
  ROUTE_DELETED_USERS,
  ROUTE_FTP_TEST,
  ROUTE_IMPL_DEPLOY,
  ROUTE_PASSWORD_RULES,
  ROUTE_PASSWORD_RESET,
};

export const ROUTES_ARRAY: RouteType[] = [
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_USER_SETTINGS,
  ROUTE_DASHBOARD,
  ROUTE_DASHBOARD_TO_FILE_STATUS,
  ROUTE_FILE_STATUS,
  ROUTE_FILE_STATUS_DETAILS,
  ROUTE_ARCHIVES,
  ROUTE_SCHEDULE,
  ROUTE_TRANSMISSIONS,
  ROUTE_ERRORS,
  ROUTE_ADMIN,
  ROUTE_ACCESS_MANAGEMENT_GROUPS,
  ROUTE_ACCESS_MANAGEMENT_POLICIES,
  ROUTE_ACCESS_MANAGEMENT_SPECIALIZATION,
  ROUTE_ACTIVE_ORGS,
  ROUTE_ACTIVITY_CURRENT,
  ROUTE_COLOR_PALETTES,
  ROUTE_DEFAULT_THEME,
  ROUTE_ACTIVE_USERS,
  ROUTE_DELETED_USERS,
  ROUTE_FTP_TEST,
  ROUTE_IMPL_DEPLOY,
  ROUTE_PASSWORD_RULES,
  ROUTE_PASSWORD_RESET,
];

export const getRouteByApiId = (_apiId) => {
  const routeResult = ROUTES_ARRAY.find((route) => route.API_ID === _apiId);

  if (!routeResult) {
    return ROUTES_ARRAY.find((route) => route.API_ID === ROUTE_FILE_STATUS.API_ID);
  }

  return routeResult;
};