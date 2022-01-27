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
  useAccessPolicyGroupsForOrgLazyQuery,
  useAccessPolicyGroupTemplatesLazyQuery,
} from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { StyledColumn, StyledCommandButton } from './AccessManagementGroupsPage.styles';
import { CreateGroupPanel } from './CreateGroup';
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
  const [groups, setGroups] = useState<any[]>([]);
  const columns = generateColumns();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDialog, setDialog] = useState(false);
  const Toast = useNotification();
  const [templateId, setTemplateId] = useState();

  const [apiAmGroupsForOrg, { data, loading }] = useQueryHandler(useAccessPolicyGroupsForOrgLazyQuery);
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const handleError = ErrorHandler();

  const [fetchTemplates, { data: templatesData, error: templatesError }] =
    useAccessPolicyGroupTemplatesLazyQuery({
      variables: {
        orgSid,
      },
    });

  const { deleteAccessPolicyGroup, deleteError, deleteData } = useAccessManagementGroupsPageService();

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
      setGroups(data.accessPolicyGroupsForOrg.nodes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // Handle delete.
  useEffect(() => {
    if (deleteData) {
      if (deleteData.deleteAccessPolicyGroup === 'SUCCESS') {
        if (selectedGroupId === 0 || groups.length === 0) return;

        const text = `Access Policy Group ${groups.find(({ sid }) => sid === selectedGroupId).name} Deleted.`;
        setGroups(groups.filter(({ sid }) => sid !== selectedGroupId));
        Toast.info({ text, duration: 3000 });
      }
    }
  }, [deleteData]);

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
    setSelectedGroupId(0);
    setTemplateId(templateId);

    return null;
  };

  const onRenderItemColumn = (item, index, column) => {
    if (column.key === 'tmpl') {
      return item.tmpl ? <FontIcon id={`__template_${index + 1}`} iconName='Completed' /> : <span/>;
    }
    if (column.key === 'actions') {
      return (
        <>
          &nbsp;
          <StyledCommandButton
            id={`__deleteGroup_${index + 1}`}
            iconProps={{ iconName: 'Delete' }}
            onClick={() => {
              handleDeleteGroup(item.sid);
            }}
          />
        </>
      );
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
    return (
      <EmptyState
        title="No access groups found"
        description="You haven't created an access group yet. Click the button below to create a new group."
        actions={renderCreateGroupButton(templatesData)}
      />
    );
  };

  const renderCreateGroupButton = (templates) => {
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
        onClick={() => {
          setIsPanelOpen(true);
          return null;
        }}
        menuProps={createMenuProps}
        block={false}>
        Create Group
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
            deleteAccessPolicyGroup(selectedGroupId.toString()).then();
            return null;
          }}
          onClose={() => {
            setDialog(false);
            return null;
          }}
        />
      )}

      <CreateGroupPanel
        isOpen={isPanelOpen}
        onCreateGroupPolicy={() => {
          fetchData();
        }}
        onUpdateGroupPolicy={() => {
          fetchData();
        }}
        onDismiss={() => {
          setIsPanelOpen(false);
          setSelectedGroupId(0);
        }}
        selectedGroupId={selectedGroupId}
        templateId={templateId}
      />
    </LayoutDashboard>
  );
};

const AccessManagementGroupsPage = memo(AccessManagementGroupsContainer);

export { AccessManagementGroupsPage };
