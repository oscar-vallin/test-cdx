/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from 'react';

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
  Link, IColumn, IContextualMenuItem,
} from '@fluentui/react';

import { EmptyState } from 'src/containers/states';
import { useNotification } from 'src/hooks/useNotification';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Spacing } from 'src/components/spacings/Spacing';
import { Button } from 'src/components/buttons';
import { Row, Column, Container } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';

import {
  useAccessPolicyTemplatesLazyQuery,
  useAccessPoliciesForOrgLazyQuery,
  useDeleteAccessPolicyMutation, AccessPolicyForm, AccessPolicy,
} from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { CreatePoliciesPanel } from './CreatePolicy';
import { StyledColumn, StyledCommandButton } from '../AccessManagement.styles';
import { ROUTE_ACCESS_MANAGEMENT_POLICIES } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';

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

  const [templatePolicyMenu, setTemplatePolicyMenu] = useState<IContextualMenuItem[]>([]);

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
    let templates: IContextualMenuItem[] =
      templatePolicies?.accessPolicyTemplates?.map((policy) => ({
        key: policy.value,
        text: policy.label,
        style: {
          padding: '0 5px 0 15px'
        },
        onClick: (event, item) => {
          setSelectedTemplateId(item.key);
          setIsPanelOpen(true);
        },
      })) || [];

    if (templates.length > 0) {
      templates = [
        {
          key: '__Template_Header',
          text: 'From Template:',
          style: {
            fontSize: '.75em'
          },
          disabled: true,
        },
        ...templates
      ];
    }
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

  const createPolicyButton = () => {
    return (
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
    )
  }

  return (
    <LayoutDashboard id="PageAdmin" menuOptionSelected={ROUTE_ACCESS_MANAGEMENT_POLICIES.API_ID}>
      <>
        {policies.length > 0 && (
          <PageHeader id="__AccessPoliciesHeader">
            <Container>
              <Row>
                <Column lg="6" direction="row">
                  <PageTitle id="__Page_Title" title="Access Policies" />
                </Column>
                <Column lg="6" right>
                  {createPolicyButton()}
                </Column>
              </Row>
            </Container>
          </PageHeader>
        )}

        <Container>
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
                  actions={createPolicyButton()}
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
        </Container>

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
    </LayoutDashboard>
  );
};

const AccessManagementPoliciesPage = memo(_AccessManagementPoliciesPage);

export { AccessManagementPoliciesPage };
