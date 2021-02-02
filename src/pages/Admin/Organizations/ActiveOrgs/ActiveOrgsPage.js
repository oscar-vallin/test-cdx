import React from 'react';

import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Spacing } from '../../../../components/spacings/Spacing';

const NAV_ITEMS = [
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
    ],
  },
];

const _ActiveOrgsPage = () => {
  return (
    <LayoutAdmin id="PageActiveOrgs" sidebar={NAV_ITEMS} sidebarOptionSelected="activeOrgs">
      <Spacing margin="double">Active Orgs</Spacing>
    </LayoutAdmin>
  );
};

const ActiveOrgsPage = React.memo(_ActiveOrgsPage);

export { ActiveOrgsPage };
