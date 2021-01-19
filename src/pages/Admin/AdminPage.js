import React from 'react';
import { ROUTES } from '../../data/constants/RouteConstants';

import { LayoutAdmin } from '../../layouts/LayoutAdmin';
import { Spacing } from '../../components/spacings/Spacing';

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
            url: '#',
            key: 'policies',
          },
          {
            name: 'Groups',
            url: '#',
            key: 'groups',
          },
        ],
      },
      {
        name: 'Organizations',
        links: [
          {
            name: 'Active Orgs',
            url: '#',
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

const _AdminPage = () => {
  return (
    <LayoutAdmin
      id="PageAdmin"
      sidebar={NAV_ITEMS}
    >
      <Spacing margin="double">
        
      </Spacing>
    </LayoutAdmin>
  );
};

const AdminPage = React.memo(_AdminPage);

export { AdminPage };
