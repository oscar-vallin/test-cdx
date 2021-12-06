/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { SpinnerSize } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { id } from 'date-fns/locale';
import { getItemStyles } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.classNames';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Button, Link } from '../../../../components/buttons';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Text } from '../../../../components/typography/Text';
import { CreateGroupPanel } from './CreateGroup';
import { Separator } from '../../../../components/separators/Separator';

import {
  useAccessPolicyGroupsForOrgLazyQuery,
  useDeleteAccessPolicyGroupMutation,
} from '../../../../data/services/graphql';
import { StyledColumn, StyledCommandButton } from './AccessManagementGroupsPage.styles';

import { useOrgSid } from '../../../../hooks/useOrgSid';
import { useQueryHandler } from '../../../../hooks/useQueryHandler';
import { useAccessManagementGroupsPageService } from './AccessManagementGroupsPage.service';

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
    createColumn({ name: 'Name', key: 'name' }),
    createColumn({ name: 'Template', key: 'tmpl' }),
    createColumn({ name: '', key: 'actions' }),
  ];
};

const _AccessManagementGroupsPage = () => {
  const { orgSid } = useOrgSid();
  const [groups, setGroups] = useState<any[]>([]);
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDialog, setDialog] = useState(false);
  const Toast = useNotification();

  const [apiAmGroupsForOrg, { data, loading }] = useQueryHandler(useAccessPolicyGroupsForOrgLazyQuery);
  const [selectedGroupId, setSelectedGroupId] = useState(0);

  const { deleteAccessPolicyGroup, deleteLoading, deleteError, deleteData } = useAccessManagementGroupsPageService();

  useEffect(() => {
    apiAmGroupsForOrg({ variables: { orgSid } });
  }, [orgSid]);

  useEffect(() => {
    if (!loading && data) {
      setGroups(data.accessPolicyGroupsForOrg.nodes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // Handle delete.
  useEffect(() => {
    if (deleteData) {
      if (deleteData.deleteAccessPolicyGroup === 'SUCCESS') {
        if (selectedGroupId === 0 || groups.length === 0) return;

        const text = `Access Policy Group ${groups.find(({ sid }) => sid === selectedGroupId).name} Deleted.`;
        setGroups(groups.filter(({ sid }) => sid !== selectedGroupId));
        Toast.info({ text, duration: 3000 });
      }
    }
  }, [deleteData]);

  // * ---------------------------------------------------
  // * ---------------------------------------------------

  // *
  // * Handle Delete function.
  const handleDeleteGroup = (id) => {
    setSelectedGroupId(id);
    setDialog(true);
  };

  // *
  // * Handle Create Function.
  const handleCreateGroup = () => {
    setIsPanelOpen(true);
    setSelectedGroupId(0);

    return null;
  };

  const onRenderItemColumn = (item, index, column) => {
    if (column.key === 'tmpl') {
      return <FontIcon iconName={item.tmpl ? 'CheckMark' : 'Cancel'} />;
    }
    if (column.key === 'actions') {
      return (
        <>
          &nbsp;
          <StyledCommandButton
            iconProps={{ iconName: 'Delete' }}
            onClick={() => {
              handleDeleteGroup(item.sid);
            }}
          />
        </>
      );
    }

    if (column.key === 'name') {
      return (
        <>
          &nbsp;
          <Link
            onClick={() => {
              setSelectedGroupId(item.sid);
              setIsPanelOpen(true);
            }}
          >
            {item.name}
          </Link>
        </>
      );
    }
    return item[column.key];
  };

  //
  // Render Loading Records
  const renderLoadingRecords = () => {
    return (
      <Spacing margin={{ top: 'double' }}>
        <Spinner size={SpinnerSize.large} label="Loading groups" />
      </Spacing>
    );
  };

  //
  // Render No Records found
  const renderNoRecords = () => {
    return (
      <EmptyState
        title="No access groups found"
        description="You haven't created an access group yet. Click the button below to create a new group."
        actions={
          <Button id="CreateGroupButton" variant="primary" onClick={handleCreateGroup}>
            Create group
          </Button>
        }
      />
    );
  };

  const renderCreateGroupButton = () => {
    return (
      <>
        <Row>
          <Column lg="6">
            <Spacing margin={{ top: 'small' }}>
              <Text variant="bold">Groups</Text>
            </Spacing>
          </Column>

          <Column lg="6" right>
            <Button
              id="CreateGroupButton"
              variant="primary"
              onClick={() => {
                setIsPanelOpen(true);
                return null;
              }}
            >
              Create group
            </Button>
          </Column>
        </Row>
        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Separator />
            </Spacing>
          </Column>
        </Row>
      </>
    );
  };

  //
  // !Render Page
  //
  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_GROUPS">
      <>
        <Spacing margin="double">
          {groups.length > 0 && renderCreateGroupButton()}
          <Row>
            <StyledColumn lg="12">
              {loading ? (
                () => renderLoadingRecords()
              ) : !groups.length ? (
                renderNoRecords()
              ) : (
                <DetailsList
                  items={groups}
                  selectionMode={SelectionMode.none}
                  columns={columns}
                  layoutMode={DetailsListLayoutMode.justified}
                  onRenderItemColumn={onRenderItemColumn}
                  isHeaderVisible
                />
              )}
            </StyledColumn>
          </Row>
        </Spacing>

        {isDialog && (
          <DialogYesNo
            open={isDialog}
            highlightNo
            title="Delete Group"
            message="Are you sure?"
            onYes={() => {
              deleteAccessPolicyGroup(selectedGroupId.toString());
              return null;
            }}
            onClose={() => {
              setDialog(false);
              return null;
            }}
          />
        )}

        <CreateGroupPanel
          isOpen={isPanelOpen}
          onCreateGroupPolicy={(createdPolicy) => {
            setGroups([
              ...groups,
              {
                sid: createdPolicy.sid,
                name: createdPolicy.name.value,
                tmpl: createdPolicy.tmpl.value,
                tmplUseAsIs: createdPolicy.tmplUseAsIs.value,
              },
            ]);
          }}
          onUpdateGroupPolicy={(updatedPolicy) => {
            const filteredGroups = groups.filter(({ sid }) => sid !== updatedPolicy.sid);
            setGroups([
              ...filteredGroups,
              {
                sid: updatedPolicy.sid,
                name: updatedPolicy.name.value,
                tmpl: updatedPolicy.tmpl.value,
                tmplUseAsIs: updatedPolicy.tmplUseAsIs.value,
              },
            ]);
          }}
          onDismiss={() => {
            setIsPanelOpen(false);
            setSelectedGroupId(0);
          }}
          selectedGroupId={selectedGroupId}
        />
      </>
    </LayoutAdmin>
  );
};

const AccessManagementGroupsPage = memo(_AccessManagementGroupsPage);

export { AccessManagementGroupsPage };
