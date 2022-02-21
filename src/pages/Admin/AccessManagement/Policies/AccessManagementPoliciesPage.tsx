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
  Link,
  IColumn,
  IContextualMenuItem,
} from '@fluentui/react';

import { EmptyState } from 'src/containers/states';
import { useNotification } from 'src/hooks/useNotification';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Button } from 'src/components/buttons';
import { Row, Column, Container } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';

import {
  useAccessPolicyTemplatesLazyQuery,
  useAccessPoliciesForOrgLazyQuery,
  useDeleteAccessPolicyMutation,
  AccessPolicy,
  CdxWebCommandType,
  Maybe,
  WebCommand,
} from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { AccessPolicyPanel } from './AccessPolicyPanel';
import { StyledColumn, StyledCommandButton } from '../AccessManagement.styles';
import { ROUTE_ACCESS_MANAGEMENT_POLICIES } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ErrorHandler } from 'src/utils/ErrorHandler';

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

  const [policies, setPolicies] = useState<Maybe<AccessPolicy>[] | null>();
  const [fetchTemplatePolicies, { data: templatePolicies, loading: isLoadingTemplatePolicies }] = useQueryHandler(
    useAccessPolicyTemplatesLazyQuery
  );

  const [templatePolicyMenu, setTemplatePolicyMenu] = useState<IContextualMenuItem[]>([]);

  const [accessPoliciesForOrg, { data, loading, error }] = useAccessPoliciesForOrgLazyQuery();
  // Linter Issue.  useRemoveAmPolicyMutation??
  const [removeAccessPolicy, { data: removeResponse, loading: isRemovingPolicy }] =
    // eslint-disable-next-line no-undef
    useQueryHandler(useDeleteAccessPolicyMutation);

  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();

  const handleError = ErrorHandler();

  const hideConfirmation = () => {
    setIsConfirmationHidden(true);
    setSelectedPolicyId(null);
  };

  const fetchData = () => {
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
        return item?.tmpl ? <FontIcon iconName="Completed" /> : <span />;
      case 'actions':
        if (deleteCmd) {
          return (
            <>
              <StyledCommandButton
                id={`DeleteBtn__${item?.name?.split(' ').join('_')}`}
                iconProps={{ iconName: 'Delete' }}
                title={deleteCmd.label ?? undefined}
                onClick={() => {
                  setSelectedPolicyId(item?.sid);
                  setIsConfirmationHidden(false);
                }}
              />
            </>
          );
        } else {
          return <span />;
        }
      default:
        if (item) {
          return item[key];
        }
    }
    return <span />;
  };

  useEffect(() => {
    fetchData();
  }, [orgSid]);

  useEffect(() => {
    let templates: IContextualMenuItem[] =
      templatePolicies?.accessPolicyTemplates?.map((policy) => ({
        key: policy.value,
        text: policy.label,
        style: {
          padding: '0 5px 0 15px',
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
            fontSize: '.75em',
          },
          disabled: true,
        },
        ...templates,
      ];
    }
    setTemplatePolicyMenu(templates);
  }, [templatePolicies, isLoadingTemplatePolicies]);

  useEffect(() => {
    if (!isRemovingPolicy && removeResponse) {
      const name = policies?.find((policy) => selectedPolicyId === policy?.sid)?.name || '';

      Toast.success({ text: `Access policy "${name}" deleted successfully` });

      setSelectedPolicyId(null);

      fetchData();
    }
  }, [isRemovingPolicy, removeResponse]);

  useEffect(() => {
    if (data) {
      setPolicies(data?.accessPoliciesForOrg?.nodes);
      const pageCommands = data.accessPoliciesForOrg?.listPageInfo?.pageCommands;
      const createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
      setCreateCmd(createCmd);
      const listCommands = data.accessPoliciesForOrg?.listPageInfo?.listItemCommands;
      const deleteCmd = listCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Delete);
      setDeleteCmd(deleteCmd);
    }
  }, [data]);

  useEffect(() => {
    handleError(error);
  }, [error]);

  const createPolicyButton = () => {
    if (createCmd) {
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
          {createCmd.label}
        </Button>
      );
    }
  };

  const renderBody = () => {
    if (!loading) {
      if (!policies?.length) {
        const emptyText = createCmd
          ? 'There are no Access Policies configured in this Organization. Click the button below to create a new policy.'
          : 'There are no Access Policies configured in this Organization.';
        return <EmptyState title="No policies found" description={emptyText} actions={createPolicyButton()} />;
      } else {
        return (
          <DetailsList
            items={policies}
            selectionMode={SelectionMode.none}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
            onRenderItemColumn={onRenderItemColumn}
            isHeaderVisible
          />
        );
      }
    }
  };

  return (
    <LayoutDashboard id="PageAdmin" menuOptionSelected={ROUTE_ACCESS_MANAGEMENT_POLICIES.API_ID}>
      <>
        {(policies?.length ?? 0) > 0 && (
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
            <StyledColumn lg="12">{renderBody()}</StyledColumn>
          </Row>
        </Container>

        <AccessPolicyPanel
          isOpen={isPanelOpen}
          onCreatePolicy={() => fetchData()}
          onUpdatePolicy={() => fetchData()}
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
              policies?.find((policy) => selectedPolicyId === policy?.sid)?.name || ''
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
