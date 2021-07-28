import React, { useState, useEffect } from 'react';

import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { Text } from '../../../../components/typography/Text';
import { Separator } from '../../../../components/separators/Separator';
import { Link } from 'office-ui-fabric-react/lib/Link';

import { CreateUsersPanel } from '../CreateUsers';

import { useUsersForOrgFpQuery } from '../../../../data/services/graphql';
import { StyledColumn, RouteLink, StyledButtonAction } from './ActiveUsersPage.styles';

import { useAuthContext } from '../../../../contexts/AuthContext';

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
    createColumn({ name: 'First Name', key: 'firstNm' }),
    createColumn({ name: 'Last Name', key: 'lastNm' }),
  ];
};

const onRenderItemColumn = (item, _index, column) => {
  return item[column.key] || item['person'][column.key];
};

const _ActiveUsersPage = () => {
  const { orgSid } = useAuthContext();
  const [users, setUsers] = useState([]);
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const { data, loading } = useUsersForOrgFpQuery({
    variables: {
      orgSid,
      userFilter: { activeFilter: 'ACTIVE' },
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.usersForOrg.nodes);
    }
  }, [loading]);

  return (
    <LayoutAdmin id="PageActiveUsers" sidebarOptionSelected="ACTIVE_USERS">
      <Spacing margin="double">
        <Row>
          <Column lg="8">
            <Row center>
              <Column lg="4">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold">Active Users</Text>
                </Spacing>
              </Column>

              <Column lg="8" right>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsPanelOpen(true);
                  }}
                >
                  Create user
                </Button>
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
                    <MessageBar>No active users</MessageBar>
                  )
                ) : (
                  <Spacing margin={{ top: 'double' }}>
                    <Spinner size="lg" label="Loading active users" />
                  </Spacing>
                )}
              </StyledColumn>
            </Row>
          </Column>
        </Row>
      </Spacing>

      <CreateUsersPanel
        isOpen={isPanelOpen}
        onCreateUser={(createdUser) => {
          setUsers([...users, createdUser]);
        }}
        onDismiss={() => {
          setIsPanelOpen(false);
        }}
      />
    </LayoutAdmin>
  );
};

const ActiveUsersPage = React.memo(_ActiveUsersPage);

export { ActiveUsersPage };
