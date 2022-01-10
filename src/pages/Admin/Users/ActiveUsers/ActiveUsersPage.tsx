/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  DetailsList,
  IColumn,
  DetailsListLayoutMode,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Link,
  PrimaryButton,
  DefaultButton
} from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutAdmin } from 'src/layouts/LayoutAdmin';
import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageTitle } from 'src/components/typography';
import { Separator } from 'src/components/separators/Separator';

import { CreateUsersPanel } from '../CreateUsers';
import { UpdateUserPanel, useUpdateUserPanel } from '../UpdateUsers';
import {
  useUsersForOrgLazyQuery,
  useDeactivateUsersMutation,
  ActiveEnum,
  UserItem
} from 'src/data/services/graphql';
import { StyledColumn } from './ActiveUsersPage.styles';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { ErrorHandler } from "src/utils/ErrorHandler";

const userColumns: IColumn[] = [
  {
    name: 'First Name',
    key: 'firstNm',
    fieldName: 'person.firstNm',
    minWidth: 100,
    maxWidth: 255,
    isPadded: true
  },
  {
    name: 'Last Name',
    key: 'lastNm',
    fieldName: 'person.lastNm',
    minWidth: 100,
    maxWidth: 255,
    isPadded: true
  },
  {
    name: 'Email',
    key: 'email',
    fieldName: 'email',
    minWidth: 255,
    isPadded: true
  }
];

const _ActiveUsersPage = () => {
  const { orgSid } = useOrgSid();
  const [users, setUsers] = useState<UserItem[] | null | undefined>([]);
  const [isCreateUserPanelOpen, setIsCreateUserPanelOpen] = useState(false);
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [apiUsersForOrgFpLazy, { data, loading, error }] = useUsersForOrgLazyQuery();
  const [selectedItems, setSelectedItems] = useState<UserItem[]>([]);

  const [disableUser, { data: disableResponse, loading: isDisablingUser }] = useDeactivateUsersMutation();
  const handleError = ErrorHandler();

  const updateUserPanel = useUpdateUserPanel();

  const onRenderItemColumn = (node?: UserItem, itemIndex?: number, column?: IColumn) => {

    let columnVal: string | undefined;
    if (column?.key === 'email') {
      columnVal = node?.item?.email;
    } else if (column) {
        let personProp;
        const person = node?.item?.person;
        if (person) {
          personProp = person[column?.key];
        }
        columnVal = node?.item[column?.key] || personProp;
    } else {
      columnVal = '';
    }

    return (
      <>
        <Link
          id={`__ActiveUsersPage__Email_Field_${(itemIndex ?? 0) + 1}`}
          onClick={() => {
            if (node) {
              updateUserPanel.showPanel(node?.item?.sid);
            }
          }}>
          {columnVal}
        </Link>
      </>
    );

  };

  useEffect(() => {
    apiUsersForOrgFpLazy({
      variables: {
        orgSid,
        userFilter: { activeFilter: ActiveEnum.Active },
      },
    });
  }, [orgSid]);

  useEffect(() => {
    handleError(error);
  }, [error])

  // const selection = useMemo(
  //   () =>
  //     new Selection<UserItem>({
  //       onSelectionChanged: () => {
  //         setSelectedItems(selection.getSelection());
  //       },
  //       selectionMode: SelectionMode.multiple,
  //     }),
  //   []
  // );

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedItems([]);
  };

  const fetchUsers = async () => {
    apiUsersForOrgFpLazy({
      variables: {
        orgSid,
        userFilter: { activeFilter: ActiveEnum.Active },
      },
    });
  };

  useEffect(() => {
    if (!loading && data) {
      const users = data?.usersForOrg?.nodes ?? [];
      const items: UserItem[] = [];
      users.forEach((user) => {
        if (user) {
          items.push(user as UserItem);
        }
      });

      setUsers(items);
    }
  }, [loading]);

  const selectedUserIds = () => {
    return selectedItems.map((node) => {
      return node?.item?.sid;
    });
  };

  useEffect(() => {
    if (!isDisablingUser && disableResponse) {
      setUsers(users?.filter(({ item }) => !selectedUserIds().includes(item.sid)));
    }
  }, [isDisablingUser, disableResponse]);

  return (
    <LayoutAdmin id="PageActiveUsers" sidebarOptionSelected="ACTIVE_USERS">
      <>
        <Spacing margin="double">
          {!!users && users.length > 0 && (
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

          {users && users?.length > 0 && (
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
              ) : !users?.length ? (
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
                // <MarqueeSelection selection={selection}>
                  <DetailsList
                    items={users}
                    columns={userColumns}
                    layoutMode={DetailsListLayoutMode.justified}
                    onRenderItemColumn={onRenderItemColumn}
                    // selection={selection}
                    // selectionPreservedOnEmptyClick
                    selectionMode={SelectionMode.none}
                    isHeaderVisible
                  />
                // </MarqueeSelection>
              )}
            </StyledColumn>
          </Row>
        </Spacing>

        <CreateUsersPanel
          orgSid={orgSid}
          isOpen={isCreateUserPanelOpen}
          onCreateUser={() => {
            setSelectedItems([]);
            fetchUsers().then();
          }}
          onDismiss={() => {
            setIsCreateUserPanelOpen(false);
          }}
        />

        <UpdateUserPanel
          useUpdateUserPanel={updateUserPanel}
          onUpdateUser={() => {
            setSelectedItems([]);
            fetchUsers().then();
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

const ActiveUsersPage = React.memo(_ActiveUsersPage);

export { ActiveUsersPage };
