/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { PrimaryButton, DefaultButton, MessageBar } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib-commonjs/Dialog';

import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { EmptyState } from 'src/containers/states';
import { SpinnerSize } from '@fluentui/react';
import { useNotification } from 'src/hooks/useNotification';
import { LayoutAdmin } from '../../../../layouts/LayoutAdmin';
import { Spacing } from '../../../../components/spacings/Spacing';
import { Button } from '../../../../components/buttons';
import { Row, Column } from '../../../../components/layouts';
import { Separator } from '../../../../components/separators/Separator';
import { Text } from '../../../../components/typography';
import { CreatePoliciesPanel } from './CreatePolicy';
import { Link } from '../../../../components/buttons/Link';

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
  const Toast = useNotification();

  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedPolicyId, setSelectedPolicyId] = useState(0);
  const [selectedTemplateId, setSelectedTemplateId] = useState(0);

  const [policies, setPolicies] = useState<any[]>([]);
  const [templatePolicies, setTemplatePolicies] = useState<any[]>([]);
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
      case 'name':
        return (
          <Link
            onClick={() => {
              setSelectedPolicyId(item.sid);
              setIsPanelOpen(true);
            }}
          >
            {item.name}
          </Link>
        );
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
    const templates =
      policies
        ?.filter((policy) => policy.tmpl)
        .map((policy) => ({
          key: policy.sid,
          text: policy.name,
          onClick: (event, item) => {
            setSelectedTemplateId(item.key);
            setIsPanelOpen(true);
          },
        })) || [];

    setTemplatePolicies(templates);
  }, [policies]);

  useEffect(() => {
    if (!isRemovingPolicy && removeResponse) {
      const name = policies.find(({ sid }) => selectedPolicyId === sid)?.name || '';

      Toast.success({ text: `Access policy "${name}" deleted successfully` });

      setPolicies(policies.filter(({ sid }) => sid !== selectedPolicyId));
      setSelectedPolicyId(0);
    }
  }, [isRemovingPolicy, removeResponse]);

  useEffect(() => {
    if (data) {
      setPolicies(data.accessPoliciesForOrg.nodes);
    }
  }, [data]);

  const createPolicyObj = (policy) => ({
    sid: policy.sid,
    name: policy.name.value,
    tmpl: policy.tmpl.value,
    tmplUseAsIs: policy.tmplUseAsIs.value,
    permissions: policy.permissions.value,
    applicableOrgTypes: policy.applicableOrgTypes.value,
  });

  return (
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_POLICIES">
      <>
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
                  split
                  id="CreatePolicyButton"
                  variant="primary"
                  onClick={() => {
                    setIsPanelOpen(true);
                    return null;
                  }}
                  {...(templatePolicies.length > 0 ? { menuProps: { items: templatePolicies } } : {})}
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
                      id="CreatePolicyButton"
                      variant="primary"
                      onClick={() => {
                        setIsPanelOpen(true);
                        return null;
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
          onCreatePolicy={(newPolicy) => setPolicies([...policies, createPolicyObj(newPolicy)])}
          onUpdatePolicy={(updatedPolicy) => {
            setPolicies(
              policies.map((policy) => {
                if (policy.sid !== updatedPolicy.sid) {
                  return policy;
                }

                return createPolicyObj(updatedPolicy);
              })
            );
          }}
          onDismiss={() => {
            setIsPanelOpen(false);
            setSelectedPolicyId(0);
            setSelectedTemplateId(0);
          }}
          selectedPolicyId={selectedPolicyId}
          selectedTemplateId={selectedTemplateId}
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
          modalProps={{ isBlocking: true }}
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
      </>
    </LayoutAdmin>
  );
};

const AccessManagementPoliciesPage = memo(_AccessManagementPoliciesPage);

export { AccessManagementPoliciesPage };
