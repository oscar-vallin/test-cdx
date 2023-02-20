/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  memo,
  CSSProperties,
} from 'react';

import {
  PrimaryButton,
  DefaultButton,
  DetailsListLayoutMode,
  SelectionMode,
  Dialog,
  DialogType,
  DialogFooter,
  FontIcon,
  IColumn,
  IContextualMenuItem,
  DetailsList,
  TooltipHost,
} from '@fluentui/react';
import { People20Filled, PeopleAudience20Filled } from '@fluentui/react-icons';
import { EmptyState } from 'src/containers/states';
import { useNotification } from 'src/hooks/useNotification';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Row, Column, Container } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { ThemeStore } from 'src/store/ThemeStore';

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
import { ROUTE_AM_POLICIES } from 'src/data/constants/RouteConstants';
import { HideForMobile } from 'src/styles/GlobalStyles';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { PageBody } from 'src/components/layouts/Column';
import { ButtonLink } from 'src/components/buttons';
import { StyledCommandButton } from '../AccessManagement.styles';
import { AccessPolicyPanel } from './AccessPolicyPanel';
import { AccessPolicyMembersPanel } from './AccessPolicyMembersPanel';
import { AccessPolicyUsagePanel } from './AccessPolicyUsagePanel';

const generateColumns = () => {
  const createColumn = ({ name, key }) => ({
    name,
    key,
    fieldName: key,
    data: 'string',
    isPadded: true,
    minWidth: key === 'members' ? 65 : 210,
  });

  return [
    createColumn({ name: 'Name', key: 'name' }),
    createColumn({ name: '', key: 'members' }),
    createColumn({ name: '', key: 'groupUsages' }),
    createColumn({ name: 'Template', key: 'tmpl' }),
    createColumn({ name: '', key: 'actions' }),
  ];
};

const _AccessManagementPoliciesPage = () => {
  const { orgSid } = useOrgSid();
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelMembersOpen, setIsPanelMembersOpen] = useState(false);
  const [isPanelUsageOpen, setIsPanelUsageOpen] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const Toast = useNotification();

  const [isConfirmationHidden, setIsConfirmationHidden] = useState(true);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>();
  const [totalMembers, setTotalmembers] = useState(0);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>();

  const [policies, setPolicies] = useState<Maybe<AccessPolicy>[] | null>();
  const [
    fetchTemplatePolicies,
    {
      data: templatePolicies,
      loading: isLoadingTemplatePolicies,
    },
  ] = useQueryHandler(useAccessPolicyTemplatesLazyQuery);

  const [templatePolicyMenu, setTemplatePolicyMenu] = useState<IContextualMenuItem[]>([]);

  const [accessPoliciesForOrg, { data, loading, error }] = useAccessPoliciesForOrgLazyQuery();
  // Linter Issue.  useRemoveAmPolicyMutation??
  const [
    removeAccessPolicy,
    {
      data: removeResponse,
      loading: isRemovingPolicy,
    },
  ] = useQueryHandler(useDeleteAccessPolicyMutation);

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
    let tooltip: string;
    let style: CSSProperties;
    const groupCount = item?.groupUsages ?? 0;

    switch (key) {
      case 'name':
        return (
          <ButtonLink
            id={`__${item?.name?.split(' ').join('_')}_Link`}
            onClick={() => {
              setSelectedPolicyId(item?.sid);
              setIsPanelOpen(true);
            }}
            style={{ overflow: 'hidden' }}
          >
            {item?.name}
          </ButtonLink>
        );
      case 'members':
        if (item?.members === 0) {
          tooltip = '0 Users are assigned to this policy';
          style = {
            color: ThemeStore.userTheme.colors.neutralTertiary,
          };
        } else {
          if (item?.members === 1) {
            tooltip = '1 User is assigned to this policy';
          } else {
            tooltip = `${item?.members} Users are assigned to this policy`;
          }
          style = {
            color: ThemeStore.userTheme.colors.themePrimary,
            cursor: 'pointer',
          };
        }
        return (
          <TooltipHost content={tooltip}>
            <People20Filled
              id={`__${item?.name?.split(' ').join('_')}_Members`}
              style={style}
              onClick={() => {
                if ((item?.members ?? 0) > 0) {
                  setSelectedPolicyId(item?.sid);
                  setCurrentName(item?.name ?? '');
                  setTotalmembers(item?.members ?? 0);
                  setIsPanelMembersOpen(true);
                }
              }}
            />
            <span style={{ position: 'relative', bottom: '4px' }}>&nbsp;( {item?.members} )</span>
          </TooltipHost>
        );
      case 'groupUsages':
        if (groupCount === 0) {
          tooltip = 'This policy is not used in any Access Policy Groups';
          style = {
            color: ThemeStore.userTheme.colors.neutralTertiary,
          };
        } else {
          if (groupCount === 1) {
            tooltip = 'This policy is used in 1 Access Policy Group';
          } else {
            tooltip = `This policy is used in ${groupCount} Access Policy Groups`;
          }
          style = {
            color: ThemeStore.userTheme.colors.themePrimary,
            cursor: 'pointer',
          };
        }
        return (
          <TooltipHost content={tooltip}>
            <PeopleAudience20Filled
              id={`__${item?.name?.split(' ').join('_')}_Usages`}
              style={style}
              onClick={() => {
                if (groupCount > 0) {
                  setSelectedPolicyId(item?.sid);
                  setCurrentName(item?.name ?? '');
                  setTotalmembers(item?.members ?? 0);
                  setIsPanelUsageOpen(true);
                }
              }}
            />
            <span style={{ position: 'relative', bottom: '6px' }}>&nbsp;( {groupCount} )</span>
          </TooltipHost>
        );
      case 'tmpl':
        return item?.tmpl ? <FontIcon iconName="Completed" /> : <span />;
      case 'actions':
        if (deleteCmd) {
          return (
            <StyledCommandButton
              id={`DeleteBtn__${item?.name?.split(' ').join('_')}`}
              iconProps={{ iconName: 'Delete' }}
              title={deleteCmd.label ?? undefined}
              onClick={() => {
                setSelectedPolicyId(item?.sid);
                setIsConfirmationHidden(false);
              }}
            />
          );
        }
        return <span />;
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
    let templates: IContextualMenuItem[] = templatePolicies?.accessPolicyTemplates?.map(
      (policy) => ({
        key: policy.value,
        text: policy.label,
        style: {
          padding: '0 5px 0 15px',
        },
        onClick: (event, item) => {
          setSelectedTemplateId(item.key);
          setIsPanelOpen(true);
        },
      }),
    ) || [];

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
      const _createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
      setCreateCmd(_createCmd);
      const listCommands = data.accessPoliciesForOrg?.listPageInfo?.listItemCommands;
      const _deleteCmd = listCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Delete);
      setDeleteCmd(_deleteCmd);
    }
  }, [data]);

  useEffect(() => {
    handleError(error);
  }, [error]);

  const createPolicyButton = () => {
    if (createCmd) {
      return (
        <PrimaryButton
          id="CreatePolicyButton"
          split={!isLoadingTemplatePolicies && templatePolicyMenu.length > 0}
          iconProps={{ iconName: 'AddToShoppingList' }}
          onClick={() => {
            setIsPanelOpen(true);
          }}
          ariaLabel={createCmd.label ?? undefined}
          title={createCmd.label ?? undefined}
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
          <HideForMobile>{createCmd.label}</HideForMobile>
        </PrimaryButton>
      );
    }
    return null;
  };

  const renderBody = () => {
    if (!loading) {
      if (!policies?.length) {
        const emptyText = createCmd
          ? 'There are no Access Policies configured in this Organization. Click the button below to create a new policy.'
          : 'There are no Access Policies configured in this Organization.';
        return <EmptyState title="No policies found" description={emptyText} actions={createPolicyButton()} />;
      }
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
    return null;
  };

  return (
    <LayoutDashboard id="PageAdmin" menuOptionSelected={ROUTE_AM_POLICIES.API_ID}>
      <>
        {(policies?.length ?? 0) > 0 && (
          <PageHeader id="__AccessPoliciesHeader">
            <Container>
              <Row>
                <Column sm="6" direction="row">
                  <PageTitle id="__Page_Title" title="Access Policies" />
                </Column>
                <Column sm="6" right>
                  {createPolicyButton()}
                </Column>
              </Row>
            </Container>
          </PageHeader>
        )}

        <PageBody id="__AccessPoliciesBody">
          <Container>
            <Row>{renderBody()}</Row>
          </Container>
        </PageBody>

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

        <AccessPolicyMembersPanel
          isOpen={isPanelMembersOpen}
          closePanel={setIsPanelMembersOpen}
          selectedPolicyId={selectedPolicyId ?? ''}
          currentName={currentName}
          members={totalMembers}
        />

        <AccessPolicyUsagePanel
          isOpen={isPanelUsageOpen}
          closePanel={setIsPanelUsageOpen}
          selectedPolicyId={selectedPolicyId ?? ''}
          currentName={currentName}
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
