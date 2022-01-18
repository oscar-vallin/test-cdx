/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import {
  PrimaryButton,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Dialog,
  DialogType,
  DialogFooter,
  FontIcon,
  Spinner,
  SpinnerSize,
  Link, IColumn,
} from '@fluentui/react';

import { EmptyState } from 'src/containers/states';
import { useNotification } from 'src/hooks/useNotification';
import { LayoutAdmin } from 'src/layouts/LayoutAdmin';
import { Spacing } from 'src/components/spacings/Spacing';
import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { Separator } from 'src/components/separators/Separator';
import { Text } from 'src/components/typography';

import {
  useAccessPolicyTemplatesLazyQuery,
  useAccessPoliciesForOrgLazyQuery,
  useDeleteAccessPolicyMutation, AccessPolicyForm, AccessPolicy,
} from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { CreatePoliciesPanel } from './CreatePolicy';
import { StyledColumn, StyledCommandButton } from '../AccessManagement.styles';

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
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>();

  const [policies, setPolicies] = useState<any[]>([]);
  const [fetchTemplatePolicies, { data: templatePolicies, loading: isLoadingTemplatePolicies }] = useQueryHandler(
    useAccessPolicyTemplatesLazyQuery
  );

  const [templatePolicyMenu, setTemplatePolicyMenu] = useState([]);

  const [accessPoliciesForOrg, { data, loading }] = useQueryHandler(useAccessPoliciesForOrgLazyQuery);
  // Linter Issue.  useRemoveAmPolicyMutation??
  const [removeAccessPolicy, { data: removeResponse, loading: isRemovingPolicy }] =
    // eslint-disable-next-line no-undef
    useQueryHandler(useDeleteAccessPolicyMutation);

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedPolicyId(null);
  };

  const onRenderItemColumn = (item?: AccessPolicy, index?: number, column?: IColumn) => {
    const key = column?.key ?? '';
    switch (key) {
      case 'name':
        return (
          <Link
            id={`__${item?.name?.split(' ').join('_')}`}
            onClick={() => {
              setSelectedPolicyId(item?.sid);
              setIsPanelOpen(true);
            }}
          >
            {item?.name}
          </Link>
        );
      case 'tmpl':
        return item?.tmpl ? <FontIcon iconName='Completed' /> : <span/>;
      case 'actions':
        return (
          <>
            &nbsp;
            <StyledCommandButton
              id={`DeleteBtn__${item?.name?.split(' ').join('_')}`}
              iconProps={{ iconName: 'Delete' }}
              onClick={() => {
                setSelectedPolicyId(item?.sid);
                setIsConfirmationHidden(false);
              }}
            />
          </>
        );
      default:
        if (item) {
          return item[key];
        }
    }
    return <span/>;
  };

  useEffect(() => {
    accessPoliciesForOrg({
      variables: {
        orgSid,
      },
    });

    fetchTemplatePolicies({
      variables: {
        orgSid,
      },
    });
  }, [orgSid]);

  useEffect(() => {
    const templates =
      templatePolicies?.accessPolicyTemplates?.map((policy) => ({
        key: policy.value,
        text: policy.label,
        onClick: (event, item) => {
          setSelectedTemplateId(item.key);
          setIsPanelOpen(true);
        },
      })) || [];

    setTemplatePolicyMenu(templates);
  }, [templatePolicies, isLoadingTemplatePolicies]);

  useEffect(() => {
    if (!isRemovingPolicy && removeResponse) {
      const name = policies.find(({ sid }) => selectedPolicyId === sid)?.name || '';

      Toast.success({ text: `Access policy "${name}" deleted successfully` });

      setPolicies(policies.filter(({ sid }) => sid !== selectedPolicyId));
      setSelectedPolicyId(null);
    }
  }, [isRemovingPolicy, removeResponse]);

  useEffect(() => {
    if (data) {
      setPolicies(data.accessPoliciesForOrg.nodes);
    }
  }, [data]);

  const createPolicyObj = (policy?: AccessPolicyForm) => ({
    sid: policy?.sid,
    name: policy?.name?.value,
    tmpl: policy?.tmpl?.value,
    tmplUseAsIs: policy?.tmplUseAsIs?.value,
    permissions: policy?.permissions?.value,
    applicableOrgTypes: policy?.applicableOrgTypes?.value,
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
                  split={!isLoadingTemplatePolicies && templatePolicyMenu.length > 0}
                  id="CreatePolicyButton"
                  variant="primary"
                  onClick={() => {
                    setIsPanelOpen(true);
                    return null;
                  }}
                  {...(!isLoadingTemplatePolicies && templatePolicyMenu.length > 0
                    ? {
                        menuProps: {
                          items: templatePolicyMenu,
                          contextualMenuItemAs: (props) => (
                            <div id={`PolicyTemplate__${props.item.key}`}>{props.item.text}</div>
                          ),
                        },
                      }
                    : {})}
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
                  actions={(
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
                  )}
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
            setSelectedPolicyId(null);
            setSelectedTemplateId(null);
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
              id="ConfirmationBtn"
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
