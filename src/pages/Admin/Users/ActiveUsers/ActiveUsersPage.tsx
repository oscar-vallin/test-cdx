import React, { useState } from 'react';
import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Spinner, SpinnerSize } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';

import { ActiveEnum, CdxWebCommandType, useDeactivateUsersMutation, UserItem } from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { UsersTable } from 'src/pages/Admin/Users/UsersTable';
import { useUsersLists } from 'src/pages/Admin/Users/useUsersList';
import { ROUTE_ACTIVE_USERS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { Paginator } from 'src/components/tables/Paginator';
import { StyledColumn } from './ActiveUsersPage.styles';
import { UpdateUserPanel, useUpdateUserPanel } from '../UpdateUsers';
import { CreateUsersPanel } from '../CreateUsers';

const ActiveUsersPage = () => {
  const { orgSid } = useOrgSid();
  const [isCreateUserPanelOpen, setIsCreateUserPanelOpen] = useState(false);
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedItems, setSelectedItems] = useState<UserItem[]>([]);

  const [disableUser] = useDeactivateUsersMutation();

  const updateUserPanel = useUpdateUserPanel();

  const userService = useUsersLists(ActiveEnum.Active);

  const createCmd = userService.commands?.find((cmd) => cmd.commandType === CdxWebCommandType.Create);

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedItems([]);
  };

  const selectedUserIds = () => {
    return selectedItems.map((node) => {
      return node?.item?.sid;
    });
  };

  const renderCreateButton = () => {
    if (createCmd) {
      return (
        <PrimaryButton
          id="__Create-User"
          iconProps={{ iconName: 'AddFriend' }}
          ariaLabel={createCmd.label ?? undefined}
          onClick={() => {
            setIsCreateUserPanelOpen(true);
          }}
        >
          {createCmd.label}
        </PrimaryButton>
      );
    }
    return null;
  };

  const renderEmptyState = () => {
    const emptyText = createCmd
      ? 'There are no active users in this organization. Click the button below to create a new user.'
      : 'There are no active users in this organization.';

    return <EmptyState title="No users found" description={emptyText} actions={renderCreateButton()} />;
  };

  const renderBody = () => {
    if (userService.loading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading active users" />
        </Spacing>
      );
    }

    if (!userService.users?.length) {
      return renderEmptyState();
    }

    return (
      <>
        <UsersTable users={userService.users} onClickUser={updateUserPanel.showPanel} />
        <Paginator pagingInfo={userService.pagingInfo} onPageChange={userService.onPageChange} />
      </>
    );
  };

  return (
    <LayoutDashboard id="PageActiveUsers" menuOptionSelected={ROUTE_ACTIVE_USERS.API_ID}>
      {userService.users && userService.users.length > 0 && (
        <PageHeader id="__ActiveUsersHeader">
          <Container>
            <Row>
              <Column lg="6" direction="row">
                <PageTitle id="__Page_Title" title="Active Users" />
              </Column>
              <Column lg="6" right>
                <span>{renderCreateButton()}</span>
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
        modalProps={{ isBlocking: true }}
      >
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
    </LayoutDashboard>
  );
};

export { ActiveUsersPage };
