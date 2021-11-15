/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Row, Column } from '../../../../components/layouts';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Button } from '../../../../components/buttons';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Text } from '../../../../components/typography/Text';
import { CreateGroupPanel } from './CreateGroup';
import { Separator } from '../../../../components/separators/Separator';

import { useAccessPolicyGroupsForOrgLazyQuery } from '../../../../data/services/graphql';
import { StyledColumn, StyledCommandButton } from './AccessManagementGroupsPage.styles';

import { useOrgSid } from '../../../../hooks/useOrgSid';
import { useQueryHandler } from '../../../../hooks/useQueryHandler';

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
  const [groups, setGroups]: any = useState([]);
  const columns = generateColumns();
  // const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [apiAmGroupsForOrg, { data, loading }] = useQueryHandler(useAccessPolicyGroupsForOrgLazyQuery);
  const [selectedGroupId, setSelectedGroupId] = useState(0);

  // const [policies, setGroups] = useState([]);

  useEffect(() => {
    apiAmGroupsForOrg({ variables: { orgSid } });
  }, [orgSid]);

  useEffect(() => {
    if (!loading && data) {
      setGroups(data.accessPolicyGroupsForOrg.nodes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const onRenderItemColumn = (item, index, column) => {
    if (column.key === 'tmpl') {
      return <FontIcon iconName={item.tmpl ? 'CheckMark' : 'Cancel'} />;
    }
    if (column.key === 'actions') {
      return (
        <>
          &nbsp;
          <StyledCommandButton
            iconProps={{ iconName: 'Edit' }}
            onClick={() => {
              setSelectedGroupId(item.sid);
              setIsPanelOpen(true);
            }}
          />
        </>
      );
    }
    return item[column.key];
  };

  const renderList = () => {
    return groups.length > 0 ? (
      <DetailsList
        items={groups}
        selectionMode={SelectionMode.none}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={onRenderItemColumn}
        isHeaderVisible
      />
    ) : (
      <MessageBar>No groups added</MessageBar>
    );
  };

  // useEffect(() => {
  //   if (data) {
  //     setGroups(data.accessPoliciesForOrg.nodes);
  //   }
  // }, [data]);

  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_GROUPS">
      <>
        <Spacing margin="double">
          <Row>
            <Column lg="8">
              <Row>
                <Column lg="4">
                  <Spacing margin={{ top: 'small' }}>
                    <Text variant="bold">Groups</Text>
                  </Spacing>
                </Column>

                <Column lg="8" right>
                  <Button
                    id="__AccessManagementGroupsPageId"
                    variant="primary"
                    onClick={() => {
                      setIsPanelOpen(true);
                      return null;
                    }}
                  >
                    Create Group
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
                      <Spinner size={SpinnerSize.large} label="Loading groups" />
                    </Spacing>
                  )}
                </StyledColumn>
              </Row>
            </Column>
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
            const filteredGroups = groups.filter((group) => group.sid !== updatedPolicy.sid);
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