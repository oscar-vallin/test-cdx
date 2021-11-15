/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { PrimaryButton, DefaultButton, MessageBar } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
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
  const createColumn: any = ({ name, key }: any) => ({
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
  const [users, setUsers]: any = useState([]);
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedUserId]: any = useState(0);
  const [apiUsersForOrgFpLazy, { data, loading }]: any = useUsersForOrgLazyQuery();
  const [selectedItems, setSelectedItems] = useState([]);

  const [disableUser, { data: disableResponse, loading: isDisablingUser }]: any = useDeactivateUsersMutation();

  useEffect(() => {
    apiUsersForOrgFpLazy({
      variables: {
        orgSid,
        userFilter: { activeFilter: 'ACTIVE' },
      },
    });
  }, [orgSid]);

  const selection: any = useMemo(
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
    return selectedItems.map((node: any) => {
      return node.item.sid;
    });
  };

  useEffect(() => {
    if (!isDisablingUser && disableResponse) {
      setUsers(users.filter(({ item }) => !selectedUserIds().includes(item.sid)));
    }
  }, [isDisablingUser, disableResponse]);

  const renderList = () => {
    return users.length > 0 ? (
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
    ) : (
      <MessageBar>No active users</MessageBar>
    );
  };

  return (
    <LayoutAdmin id="PageActiveUsers" sidebarOptionSelected="ACTIVE_USERS">
      <>
        <Spacing margin="double">
          <Row>
            <Column lg="8">
              <Row center>
                <Column lg="8">
                  <Spacing margin={{ top: 'small' }}>
                    <Text variant="bold">Active Users</Text>
                  </Spacing>
                </Column>

                <Column lg="2" right>
                  <Button
                    id="__ActiveUsersPageId"
                    variant="primary"
                    onClick={() => {
                      setIsPanelOpen(true);
                      return null;
                    }}
                  >
                    Create user
                  </Button>
                </Column>

                <Column lg="2" right>
                  <Button
                    id="__ActiveUsersPageId"
                    variant="primary"
                    onClick={() => {
                      if (selectedItems.length > 0) {
                        setIsConfirmationHidden(false);
                      } else {
                        alert('Please select at least one user');
                      }
                      return null;
                    }}
                  >
                    Disable Users
                  </Button>
                </Column>
              </Row>

              <Spacing margin={{ top: 'normal' }}>
                <Separator />
              </Spacing>

              <Row>
                <StyledColumn>
                  {!loading ? (
                    renderList()
                  ) : (
                    <Spacing margin={{ top: 'double' }}>
                      <Spinner size={SpinnerSize.large} label="Loading active users" />
                    </Spacing>
                  )}
                </StyledColumn>
              </Row>
            </Column>
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
          // selectedUserId={selectedUserId}
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
                });
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