/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';

import {
  DetailsListLayoutMode,
  FontIcon,
  IContextualMenuItem,
  IContextualMenuProps,
  Link,
  SelectionMode,
  Spinner,
  SpinnerSize,
} from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { Column, Container, Row } from 'src/components/layouts';
import { Button } from 'src/components/buttons';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { PageTitle } from 'src/components/typography';

import {
  AccessPolicyGroup,
  CdxWebCommandType,
  GqOperationResponse,
  UiOption,
  useAccessPolicyGroupsForOrgLazyQuery,
  useAccessPolicyGroupTemplatesLazyQuery,
  WebCommand,
} from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { Spacing } from 'src/components/spacings/Spacing';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { ROUTE_ACCESS_MANAGEMENT_GROUPS } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { PageBody } from 'src/components/layouts/Column';
import { ThemedDetailsList } from 'src/containers/tables/ThemedDetailsList.style';
import { useAccessManagementGroupsPageService } from './AccessManagementGroupsPage.service';
import { StyledCommandButton } from '../AccessManagement.styles';
import { AccessPolicyGroupPanel } from './AccessPolicyGroup';

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

const AccessManagementGroupsContainer = () => {
  const { orgSid } = useOrgSid();
  const [groups, setGroups] = useState<AccessPolicyGroup[]>([]);
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDialog, setDialog] = useState(false);
  const Toast = useNotification();
  const [templateId, setTemplateId] = useState<string>();

  const [apiAmGroupsForOrg, { data, loading, error }] = useAccessPolicyGroupsForOrgLazyQuery();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>();
  const handleError = ErrorHandler();

  const [fetchTemplates, { data: templatesData, error: templatesError }] = useAccessPolicyGroupTemplatesLazyQuery({
    variables: {
      orgSid,
    },
  });

  const { deleteAccessPolicyGroup, deleteError, deleteData, deleteLoading } = useAccessManagementGroupsPageService();

  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();

  const fetchData = () => {
    apiAmGroupsForOrg({ variables: { orgSid } });
    if (orgSid) {
      fetchTemplates({ variables: { orgSid } });
    }
  };

  useEffect(() => {
    fetchData();
  }, [orgSid]);

  useEffect(() => {
    if (!loading && data) {
      const _groups: AccessPolicyGroup[] = [];
      data.accessPolicyGroupsForOrg?.nodes?.forEach((node) => {
        if (node) {
          _groups.push(node);
        }
      });

      setGroups(_groups);

      const pageCommands = data.accessPolicyGroupsForOrg?.listPageInfo?.pageCommands;
      const _createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
      setCreateCmd(_createCmd);
      const listCommands = data.accessPolicyGroupsForOrg?.listPageInfo?.listItemCommands;
      const _deleteCmd = listCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Delete);
      setDeleteCmd(_deleteCmd);
    }
  }, [loading, data]);

  // Handle delete.
  useEffect(() => {
    if (!deleteLoading && deleteData) {
      if (deleteData.deleteAccessPolicyGroup === GqOperationResponse.Success) {
        if (!selectedGroupId || groups.length === 0) return;

        const text = `Access Policy Group ${groups.find(({ sid }) => sid === selectedGroupId)?.name} Deleted.`;
        Toast.info({ text, duration: 5000 });
        setSelectedGroupId(null);

        fetchData();
      }
    }
  }, [deleteData, deleteLoading]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  useEffect(() => {
    if (templatesError) {
      handleError(templatesError);
    }
  }, [templatesError]);

  useEffect(() => {
    if (deleteError) {
      handleError(deleteError);
    }
  }, [deleteError]);

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
  const handleCreateGroup = (selectedTemplateId: string) => {
    setIsPanelOpen(true);
    setSelectedGroupId(null);
    setTemplateId(selectedTemplateId);
  };

  const onRenderItemColumn = (item, index, column) => {
    if (column.key === 'tmpl') {
      return item.tmpl ? <FontIcon id={`__template_${index + 1}`} iconName="Completed" /> : <span />;
    }
    if (column.key === 'actions') {
      if (deleteCmd) {
        return (
          <>
            &nbsp;
            <StyledCommandButton
              id={`__deleteGroup_${index + 1}`}
              iconProps={{ iconName: 'Delete' }}
              title={deleteCmd.label ?? undefined}
              aria-label={deleteCmd.label ?? undefined}
              onClick={() => {
                handleDeleteGroup(item.sid);
              }}
            />
          </>
        );
      }
      return <span />;
    }

    if (column.key === 'name') {
      return (
        <>
          &nbsp;
          <Link
            id={`__AccessManagement__Name_Field_${index + 1}`}
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

  const renderCreateGroupButton = (uiOptions?: UiOption[] | null) => {
    if (!createCmd) {
      return null;
    }

    const numTemplates = uiOptions?.length ?? 0;

    let createMenuProps: IContextualMenuProps | undefined;
    if (uiOptions && uiOptions?.length > 0) {
      const items: IContextualMenuItem[] = [];
      items.push({
        key: '__Template_Header',
        text: 'From Template:',
        style: {
          fontSize: '.75em',
        },
        disabled: true,
      });
      uiOptions.forEach((uiOption) => {
        items.push({
          text: uiOption.label,
          key: uiOption.value,
          style: {
            padding: '0 5px 0 15px',
          },
          onClick: () => handleCreateGroup(uiOption.value),
        });
      });

      createMenuProps = {
        items,
      };
    }

    return (
      <Button
        id="CreateGroupButton"
        split={Boolean(numTemplates > 0)}
        variant="primary"
        aria-label={createCmd.label ?? undefined}
        onClick={() => {
          setSelectedGroupId(undefined);
          setTemplateId(undefined);
          setIsPanelOpen(true);
        }}
        menuProps={createMenuProps}
        block={false}
      >
        {createCmd.label}
      </Button>
    );
  };

  // Render No Records found
  const renderNoRecords = () => {
    const emptyText = createCmd
      ? 'There are no Access Policy Groups configured in this Organization. Click the button below to create a new group.'
      : 'There are no Access Policy Groups configured in this Organization.';

    return (
      <EmptyState
        title="No access groups found"
        description={emptyText}
        actions={renderCreateGroupButton(templatesData?.accessPolicyGroupTemplates)}
      />
    );
  };

  const renderBody = () => {
    if (loading) {
      return renderLoadingRecords();
    }
    if (!groups.length) {
      return renderNoRecords();
    }
    return (
      <ThemedDetailsList
        items={groups}
        selectionMode={SelectionMode.none}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={onRenderItemColumn}
        isHeaderVisible
      />
    );
  };

  //
  // !Render Page
  //
  return (
    <LayoutDashboard id="PageAdmin" menuOptionSelected={ROUTE_ACCESS_MANAGEMENT_GROUPS.API_ID}>
      {groups.length > 0 && (
        <PageHeader id="__AccessGroupsHeader">
          <Container>
            <Row>
              <Column lg="6" direction="row">
                <PageTitle id="__Page_Title" title="Access Policy Groups" />
              </Column>
              <Column lg="6" right>
                {renderCreateGroupButton(templatesData?.accessPolicyGroupTemplates)}
              </Column>
            </Row>
          </Container>
        </PageHeader>
      )}
      <PageBody id="__AccessGroupBody">
        <Container>
          <Row>{renderBody()}</Row>
        </Container>
      </PageBody>

      {isDialog && (
        <DialogYesNo
          open={isDialog}
          highlightNo
          title="Delete Group"
          message="Are you sure you want to delete this Access Policy Group?"
          onYes={() => {
            if (selectedGroupId) {
              deleteAccessPolicyGroup(selectedGroupId).then();
            }
            return null;
          }}
          onClose={() => {
            setDialog(false);
            return null;
          }}
        />
      )}

      <AccessPolicyGroupPanel
        isOpen={isPanelOpen}
        onCreateGroupPolicy={() => {
          fetchData();
        }}
        onUpdateGroupPolicy={() => {
          fetchData();
        }}
        onDismiss={() => {
          setIsPanelOpen(false);
          setSelectedGroupId(null);
        }}
        selectedGroupId={selectedGroupId}
        templateId={templateId}
      />
    </LayoutDashboard>
  );
};

const AccessManagementGroupsPage = memo(AccessManagementGroupsContainer);

export { AccessManagementGroupsPage };
