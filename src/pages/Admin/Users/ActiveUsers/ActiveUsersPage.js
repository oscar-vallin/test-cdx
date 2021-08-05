import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { PrimaryButton, DefaultButton, MessageBar } from 'office-ui-fabric-react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons/Button';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { DetailsList, DetailsListLayoutMode, SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Text } from '../../../../components/typography/Text';
import { Separator } from '../../../../components/separators/Separator';
import { CreateUsersPanel } from '../CreateUsers';
import { useUsersForOrgFpLazyQuery, useDeactivateUsersMutation } from '../../../../data/services/graphql';
import { StyledColumn, StyledCommandButton } from './ActiveUsersPage.styles';

import { useUsersForOrgFpLazyQuery } from '../../../../data/services/graphql';
import { StyledColumn, RouteLink, StyledButtonAction } from './ActiveUsersPage.styles';

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
    createColumn({ name: 'First Name', key: 'firstNm' }),
    createColumn({ name: 'Last Name', key: 'lastNm' }),
    createColumn({ name: 'Email', key: 'email' }),
  ];
};

const _ActiveUsersPage = () => {
  const { orgSid } = useOrgSid();
  const [users, setUsers] = useState([]);
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [useUsersForOrgFpLazy, { data, loading }] = useUsersForOrgFpLazyQuery();
  const [selectedItems, setSelectedItems] = useState([]);

  const [useUsersForOrgFpLazy, { data, loading }] = useUsersForOrgFpLazyQuery();

  // const { data, loading } = useUsersForOrgFpQuery();

  useEffect(() => {
    useUsersForOrgFpLazy({
      variables: {
        orgSid,
        userFilter: { activeFilter: 'ACTIVE' },
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.usersForOrg.nodes);
    }
  }, [loading]);

  const selectedUserIds = () => {
    return selectedItems.map((node) => {
      return node.item.id;
    });
  };

  useEffect(() => {
    if (!isDisablingUser && disableResponse) {
      setUsers(users.filter(({ item }) => !selectedUserIds().includes(item.id)));
    }
  }, [isDisablingUser, disableResponse]);

  return (
    <LayoutAdmin id="PageActiveUsers" sidebarOptionSelected="ACTIVE_USERS">
      <Spacing margin="double">
        <Row>
          <Column lg="8">
            <Row center>
              <Column lg="8">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold">Active Users</Text>
                </Spacing>
              </Column>

              <Column lg="2" right>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsPanelOpen(true);
                  }}
                >
                  Create user
                </Button>
              </Column>

              <Column lg="2" right>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (selectedItems.length > 0) {
                      setIsConfirmationHidden(false);
                    } else {
                      alert('Please select at least one user');
                    }
                  }}
                >
                  Disable Users
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
                    <MarqueeSelection selection={selection}>
                      <DetailsList
                        items={users}
                        columns={columns}
                        layoutMode={DetailsListLayoutMode.justified}
                        onRenderItemColumn={onRenderItemColumn}
                        selection={selection}
                        selectionPreservedOnEmptyClick={true}
                        isHeaderVisible
                      />
                    </MarqueeSelection>
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
          setSelectedItems([]);
          setUsers([...users, { item: createdUser.model }]);
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
          subText: `Do you really want to disable the selected user(s) ?`,
        }}
        modalProps={{ isBlocking: true, isDraggable: false }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              disableUser({
                variables: {
                  sidsInput: { sids: selectedUserIds() },
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
