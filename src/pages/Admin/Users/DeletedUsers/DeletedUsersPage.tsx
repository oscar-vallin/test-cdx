import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton,
} from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Row, Column, Container } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import {
  ActiveEnum, useActivateUsersMutation, UserItem, SortDirection,
} from 'src/data/services/graphql';

import { UpdateUserPanel, useUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers';
import { UsersTable } from 'src/pages/Admin/Users/UsersTable';
import { useUsersLists } from 'src/pages/Admin/Users/useUsersList';
import { ROUTE_DELETED_USERS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { PageBody } from 'src/components/layouts/Column';
import { Paginator } from 'src/components/tables/Paginator';

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
    userService.fetchUsers(0, tableFilters.pagingParams.sort).then();
  }, [tableFilters.pagingParams]);

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedItems([]);
  };

  const selectedUserIds = () => selectedItems?.map((node) => node?.item?.sid);

  const renderBody = () => {
    if (!userService.users?.length) {
      return (
        <EmptyState title="No inactive users" description="There aren't any inactive users in this organization" />
      );
    }
    return (
      <>
        <UsersTable
          tableFilters={tableFilters}
          users={userService.users}
          onClickUser={updateUserPanel.showPanel}
        />
        <Paginator id="__Paginator" pagingInfo={userService.pagingInfo} onPageChange={userService.onPageChange} />
      </>
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
      <PageBody>
        <Container>
          <Row>{renderBody()}</Row>
        </Container>
      </PageBody>

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
          subText: 'Do you really want to enable the selected user ?',
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
