/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from 'react';

import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Spinner,
  FontIcon,
  SpinnerSize,
  Link,
  IContextualMenuProps
} from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { Row, Column, Container } from 'src/components/layouts';
import { Button } from 'src/components/buttons';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { PageTitle } from 'src/components/typography';

import {
  AccessPolicyGroup, CdxWebCommandType,
  useAccessPolicyGroupsForOrgLazyQuery,
  useAccessPolicyGroupTemplatesLazyQuery, WebCommand,
} from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { StyledColumn, StyledCommandButton } from './AccessManagementGroupsPage.styles';
import { AccessPolicyGroupPanel } from './AccessPolicyGroup';
import { Spacing } from 'src/components/spacings/Spacing';
import { useAccessManagementGroupsPageService } from './AccessManagementGroupsPage.service';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { ROUTE_ACCESS_MANAGEMENT_GROUPS } from 'src/data/constants/RouteConstants';
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

const AccessManagementGroupsContainer = () => {
  const { orgSid } = useOrgSid();
  const [groups, setGroups] = useState<AccessPolicyGroup[]>([]);
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDialog, setDialog] = useState(false);
  const Toast = useNotification();
  const [templateId, setTemplateId] = useState();

  const [apiAmGroupsForOrg, { data, loading , error}] = useAccessPolicyGroupsForOrgLazyQuery();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>();
  const handleError = ErrorHandler();

  const [fetchTemplates, { data: templatesData, error: templatesError }] =
    useAccessPolicyGroupTemplatesLazyQuery({
      variables: {
        orgSid,
      },
    });

  const { deleteAccessPolicyGroup, deleteError, deleteData } = useAccessManagementGroupsPageService();

  const [createCmd, setCreateCmd] = useState<WebCommand | null>();
  const [deleteCmd, setDeleteCmd] = useState<WebCommand | null>();

  const fetchData = () => {
    apiAmGroupsForOrg({ variables: { orgSid } });
    if (orgSid) {
      fetchTemplates({ variables: { orgSid } });
    }
  }

  useEffect(() => {
    fetchData();
  }, [orgSid]);

  useEffect(() => {
    if (!loading && data) {
      const groups: AccessPolicyGroup[] = [];
      data.accessPolicyGroupsForOrg?.nodes?.forEach((node) => {
        if (node) {
          groups.push(node);
        }
      });

      setGroups(groups);

      const pageCommands = data.accessPolicyGroupsForOrg?.listPageInfo?.pageCommands;
      const createCmd = pageCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Create);
      setCreateCmd(createCmd);
      const listCommands = data.accessPolicyGroupsForOrg?.listPageInfo?.listItemCommands;
      const deleteCmd = listCommands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Delete);
      setDeleteCmd(deleteCmd);
    }
  }, [loading, data]);

  // Handle delete.
  useEffect(() => {
    if (deleteData) {
      if (deleteData.deleteAccessPolicyGroup === 'SUCCESS') {
        if (selectedGroupId || groups.length === 0) return;

        const text = `Access Policy Group ${groups.find(({ sid }) => sid == selectedGroupId)?.name} Deleted.`;
        Toast.info({ text, duration: 3000 });
        setSelectedGroupId(null);

        fetchData();
      }
    }
  }, [deleteData]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  useEffect(() => {
    if (templatesError) {
      handleError(templatesError);
    }
  }, [templatesError])

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
  const handleCreateGroup = (templateId) => {
    setIsPanelOpen(true);
    setSelectedGroupId(null);
    setTemplateId(templateId);

    return null;
  };

  const onRenderItemColumn = (item, index, column) => {
    if (column.key === 'tmpl') {
      return item.tmpl ? <FontIcon id={`__template_${index + 1}`} iconName='Completed' /> : <span/>;
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
      } else {
        return <span/>;
      }
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

  //
  // Render No Records found
  const renderNoRecords = () => {
    const emptyText = createCmd ?
      "There are no Access Policy Groups configured in this Organization. Click the button below to create a new group."
      : "There are no Access Policy Groups configured in this Organization."

    return (
      <EmptyState
        title="No access groups found"
        description={emptyText}
        actions={renderCreateGroupButton(templatesData)}
      />
    );
  };

  const renderCreateGroupButton = (templates) => {

    if (!createCmd) {
      return <></>;
    }

    const { accessPolicyGroupTemplates: groupTemplates } = templates ?? {};

    const numTemplates = groupTemplates?.length ?? 0;

    const createMenuProps: IContextualMenuProps | undefined =
      !!groupTemplates && numTemplates
        ? {
            items: [
              {
                key: '__Template_Header',
                text: 'From Template:',
                style: {
                  fontSize: '.75em'
                },
                disabled: true,
              },
              ...groupTemplates?.map((template) => {
                  return {
                    text: template.label,
                    key: template.value,
                    style: {
                      padding: '0 5px 0 15px'
                    },
                    onClick: () => handleCreateGroup(template.value) };
                })
            ],
          }
        : undefined;

    return (
      <Button
        id="CreateGroupButton"
        split={Boolean(!!groupTemplates && numTemplates)}
        // split={true}
        variant="primary"
        aria-label={createCmd.label ?? undefined}
        onClick={() => {
          setIsPanelOpen(true);
          return null;
        }}
        menuProps={createMenuProps}
        block={false}>
        {createCmd.label}
      </Button>
    );
  };

  const renderBody = () => {
    if (loading) {
      return renderLoadingRecords();
    } else if (!groups.length) {
      return renderNoRecords();
    } else {
      return (
        <DetailsList
          items={groups}
          selectionMode={SelectionMode.none}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          onRenderItemColumn={onRenderItemColumn}
          isHeaderVisible
        />
      );
    }
  }

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
                {renderCreateGroupButton(templatesData)}
              </Column>
            </Row>
          </Container>
        </PageHeader>
      )}
      <Container>
        <Row>
          <StyledColumn lg="12">
            {renderBody()}
          </StyledColumn>
        </Row>
      </Container>

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
