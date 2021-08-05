import React, { useState, useEffect } from 'react';

import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { Text } from '../../../../components/typography/Text';
import { Separator } from '../../../../components/separators/Separator';

import { useUsersForOrgFpLazyQuery } from '../../../../data/services/graphql';
import { StyledColumn } from './DeletedUsersPage.styles';

// import { useAuthContext } from '../../../../contexts/AuthContext';
import { useOrgSid } from '../../../../hooks/useOrgSid';

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
    createColumn({ name: 'Email', key: 'email' }),
    createColumn({ name: 'First Name', key: 'person.firstName' }),
    createColumn({ name: 'Last Name', key: 'person.lastNm' }),
  ];
};

const onRenderItemColumn = (node, _index, column) => {
  return node.item[column.key] || node.item['person'][column.key];
};

const _DeletedUsersPage = () => {
  const { orgSid } = useOrgSid();
  const [users, setUsers] = useState([]);
  const columns = generateColumns();

  const [useUsersForOrgFpLazy, { data, loading }] = useUsersForOrgFpLazyQuery();

  useEffect(() => {
    useUsersForOrgFpLazy({
      variables: {
        orgSid,
        userFilter: { activeFilter: 'INACTIVE' },
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.usersForOrg.nodes);
    }
  }, [loading]);

  return (
    <LayoutAdmin id="PageDeletedUsers" sidebarOptionSelected="DELETED_USERS">
      <Spacing margin="double">
        <Row>
          <Column lg="8">
            <Row>
              <Column lg="4">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold">Deleted Users</Text>
                </Spacing>
              </Column>
            </Row>

            <Spacing margin={{ top: 'normal' }}>
              <Separator />
            </Spacing>

            <Row>
              <StyledColumn>
                {!loading ? (
                  users.length > 0 ? (
                    <DetailsList
                      items={users}
                      selectionMode={SelectionMode.none}
                      columns={columns}
                      layoutMode={DetailsListLayoutMode.justified}
                      onRenderItemColumn={onRenderItemColumn}
                      isHeaderVisible
                    />
                  ) : (
                    <MessageBar>No deleted users</MessageBar>
                  )
                ) : (
                  <Spacing margin={{ top: 'double' }}>
                    <Spinner size="lg" label="Loading deleted users" />
                  </Spacing>
                )}
              </StyledColumn>
            </Row>
          </Column>
        </Row>
      </Spacing>
    </LayoutAdmin>
  );
};

const DeletedUsersPage = React.memo(_DeletedUsersPage);

export { DeletedUsersPage };
