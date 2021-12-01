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
        setGroups(groups.filter(({ sid }) => sid !== selectedGroupId));
      }
    }
  }, [deleteData]);

  // Handle Delete function.
  const handleDeleteGroup = (id) => {
    setSelectedGroupId(id);

    deleteAccessPolicyGroup(id);
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

  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_GROUPS">
      <>
        <Spacing margin="double">
          {groups.length > 0 && (
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
          )}

          {groups.length > 0 && (
            <Row>
              <Column lg="12">
                <Spacing margin={{ top: 'normal' }}>
                  <Separator />
                </Spacing>
              </Column>
            </Row>
          )}

          <Row>
            <StyledColumn lg="12">
              {loading ? (
                <Spacing margin={{ top: 'double' }}>
                  <Spinner size={SpinnerSize.large} label="Loading groups" />
                </Spacing>
              ) : !groups.length ? (
                <EmptyState
                  title="No access groups found"
                  description="You haven't created an access group yet. Click the button below to create a new group."
                  actions={
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
                  }
                />
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
            const filteredGroups = groups.filter((group) => group?.sid !== updatedPolicy.sid);
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
