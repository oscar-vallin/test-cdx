/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { PrimaryButton, DefaultButton, MessageBar } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';

import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Button } from '../../../../components/buttons';
import { Row, Column } from '../../../../components/layouts';
import { Separator } from '../../../../components/separators/Separator';
import { Text } from '../../../../components/typography';
import { CreatePoliciesPanel } from './CreatePolicy';

import { useAccessPoliciesForOrgLazyQuery } from '../../../../data/services/graphql';

import { StyledColumn, StyledCommandButton } from './AccessManagementPoliciesPage.styles';
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

const _AccessManagementPoliciesPage = () => {
  const { orgSid } = useOrgSid();
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedPolicyId, setSelectedPolicyId] = useState(0);

  const [policies, setPolicies] = useState([]);
  const [accessPoliciesForOrg, { data, loading }] = useQueryHandler(useAccessPoliciesForOrgLazyQuery);
  // Linter Issue.  useRemoveAmPolicyMutation??
  const [removeAccessPolicy, { data: removeResponse, loading: isRemovingPolicy }] =
    // eslint-disable-next-line no-undef
    useQueryHandler(useRemoveAmPolicyMutation);

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedPolicyId(0);
  };

  const onRenderItemColumn = (item, index, column) => {
    switch (column.key) {
      case 'tmpl':
        return <FontIcon iconName={item.tmpl ? 'CheckMark' : 'Cancel'} />;
      case 'actions':
        return (
          <>
            &nbsp;
            <StyledCommandButton
              iconProps={{ iconName: 'Delete' }}
              onClick={() => {
                setSelectedPolicyId(item.sid);
                setIsConfirmationHidden(false);
              }}
            />
          </>
        );
      default:
        return item[column.key];
    }
  };

  useEffect(() => {
    accessPoliciesForOrg({
      variables: {
        orgSid,
      },
    });
  }, [orgSid]);

  useEffect(() => {
    if (!isRemovingPolicy && removeResponse) {
      setPolicies(policies.filter(({ id }) => id !== selectedPolicyId));
    }
  }, [isRemovingPolicy, removeResponse]);

  useEffect(() => {
    if (data) {
      setPolicies(data.accessPoliciesForOrg.nodes);
    }
  }, [data]);

  const renderList = () => {
    return policies.length ? (
      <DetailsList
        items={policies}
        selectionMode={SelectionMode.none}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={onRenderItemColumn}
        isHeaderVisible
      />
    ) : (
      <MessageBar>No policies found</MessageBar>
    );
  };

  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_POLICIES">
      <Spacing margin="double">
        <Row>
          <Column lg="8">
            <Row center>
              <Column lg="4">
                <Spacing margin={{ top: 'small' }}>
                  <Text variant="bold">Policies</Text>
                </Spacing>
              </Column>

              <Column lg="8" right>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsPanelOpen(true);
                  }}
                >
                  Create policy
                </Button>
              </Column>
            </Row>

            <Spacing margin={{ top: 'normal' }}>
              <Separator />
            </Spacing>

            <Row>
              <StyledColumn lg="12">
                {!loading ? (
                  renderList()
                ) : (
                  <Spacing margin={{ top: 'double' }}>
                    <Spinner size="lg" label="Loading policies" />
                  </Spacing>
                )}
              </StyledColumn>
            </Row>
          </Column>
        </Row>
      </Spacing>

      <CreatePoliciesPanel
        isOpen={isPanelOpen}
        onCreatePolicy={(createdPolicy) => {
          setPolicies([...policies, createdPolicy]);
        }}
        onDismiss={() => {
          setIsPanelOpen(false);
          setSelectedPolicyId(0);
        }}
        selectedPolicyId={selectedPolicyId}
      />

      <Dialog
        hidden={isConfirmationHidden}
        onDismiss={hideConfirmation}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Remove policy',
          subText: `Do you really want to remove "${policies.find(({ id }) => selectedPolicyId === id)?.name || ''}"?`,
        }}
        modalProps={{ isBlocking: true, isDraggable: false }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              removeAccessPolicy({
                variables: {
                  policySid: selectedPolicyId,
                },
              });

              setIsConfirmationHidden(true);
            }}
            text="Remove"
          />
          <DefaultButton onClick={hideConfirmation} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </LayoutAdmin>
  );
};

const AccessManagementPoliciesPage = memo(_AccessManagementPoliciesPage);

export { AccessManagementPoliciesPage };
