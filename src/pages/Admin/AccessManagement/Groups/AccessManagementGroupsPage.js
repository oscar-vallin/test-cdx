import React, { useState, useEffect } from 'react';
import { ROUTES } from '../../../../data/constants/RouteConstants';

import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Row, Column } from '../../../../components/layouts';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';

import {
  useAmGroupsForOrgPQuery,
} from '../../../../data/services/graphql';

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

const generateColumns = () => {
  const createColumn = ({ name, key }) => ({
    name,
    key,
    fieldName: key,
    data: 'string',
    isPadded: true,
    minWidth: 225
  });

  return [
    createColumn({ name: 'ID', key: 'id' }),
    createColumn({ name: 'Name', key: 'name' }),
    createColumn({ name: 'Template', key: 'tmpl' }),
  ];
}

const onRenderItemColumn = (item, index, column) => {
  switch (column.key) {
    case 'tmpl':
      return <FontIcon iconName={(item.tmpl) ? 'CheckMark' : 'Cancel'} />
    default:
      return item[column.key];
  }
}

const _AccessManagementGroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const columns = generateColumns();
  
  const { data, loading } = useAmGroupsForOrgPQuery({ variables: { orgSid : 1 } });

  useEffect(() => {
    if (!loading && data) {
      setGroups(data.amGroupsForOrg.nodes);
    }
  }, [loading]);

  return (
    <LayoutAdmin
      id="PageAdmin"
      sidebar={NAV_ITEMS}
      sidebarOptionSelected="groups"
    >
      <Spacing margin="double">
        <Row>
          <Column>
            {
              !loading
              ? groups.length > 0
                ? (
                  <DetailsList
                    items={groups}
                    selectionMode={SelectionMode.none}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    onRenderItemColumn={onRenderItemColumn}
                    isHeaderVisible={true}
                  />
                )
                : (
                  <MessageBar>
                    No actions added for this permission
                  </MessageBar>
                )
              : <Spinner label="Loading groups" />
            }
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const AccessManagementGroupsPage = React.memo(_AccessManagementGroupsPage);

export { AccessManagementGroupsPage };
