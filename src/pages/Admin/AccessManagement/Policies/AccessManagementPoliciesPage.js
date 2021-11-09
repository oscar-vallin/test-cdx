/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { PrimaryButton, DefaultButton, MessageBar } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';

import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { EmptyState } from 'src/containers/states';
import { SpinnerSize } from '@fluentui/react';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Button } from '../../../../components/buttons';
import { Row, Column } from '../../../../components/layouts';
import { Separator } from '../../../../components/separators/Separator';
import { Text } from '../../../../components/typography';
import { CreatePoliciesPanel } from './CreatePolicy';

import { useAccessPoliciesForOrgLazyQuery, useDeleteAccessPolicyMutation } from '../../../../data/services/graphql';

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
    useQueryHandler(useDeleteAccessPolicyMutation);

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
      setPolicies(policies.filter(({ sid }) => sid !== selectedPolicyId));
    }
  }, [isRemovingPolicy, removeResponse]);

  useEffect(() => {
    if (data) {
      setPolicies(data.accessPoliciesForOrg.nodes);
    }
  }, [data]);

  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_POLICIES">
      <Spacing margin="double">
        {policies.length > 0 && (
          <Row>
            <Column lg="6">
              <Spacing margin={{ top: 'small' }}>
                <Text variant="bold">Policies</Text>
              </Spacing>
            </Column>

            <Column lg="6" right>
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
        )}

        {policies.length > 0 && (
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
                <Spinner size={SpinnerSize.large} label="Loading policies" />
              </Spacing>
            ) : !policies.length ? (
              <EmptyState
                title="No policies found"
                description="You haven't created an access policy yet. Click the button below to create a new policy."
                actions={
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsPanelOpen(true);
                    }}
                  >
                    Create policy
                  </Button>
                }
              />
            ) : (
              <DetailsList
                items={policies}
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

      <CreatePoliciesPanel
        isOpen={isPanelOpen}
        onCreatePolicy={({ name, permissions, sid, tmpl, tmplUseAsIs, applicableOrgTypes }) => {
          setPolicies([
            ...policies,
            {
              applicableOrgTypes: applicableOrgTypes.value,
              name: name.value,
              permissions: permissions.value,
              sid: sid.value,
              tmpl: tmpl.value,
              tmplUseAsIs: tmplUseAsIs.value,
            },
          ]);
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
          subText: `Do you really want to remove "${
            policies.find(({ sid }) => selectedPolicyId === sid)?.name || ''
          }"?`,
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
