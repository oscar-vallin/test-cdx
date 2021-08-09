import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton, MessageBar } from 'office-ui-fabric-react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Text } from '../../../../components/typography/Text';
import { Separator } from '../../../../components/separators/Separator';
import { Link } from 'office-ui-fabric-react/lib/Link';

import { CreateUsersPanel } from '../CreateUsers';

import { useUsersForOrgFpQuery, useDeactivateUsersMutation } from '../../../../data/services/graphql';
import { StyledColumn, RouteLink, StyledCommandButton } from './ActiveUsersPage.styles';

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
    createColumn({ name: 'First Name', key: 'firstNm' }),
    createColumn({ name: 'Last Name', key: 'lastNm' }),
    createColumn({ name: '', key: 'actions' }),
  ];
};

const _ActiveUsersPage = () => {
  const { orgSid } = useAuthContext();
  const [users, setUsers] = useState([]);
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [
    disableUser,
    { data: disableResponse, loading: isDisablingUser, error: DisableUserError },
  ] = useDeactivateUsersMutation();
  const { data, loading } = useUsersForOrgFpQuery({
    variables: {
      orgSid,
      userFilter: { activeFilter: 'ACTIVE' },
    },
  });

  const onRenderItemColumn = (node, _index, column) => {
    if (column.key == 'actions') {
      return (
        <Fragment>
          <StyledCommandButton
            iconProps={{ iconName: 'Delete' }}
            onClick={() => {
              setSelectedUserId(node.item.id);
              setIsConfirmationHidden(false);
            }}
          />
        </Fragment>
      );
    } else {
      return node.item[column.key] || node.item['person'][column.key];
    }
  };

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedUserId(0);
  };

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.usersForOrg.nodes);
    }
  }, [loading]);

  useEffect(() => {
    if (!isDisablingUser && disableResponse) {
      setPolicies(users.filter(({ item }) => item.id !== selectedUserId));
    }
  }, [isDisablingUser, disableResponse]);

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
          setSelectedUserId(0);
          setUsers([...users, createdUser]);
        }}
        onDismiss={() => {
          setIsPanelOpen(false);
        }}
        selectedUserId={selectedUserId}
      />

      <Dialog
        hidden={isConfirmationHidden}
        onDismiss={hideConfirmation}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Disable user',
          subText: `Do you really want to disable "${
            users.find(({ item }) => selectedUserId === item.id)?.item?.person?.firstNm || ''
          }"?`,
        }}
        modalProps={{ isBlocking: true, isDraggable: false }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              disableUser({
                variables: {
                  userSids: selectedUserId,
                },
              });

              setIsConfirmationHidden(true);
            }}
            text="Disable"
          />
          <DefaultButton onClick={hideConfirmation} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </LayoutAdmin>
  );
};

const ActiveUsersPage = React.memo(_ActiveUsersPage);

export { ActiveUsersPage };
