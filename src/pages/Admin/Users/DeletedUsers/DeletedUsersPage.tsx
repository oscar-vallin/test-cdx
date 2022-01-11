/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, memo } from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  SpinnerSize,
  PrimaryButton,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Selection,
  Spinner,
  MarqueeSelection
} from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { LayoutAdmin } from 'src/layouts/LayoutAdmin';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Text } from 'src/components/typography';
import { Separator } from 'src/components/separators/Separator';
import { Button } from 'src/components/buttons';
import { useUsersForOrgLazyQuery, useActivateUsersMutation, ActiveEnum } from 'src/data/services/graphql';
import { StyledColumn } from './DeletedUsersPage.styles';

import { useOrgSid } from 'src/hooks/useOrgSid';

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

const _DeletedUsersPage = () => {
  const { orgSid } = useOrgSid();
  const [users, setUsers] = useState<any[] | null | undefined>([]);
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedItems, setSelectedItems] = useState<any[] | null | undefined>([]);
  const columns = generateColumns();

  const [apiUsersForOrgFpLazy, { data, loading }] = useUsersForOrgLazyQuery();
  const [enableUser, { data: enableResponse, loading: isEnablingUser }] = useActivateUsersMutation();

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
    apiUsersForOrgFpLazy({
      variables: {
        orgSid,
        userFilter: { activeFilter: ActiveEnum.Inactive },
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (!loading && data) {
      setUsers(data?.usersForOrg?.nodes);
    }
  }, [loading]);

  const selectedUserIds = () => {
    if (!selectedItems) return [];

    return selectedItems?.map((node) => {
      return node.item.id;
    });
  };

  useEffect(() => {
    if (!isEnablingUser && enableResponse) {
      setUsers(users?.filter(({ item }) => !selectedUserIds()?.includes(item.id)));
    }
  }, [isEnablingUser, enableResponse]);

  return (
    <LayoutAdmin id="PageDeletedUsers" sidebarOptionSelected="DELETED_USERS">
      <>
        <Spacing margin="double">
          {users && users.length > 0 && (
            <Row>
              <Column lg="6">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold">Inactive Users</Text>
                </Spacing>
              </Column>
              <Column lg="6" right>
                <Button
                  id="btn-restore-users"
                  variant="primary"
                  onClick={() => {
                    if (!!selectedItems && selectedItems?.length > 0) {
                      setIsConfirmationHidden(false);
                    } else {
                      alert('Please select at least one user');
                    }
                    return null;
                  }}
                >
                  Enable Users
                </Button>
              </Column>
            </Row>
          )}

          {!!users && users.length > 0 && (
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
                  <Spinner size={SpinnerSize.large} label="Loading deleted users" />
                </Spacing>
              ) : !users ? (
                <EmptyState description="No deleted users" />
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

const DeletedUsersPage = memo(_DeletedUsersPage);

export { DeletedUsersPage };
