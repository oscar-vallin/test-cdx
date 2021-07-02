import { RouteLink } from './AdminPage.styles';

export const NAV_ITEMS = [
  {
    links: [
      {
        name: 'Users',
        links: [
          {
            name: <RouteLink to="/admin/users/active-users">Active Users</RouteLink>,
            key: 'activeUsers',
          },
          {
            name: <RouteLink to="/admin/users/deleted-users">Deleted Users</RouteLink>,
            key: 'deletedUsers',
          },
        ],
      },
      {
        name: 'Access Management',
        links: [
          {
            name: <RouteLink to="/admin/access-management/policies">Policies</RouteLink>,
            key: 'policies',
          },
          {
            name: <RouteLink to="/admin/access-management/groups">Groups</RouteLink>,
            key: 'groups',
          },
        ],
      },
      {
        name: 'Organizations',
        links: [
          {
            name: <RouteLink to="/admin/organizations/active-orgs">Active Orgs</RouteLink>,
            key: 'activeOrgs',
          },
          {
            name: 'Org Activity',
            url: '#',
            key: 'orgActivity',
          },
        ],
      },
      {
        name: 'Tools',
        links: [
          {
            name: 'FTP Test',
            url: '#',
            key: 'ftpTest',
          },
          {
            name: 'Deploy',
            url: '#',
            key: 'deploy',
          },
        ],
      },
      {
        name: 'Security',
        links: [
          {
            name: 'User Account Rules',
            url: '#',
            key: 'userAccountRules',
          },
          {
            name: 'Password Rules',
            url: '#',
            key: 'passwordRules',
          },
          {
            name: 'SSO Config',
            url: '#',
            key: 'ssoConfig',
          },
        ],
      },
      {
        name: 'Activity',
        links: [
          {
            name: <RouteLink to="/admin/activity/current-activity">Current Activity</RouteLink>,
            key: 'userAccountRules',
          },
        ],
      },
    ],
  },
];
