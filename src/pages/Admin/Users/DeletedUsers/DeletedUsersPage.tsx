import React, { useState } from 'react';
import { Dialog, DialogType, DialogFooter, SpinnerSize, PrimaryButton, DefaultButton, Spinner } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutAdmin } from 'src/layouts/LayoutAdmin';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';
import { Separator } from 'src/components/separators/Separator';
import { Button } from 'src/components/buttons';
import { ActiveEnum, useActivateUsersMutation, UserItem } from 'src/data/services/graphql';

import { UpdateUserPanel, useUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers';
import { UsersTable } from 'src/pages/Admin/Users/UsersTable';
import { useUsersLists } from 'src/pages/Admin/Users/useUsersList';
import { StyledColumn } from './DeletedUsersPage.styles';

const DeletedUsersPage = () => {
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedItems, setSelectedItems] = useState<UserItem[]>([]);

  const [enableUser] = useActivateUsersMutation();

  const updateUserPanel = useUpdateUserPanel();

  const userService = useUsersLists(ActiveEnum.Inactive);

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedItems([]);
  };

  const selectedUserIds = () => {
    return selectedItems?.map((node) => {
      return node?.item?.sid;
    });
  };

  const renderBody = () => {
    if (userService.loading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading inactive users" />
        </Spacing>
      );
    }
    if (!userService.users?.length) {
      return (
        <EmptyState title="No inactive users" description="There aren't any inactive users in this organization" />
      );
    }
    return <UsersTable users={userService.users} onClickUser={updateUserPanel.showPanel} />;
  };

  return (
    <LayoutAdmin id="PageDeletedUsers" sidebarOptionSelected="DELETED_USERS">
      <>
        <Spacing margin="double">
          {userService.users && userService.users.length > 0 && (
            <Row center>
              <Column lg="6">
                <Spacing margin={{ top: 'small' }}>
                  <PageTitle id="__Page_Title" title="Inactive Users" />
                </Spacing>
              </Column>

              <Column lg="6" right>
                <Button
                  id="__Enable Users"
                  variant="primary"
                  disabled={selectedItems.length === 0}
                  onClick={() => {
                    if (selectedItems && selectedItems?.length > 0) {
                      setIsConfirmationHidden(false);
                    }
                    return null;
                  }}
                >
                  Enable Users
                </Button>
              </Column>
            </Row>
          )}

          {userService.users && userService.users.length > 0 && (
            <Row>
              <Column lg="12">
                <Spacing margin={{ top: 'normal' }}>
                  <Separator />
                </Spacing>
              </Column>
            </Row>
          )}

          <Row>
            <StyledColumn>{renderBody()}</StyledColumn>
          </Row>
        </Spacing>

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
            title: 'Enable user',
            subText: `Do you really want to enable the selected user ?`,
          }}
          modalProps={{ isBlocking: true }}
        >
          <DialogFooter>
            <PrimaryButton
              onClick={() => {
                enableUser({
                  variables: {
                    sidsInput: { sids: selectedUserIds() },
                  },
                }).then();
                setIsConfirmationHidden(true);
              }}
              text="Enable"
            />
            <DefaultButton onClick={hideConfirmation} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </>
    </LayoutAdmin>
  );
};

export { DeletedUsersPage };
