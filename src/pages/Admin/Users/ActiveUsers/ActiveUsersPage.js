/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { PrimaryButton, DefaultButton, MessageBar } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { SpinnerSize } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Button } from '../../../../components/buttons';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Text } from '../../../../components/typography';
import { Separator } from '../../../../components/separators/Separator';

import { CreateUsersPanel } from '../CreateUsers';
import { useUsersForOrgLazyQuery, useDeactivateUsersMutation } from '../../../../data/services/graphql';
import { StyledColumn } from './ActiveUsersPage.styles';

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

const onRenderItemColumn = (node, _index, column) => {
  return node.item[column.key] || node.item.person[column.key];
};

const _ActiveUsersPage = () => {
  const { orgSid } = useOrgSid();
  const [users, setUsers] = useState([]);
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedUserId] = useState(0);
  const [apiUsersForOrgFpLazy, { data, loading }] = useUsersForOrgLazyQuery();
  const [selectedItems, setSelectedItems] = useState([]);

  const [disableUser, { data: disableResponse, loading: isDisablingUser }] = useDeactivateUsersMutation();

  useEffect(() => {
    apiUsersForOrgFpLazy({
      variables: {
        orgSid,
        userFilter: { activeFilter: 'ACTIVE' },
      },
    });
  }, [orgSid]);

  const selection = useMemo(
    () =>
      new Selection({
        onSelectionChanged: () => {
          setSelectedItems(selection.getSelection());
        },
        selectionMode: SelectionMode.multiple,
      }),
    []
  );

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedItems([]);
  };

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.usersForOrg.nodes);
    }
  }, [loading]);

  const selectedUserIds = () => {
    return selectedItems.map((node) => {
      return node.item.sid;
    });
  };

  useEffect(() => {
    if (!isDisablingUser && disableResponse) {
      setUsers(users.filter(({ item }) => !selectedUserIds().includes(item.sid)));
    }
  }, [isDisablingUser, disableResponse]);

  return (
    <LayoutAdmin id="PageActiveUsers" sidebarOptionSelected="ACTIVE_USERS">
      <Spacing margin="double">
        {users.length > 0 && (
          <Row center>
            <Column lg="6">
              <Spacing margin={{ top: 'small' }}>
                <Text variant="bold">Active Users</Text>
              </Spacing>
            </Column>

            <Column lg="6" right>
              <span>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsPanelOpen(true);
                  }}
                >
                  Create user
                </Button>
                &nbsp; &nbsp;
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
              </span>
            </Column>
          </Row>
        )}

        {users.length > 0 && (
          <Row>
            <Column lg="12">
              <Spacing margin={{ top: 'normal' }}>
                <Separator />
              </Spacing>
            </Column>
          </Row>
        )}

        <Row>
          <StyledColumn>
            {loading ? (
              <Spacing margin={{ top: 'double' }}>
                <Spinner size={SpinnerSize.large} label="Loading active users" />
              </Spacing>
            ) : !users.length ? (
              <EmptyState
                title="No users found"
                description="You haven't created a user yet. Click the button below to create a new user."
                actions={
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsPanelOpen(true);
                    }}
                  >
                    Create user
                  </Button>
                }
              />
            ) : (
              <MarqueeSelection selection={selection}>
                <DetailsList
                  items={users}
                  columns={columns}
                  layoutMode={DetailsListLayoutMode.justified}
                  onRenderItemColumn={onRenderItemColumn}
                  selection={selection}
                  selectionPreservedOnEmptyClick
                  isHeaderVisible
                />
              </MarqueeSelection>
            )}
          </StyledColumn>
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
