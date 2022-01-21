/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, memo } from 'react';

import { DetailsList, DetailsListLayoutMode, SelectionMode, Spinner, FontIcon, SpinnerSize, Link } from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { DialogYesNo } from 'src/containers/modals/DialogYesNo';
import { useNotification } from 'src/hooks/useNotification';
import { Row, Column } from 'src/components/layouts';
import { Button } from 'src/components/buttons';
import { LayoutAdmin } from 'src/layouts/LayoutAdmin';
import { PageTitle } from 'src/components/typography';
import { Separator } from 'src/components/separators/Separator';

import {
  useAccessPolicyGroupsForOrgLazyQuery,
  useAccessPolicyGroupTemplatesLazyQuery,
} from 'src/data/services/graphql';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { StyledColumn, StyledCommandButton } from './AccessManagementGroupsPage.styles';
import { CreateGroupPanel } from './CreateGroup';
import { Spacing } from '../../../../components/spacings/Spacing';
import { useAccessManagementGroupsPageService } from './AccessManagementGroupsPage.service';
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
        actions={renderCreateGroupButton(templatesData, true)}
      />
    );
  };

  const renderCreateGroupButton = (templates, noRecords) => {
    const { accessPolicyGroupTemplates: groupTemplates } = templates ?? {};

    const numTemplates = groupTemplates?.length ?? 0;

    const createMenuProps =
      !!groupTemplates && numTemplates
        ? {
            items: groupTemplates?.map((template) => {
              return { text: template.label, key: template.value, onClick: () => handleCreateGroup(template.value) };
            }),
          }
        : null;

    return (
      <>
        <Row>
          {!noRecords && (
            <Column lg="6">
              <PageTitle id='__PageTitle' title='Access Policy Groups'/>
            </Column>
          )}

          <Column lg={noRecords ? '12' : '6'} right={!noRecords}>
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
              block={false}
            >
              Create Group
            </Button>
          </Column>
        </Row>
        <Row>
          <Column lg="12">
            <Spacing margin={{ top: 'normal' }}>
              <Separator />
            </Spacing>
          </Column>
        </Row>
      </>
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
    <LayoutAdmin id="PageAdmin" sidebarOptionSelected="AM_GROUPS">
      <>
        <Spacing margin="double">
          {groups.length > 0 && renderCreateGroupButton(templatesData, false)}
          <Row>
            <StyledColumn lg="12">
              {renderBody()}
            </StyledColumn>
          </Row>
        </Spacing>

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
      </>
    </LayoutAdmin>
  );
};

const AccessManagementGroupsPage = memo(AccessManagementGroupsContainer);

export { AccessManagementGroupsPage };
