import React, { useEffect, useState } from 'react';
import {
  DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, SearchBox, Stack,
} from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';

import {
  ActiveEnum,
  CdxWebCommandType,
  useDeactivateUsersMutation,
  UserItem,
  SortDirection,
} from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { UsersTable } from 'src/pages/Admin/Users/UsersTable';
import { useUsersLists } from 'src/pages/Admin/Users/useUsersList';
import { ROUTE_ACTIVE_USERS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { Paginator } from 'src/components/tables/Paginator';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { PageBody } from 'src/components/layouts/Column';
import { UpdateUserPanel, useUpdateUserPanel } from '../UpdateUsers';
import { CreateUsersPanel } from '../CreateUsers';
import { SearchBoxStyled, PrimaryButtonStyled, ColumnStyled } from './ActiveUserPage.styles';

const ActiveUsersPage = () => {
  const { orgSid } = useOrgSid();
  const [isCreateUserPanelOpen, setIsCreateUserPanelOpen] = useState(false);
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedItems, setSelectedItems] = useState<UserItem[]>([]);
  const [lockedFilter, setLockedFilter] = useState<boolean>(false);
  const [pendingActivationFilter, setPendingActivationFilter] = useState<boolean>(false);
  const [expiredActivationFilter, setExpiredActivationFilter] = useState<boolean>(false);
  const [searchAllOrgsFilter, setSearchAllOrgsFilter] = useState<boolean>(false);

  const tableFilters = useTableFilters('Name, Last Name, Email, etc.', [
    { property: 'person.lastNm', direction: SortDirection.Asc },
    { property: 'person.firstNm', direction: SortDirection.Asc },
    { property: 'email', direction: SortDirection.Asc },
  ]);

  const [disableUser] = useDeactivateUsersMutation();

  const updateUserPanel = useUpdateUserPanel();

  const userService = useUsersLists(ActiveEnum.Active);

  const createCmd = userService.commands?.find((cmd) => cmd.commandType === CdxWebCommandType.Create);

  useEffect(() => {
    // Reset the page number when any filtering occurs
    tableFilters.setPagingParams({
      pageNumber: 0,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lockedFilter,
    pendingActivationFilter,
    expiredActivationFilter,
    searchAllOrgsFilter,
    tableFilters.searchText.delayedValue,
  ]);

  useEffect(() => {
    setLockedFilter(false);
    setPendingActivationFilter(false);
    setExpiredActivationFilter(false);
  }, [tableFilters.searchText.delayedValue]);

  useEffect(() => {
    userService
      .fetchUsers(
        0,
        tableFilters.pagingParams.sort,
        lockedFilter,
        pendingActivationFilter,
        expiredActivationFilter,
        searchAllOrgsFilter,
        tableFilters.searchText.delayedValue,
      )
      .then();
  }, [tableFilters.pagingParams]);

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedItems([]);
  };

  const selectedUserIds = () => selectedItems.map((node) => node?.item?.sid);

  const renderCreateButton = (id: string) => {
    if (createCmd) {
      return (
        <PrimaryButtonStyled
          id={id}
          iconProps={{ iconName: 'AddFriend' }}
          ariaLabel={createCmd.label ?? undefined}
          onClick={() => {
            setIsCreateUserPanelOpen(true);
          }}
        >
          {createCmd.label}
        </PrimaryButtonStyled>
      );
    }
    return null;
  };

  const renderEmptyState = () => {
    let emptyText = '';

    if (lockedFilter) {
      emptyText = 'There are no locked users found.';
    }

    if (pendingActivationFilter) {
      emptyText = 'There are no users pending activation.';
    }

    if (expiredActivationFilter) {
      emptyText = 'There are no users with and expired activation.';
    }

    if (tableFilters.searchText.delayedValue) {
      emptyText = `No users were found matching '${tableFilters.searchText.delayedValue}'.`;
    }

    if (
      !lockedFilter
      && !pendingActivationFilter
      && !expiredActivationFilter
      && !tableFilters.searchText.delayedValue.length
    ) {
      emptyText = createCmd
        ? 'There are no active users in this organization. Click the button below to create a new user.'
        : 'There are no active users in this organization.';
    }
    return (
      <EmptyState title="No users found" description={emptyText} actions={renderCreateButton('__Create-User-Empty')} />
    );
  };

  const renderBody = () => (
    <>
      <Stack
        horizontal={true}
        wrap={true}
        style={{ width: '100%' }}
        verticalAlign="end"
        horizontalAlign="space-between"
      >
        {tableFilters?.searchText && (
        <Column lg="6">
          <SearchBoxStyled
            id="Active_Users_Input-Search"
            autoComplete="off"
            autoFocus
            styles={{ root: { width: '100%' } }}
            onChange={tableFilters.searchText.onChange}
            placeholder="Search"
          />
        </Column>
        )}
        {userService.userSearchForm.lockedFilter?.visible && (
          <ColumnStyled lg="12">
            <UIInputCheck
              id="__Locked__Users-Checkbox"
              value={lockedFilter}
              uiField={userService.userSearchForm.lockedFilter}
              onChange={(_event, _lockedFilter: any) => {
                setLockedFilter(_lockedFilter);
              }}
            />
          </ColumnStyled>
        )}
        {userService.userSearchForm.pendingActivationFilter?.visible && (
          <ColumnStyled lg="12">
            <UIInputCheck
              id="__PendingActivation__Users-Checkbox"
              value={pendingActivationFilter}
              uiField={userService.userSearchForm.pendingActivationFilter}
              onChange={(_event, _pendingActivationFilter: any) => {
                setPendingActivationFilter(_pendingActivationFilter);
              }}
            />
          </ColumnStyled>
        )}
        {userService.userSearchForm.expiredActivationFilter?.visible && (
          <ColumnStyled lg="12">
            <UIInputCheck
              id="__ExpiredActivation__Users-Checkbox"
              value={expiredActivationFilter}
              uiField={userService.userSearchForm.expiredActivationFilter}
              onChange={(_event, _expiredActivationFilter: any) => {
                setExpiredActivationFilter(_expiredActivationFilter);
              }}
            />
          </ColumnStyled>
        )}
      </Stack>
      {userService.userSearchForm.searchAllOrgs?.visible && (
      <Spacing margin={{ top: 'normal' }}>
        <Column lg="6">
          <UIInputCheck
            id="__SearchAllOrgs__Users-Checkbox"
            value={searchAllOrgsFilter}
            uiField={userService.userSearchForm.searchAllOrgs}
            onChange={(_event, _searchAllOrgsFilter: any) => {
              setSearchAllOrgsFilter(_searchAllOrgsFilter);
            }}
          />
        </Column>
      </Spacing>
      )}
      {!userService.users?.length ? (
        renderEmptyState()
      ) : (
        <UsersTable
          tableFilters={tableFilters}
          users={userService.users}
          onClickUser={updateUserPanel.showPanel}
          tooltips={userService.tooltips}
          searchAllOrgs={searchAllOrgsFilter}
        />
      )}
      <Paginator id="__Paginator" pagingInfo={userService.pagingInfo} onPageChange={userService.onPageChange} />
    </>
  );

  return (
    <LayoutDashboard id="PageActiveUsers" menuOptionSelected={ROUTE_ACTIVE_USERS.API_ID}>
      <PageHeader id="__ActiveUsersHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="Active Users" />
            </Column>
            <Column lg="6" right>
              <span>{renderCreateButton('__Create-User')}</span>
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>
        <Container>
          <Row>{renderBody()}</Row>
        </Container>
      </PageBody>
      <CreateUsersPanel
        orgSid={orgSid}
        isOpen={isCreateUserPanelOpen}
        onCreateUser={() => {
          setSelectedItems([]);
          userService
            .fetchUsers(
              0,
              tableFilters.pagingParams.sort,
              lockedFilter,
              pendingActivationFilter,
              expiredActivationFilter,
              searchAllOrgsFilter,
              tableFilters.searchText.delayedValue,
            )
            .then();
        }}
        onDismiss={() => {
          setIsCreateUserPanelOpen(false);
        }}
      />

      <UpdateUserPanel
        useUpdateUserPanel={updateUserPanel}
        onUpdateUser={() => {
          setSelectedItems([]);
          userService
            .fetchUsers(
              0,
              tableFilters.pagingParams.sort,
              lockedFilter,
              pendingActivationFilter,
              expiredActivationFilter,
              searchAllOrgsFilter,
              tableFilters.searchText.delayedValue,
            )
            .then();
        }}
      />

      <Dialog
        hidden={isConfirmationHidden}
        onDismiss={hideConfirmation}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Disable user',
          subText: 'Do you really want to disable the selected user(s) ?',
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
