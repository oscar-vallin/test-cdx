import React, { useState, useEffect } from 'react';
import { Dialog, DialogType, DialogFooter, SpinnerSize, PrimaryButton, DefaultButton, Spinner } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Row, Column, Container } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { 
  ActiveEnum, 
  useActivateUsersMutation, 
  UserItem, 
  SortDirection 
} from 'src/data/services/graphql';

import { UpdateUserPanel, useUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers';
import { UsersTable } from 'src/pages/Admin/Users/UsersTable';
import { useUsersLists } from 'src/pages/Admin/Users/useUsersList';
import { StyledColumn } from './DeletedUsersPage.styles';
import { ROUTE_DELETED_USERS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { useTableFilters } from 'src/hooks/useTableFilters';

const DeletedUsersPage = () => {
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedItems, setSelectedItems] = useState<UserItem[]>([]);

  const tableFilters = useTableFilters('Name, Last Name, Email, etc.', [
    { property: 'person.lastNm', direction: SortDirection.Asc },
    { property: 'person.firstNm', direction: SortDirection.Asc },
    { property: 'email', direction: SortDirection.Asc },
  ]);

  const [enableUser] = useActivateUsersMutation();

  const updateUserPanel = useUpdateUserPanel();

  const userService = useUsersLists(ActiveEnum.Inactive);

  useEffect(() => {
    // Reset the page number when any filtering occurs
    tableFilters.setPagingParams({
      pageNumber: 0,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableFilters.searchText.delayedValue]);

  useEffect(() => {
    userService.fetchUsers(
      0,
      tableFilters.pagingParams.sort,
    );
  }, [tableFilters.pagingParams]);

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
    if (!userService.users?.length) {
      return (
        <EmptyState title="No inactive users" description="There aren't any inactive users in this organization" />
      );
    }
    return (
      <UsersTable
            tableFilters={tableFilters}
            users={userService.users}
            onClickUser={updateUserPanel.showPanel}
        />
    );
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
