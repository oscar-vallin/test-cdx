/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, memo } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton, MessageBar } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Text } from '../../../../components/typography';
import { Separator } from '../../../../components/separators/Separator';
import { Button } from '../../../../components/buttons';
import { useUsersForOrgLazyQuery, useActivateUsersMutation } from '../../../../data/services/graphql';
import { StyledColumn } from './DeletedUsersPage.styles';

import { useOrgSid } from '../../../../hooks/useOrgSid';

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
  const [users, setUsers] = useState([]);
  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
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
        userFilter: { activeFilter: 'INACTIVE' },
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.usersForOrg.nodes);
    }
  }, [loading]);

  const selectedUserIds = () => {
    return selectedItems.map((node) => {
      return node.item.id;
    });
  };

  useEffect(() => {
    if (!isEnablingUser && enableResponse) {
      setUsers(users.filter(({ item }) => !selectedUserIds().includes(item.id)));
    }
  }, [isEnablingUser, enableResponse]);

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
      <MessageBar>No deleted users</MessageBar>
    );
  };

  return (
    <LayoutAdmin id="PageDeletedUsers" sidebarOptionSelected="DELETED_USERS">
      <Spacing margin="double">
        <Row>
          <Column lg="8">
            <Row>
              <Column lg="8">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold">Deleted Users</Text>
                </Spacing>
              </Column>
              <Column lg="4" right>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (selectedItems.length > 0) {
                      setIsConfirmationHidden(false);
                    } else {
                      alert('Please select at least one user');
                    }
                  }}
                >
                  Enable Users
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
                    <Spinner size="lg" label="Loading deleted users" />
                  </Spacing>
                )}
              </StyledColumn>
            </Row>
          </Column>
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
        modalProps={{ isBlocking: true, isDraggable: false }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              enableUser({
                variables: {
                  sidsInput: { sids: selectedUserIds() },
                },
              });
              setIsConfirmationHidden(true);
            }}
            text="Enable"
          />
          <DefaultButton onClick={hideConfirmation} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </LayoutAdmin>
  );
};

const DeletedUsersPage = memo(_DeletedUsersPage);

export { DeletedUsersPage };
