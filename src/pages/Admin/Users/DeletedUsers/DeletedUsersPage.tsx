import React, { useState } from 'react';
import { Dialog, DialogType, DialogFooter, SpinnerSize, PrimaryButton, DefaultButton, Spinner } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Row, Column, Container } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';
import { ActiveEnum, useActivateUsersMutation, UserItem } from 'src/data/services/graphql';

import { UpdateUserPanel, useUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers';
import { UsersTable } from 'src/pages/Admin/Users/UsersTable';
import { useUsersLists } from 'src/pages/Admin/Users/useUsersList';
import { StyledColumn } from './DeletedUsersPage.styles';
import { ROUTE_DELETED_USERS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';

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
    <LayoutDashboard id="PageDeletedUsers" menuOptionSelected={ROUTE_DELETED_USERS.API_ID}>
      {userService.users && userService.users.length > 0 && (
        <PageHeader id="__InactiveUsersHeader">
          <Container>
            <Row>
              <Column lg="6" direction="row">
                <PageTitle id="__Page_Title" title="Inactive Users" />
              </Column>
            </Row>
          </Container>
        </PageHeader>
      )}

      <Container>
        <Row>
          <StyledColumn>{renderBody()}</StyledColumn>
        </Row>
      </Container>

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
    </LayoutDashboard>
  );
};

export { DeletedUsersPage };
