import React, { useState, useEffect } from 'react';

import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { IconButton, CommandBarButton, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Text } from '../../../../components/typography/Text';
import { Separator } from '../../../../components/separators/Separator';

import { useAmPoliciesForOrgPQuery } from '../../../../data/services/graphql';

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
    minWidth: 225,
  });

  return [
    createColumn({ name: 'ID', key: 'id' }),
    createColumn({ name: 'Name', key: 'name' }),
    createColumn({ name: 'Template', key: 'tmpl' }),
  ];
};

const onRenderItemColumn = (item, index, column) => {
  switch (column.key) {
    case 'tmpl':
      return <FontIcon iconName={item.tmpl ? 'CheckMark' : 'Cancel'} />;
    default:
      return item[column.key];
  }
};

const _AccessManagementPoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const columns = generateColumns();

  const { data, loading } = useAmPoliciesForOrgPQuery({ variables: { orgSid: 1 } });

  useEffect(() => {
    if (!loading && data) {
      setPolicies(data.amPoliciesForOrg.nodes);
    }
  }, [loading]);

  return (
    <LayoutAdmin id="PageAdmin" sidebar={NAV_ITEMS} sidebarOptionSelected="groups">
      <Spacing margin="double">
        <Row>
          <Column lg="4">
            <Spacing margin={{ top: 'small' }}>
              <Text variant="bold">Policies</Text>
            </Spacing>
          </Column>

          <Column lg="4" right>
            <Spacing margin={{ top: 'small' }}>
              <CommandBarButton
                iconProps={{ iconName: 'Add' }}
                onClick={() => window.location.href = '/admin/access-management/create-policy'}
              >
                Add policy
              </CommandBarButton>
            </Spacing>
          </Column>
        </Row>

        <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
          <Separator />
        </Spacing>

        <Row>
          <Column lg="6">
            {!loading ? (
              policies.length > 0 ? (
                <DetailsList
                  items={policies}
                  selectionMode={SelectionMode.none}
                  columns={columns}
                  layoutMode={DetailsListLayoutMode.justified}
                  onRenderItemColumn={onRenderItemColumn}
                  isHeaderVisible
                />
              ) : (
                <MessageBar>No policies added</MessageBar>
              )
            ) : (
              <Spinner label="Loading policies" />
            )}
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const AccessManagementPoliciesPage = React.memo(_AccessManagementPoliciesPage);

export { AccessManagementPoliciesPage };
