export const ADMIN_NAV = [
  {
    links: [
      {
        name: 'Users',
        links: [
          {
            name: 'Active Users',
            url: '#',
            key: 'activeUsers',
          },
          {
            name: 'Deleted Users',
            url: '#',
            key: 'deletedUsers',
          },
        ],
      },
      {
        name: 'Access Management',
        links: [
          {
            name: 'Policies',
            url: '/admin/access-management/policies',
            key: 'policies',
          },
          {
            name: 'Groups',
            url: '/admin/access-management/groups',
            key: 'groups',
          },
        ],
      },
      {
        name: 'Organizations',
        links: [
          {
            name: 'Active Orgs',
            url: '/admin/organizations/active-orgs',
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
      // {
      //   name: 'Dashboard site',
      //   links: [
      //     {
      //       name: 'Color Palettes',
      //       url: '/admin/dashboard-site/color-palettes',
      //       key: 'colorPalettes',
      //     },
      //     {
      //       name: 'Default Theme',
      //       url: '/admin/dashboard-site/default-theme',
      //       key: 'defaultTheme',
      //     },
      //   ],
      // },
    ],
  },
];