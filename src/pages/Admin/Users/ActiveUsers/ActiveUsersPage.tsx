import React, { useState } from 'react';
import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner, SpinnerSize } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutAdmin } from 'src/layouts/LayoutAdmin';
import { Button } from 'src/components/buttons';
import { Column, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';
import { Separator } from 'src/components/separators/Separator';

import { CreateUsersPanel } from '../CreateUsers';
import { UpdateUserPanel, useUpdateUserPanel } from '../UpdateUsers';
import { ActiveEnum, useDeactivateUsersMutation, UserItem } from 'src/data/services/graphql';
import { StyledColumn } from './ActiveUsersPage.styles';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { UsersTable } from "src/pages/Admin/Users/UsersTable";
import { useUsersLists } from "src/pages/Admin/Users/useUsersList";

const ActiveUsersPage = () => {
  const { orgSid } = useOrgSid();
  const [isCreateUserPanelOpen, setIsCreateUserPanelOpen] = useState(false);
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedItems, setSelectedItems] = useState<UserItem[]>([]);

  const [disableUser] = useDeactivateUsersMutation();

  const updateUserPanel = useUpdateUserPanel();

  const userService = useUsersLists(ActiveEnum.Active);

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedItems([]);
  };

  const selectedUserIds = () => {
    return selectedItems.map((node) => {
      return node?.item?.sid;
    });
  };

  return (
    <LayoutAdmin id="PageActiveUsers" sidebarOptionSelected="ACTIVE_USERS">
      <>
        <Spacing margin="double">
          {userService.users && userService.users.length > 0 && (
            <Row center>
              <Column lg="6">
                <Spacing margin={{ top: 'small' }}>
                  <PageTitle id="__Page_Title" title="Active Users" />
                </Spacing>
              </Column>

              <Column lg="6" right>
                <span>
                  <PrimaryButton
                    id="__Create-User"
                    iconProps={{ iconName: 'AddFriend' }}
                    onClick={() => {
                      setIsCreateUserPanelOpen(true);
                      return null;
                    }}
                  >
                    Create user
                  </PrimaryButton>
                </span>
              </Column>
            </Row>
          )}

          {userService.users && userService.users?.length > 0 && (
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
              {userService.loading ? (
                <Spacing margin={{ top: 'double' }}>
                  <Spinner size={SpinnerSize.large} label="Loading active users" />
                </Spacing>
              ) : !userService.users?.length ? (
                <EmptyState
                  title="No users found"
                  description="You haven't created a user yet. Click the button below to create a new user."
                  actions={
                    <Button
                      id="CreateUser"
                      variant="primary"
                      onClick={() => {
                        setIsCreateUserPanelOpen(true);
                        return null;
                      }}
                    >
                      Create user
                    </Button>
                  }
                />
              ) : (
                <UsersTable users={userService.users} onClickUser={updateUserPanel.showPanel}/>
              )}
            </StyledColumn>
          </Row>
        </Spacing>

        <CreateUsersPanel
          orgSid={orgSid}
          isOpen={isCreateUserPanelOpen}
          onCreateUser={() => {
            setSelectedItems([]);
            userService.fetchUsers().then();
          }}
          onDismiss={() => {
            setIsCreateUserPanelOpen(false);
          }}
        />

        <UpdateUserPanel
          useUpdateUserPanel={updateUserPanel}
          onUpdateUser={() => {
            setSelectedItems([]);
            userService.fetchUsers().then();
          }}
        />

        <Dialog
          hidden={isConfirmationHidden}
          onDismiss={hideConfirmation}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Disable user',
            subText: `Do you really want to disable the selected user(s) ?`,
          }}
          modalProps={{ isBlocking: true }}>
          <DialogFooter>
            <PrimaryButton
              onClick={() => {
                disableUser({
                  variables: {
                    sidsInput: { sids: selectedUserIds() },
                  },
                }).then();
                setIsConfirmationHidden(true);
              }}
              text="Disable"
            />
            <DefaultButton onClick={hideConfirmation} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </>
    </LayoutAdmin>
  );
};

export { ActiveUsersPage };
