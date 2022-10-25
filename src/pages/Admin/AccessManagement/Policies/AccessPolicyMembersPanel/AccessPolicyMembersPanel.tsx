import { useEffect, useState } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  PanelType,
  SelectionMode,
  Stack,
} from '@fluentui/react';
import { PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import {
  useAccessPolicyMembersLazyQuery,
  AccessMemberConnection,
  AccessMember,
  ActiveEnum,
  useAccessPolicyGroupsForOrgLazyQuery,
  useAccessPolicyGroupTemplatesLazyQuery,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useUsersLists } from 'src/pages/Admin/Users/useUsersList';
import { ButtonLink } from 'src/components/buttons';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { UpdateUserPanel, useUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers';
import { AccessPolicyGroupPanel } from '../../Groups/AccessPolicyGroup';
import { MembersList } from '../../MembersList/MembersList';

type AccessPolicyMembersProps = {
  isOpen: boolean;
  closePanel: (data: boolean) => void;
  selectedPolicyId: string;
  currentName: string;
};

const AccessPolicyMembersPanel = ({
  isOpen, closePanel, selectedPolicyId, currentName,
}: AccessPolicyMembersProps) => {
  const { orgSid } = useOrgSid();
  const { tableFilters, columns } = MembersList({ organization: true, accessPolicyGroups: true });
  const [accessPolicyMembers, setAccessPolicyMembers] = useState<AccessMemberConnection | null>();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>();
  const [isGroupPanelOpen, setIsGroupPanelOpen] = useState(false);
  const [apiAmGroupsForOrg] = useAccessPolicyGroupsForOrgLazyQuery();
  const [fetchTemplates] = useAccessPolicyGroupTemplatesLazyQuery({
    variables: {
      orgSid,
    },
  });
  const [
    policyMembers,
    { data: accessMembers, loading: isLoadingAccessMembers, error: errorAccessMembers },
  ] = useAccessPolicyMembersLazyQuery();
  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(errorAccessMembers);
  }, [errorAccessMembers]);

  const updateUserPanel = useUpdateUserPanel();

  const userService = useUsersLists(ActiveEnum.Active);

  const fetchData = () => {
    apiAmGroupsForOrg({ variables: { orgSid } });
    if (orgSid) {
      fetchTemplates({ variables: { orgSid } });
    }
  };

  const getMembers = () => {
    policyMembers({
      variables: {
        policySid: selectedPolicyId,
        pageableInput: tableFilters.pagingParams,
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      getMembers();
    }
  }, [isOpen, tableFilters.pagingParams]);

  useEffect(() => {
    if (!isLoadingAccessMembers && accessMembers) {
      setAccessPolicyMembers(accessMembers?.accessPolicyMembers);
    }
  }, [accessMembers, isLoadingAccessMembers]);

  useEffect(() => {
    // Reset the page number when any filtering occurs
    tableFilters.setPagingParams({
      pageNumber: 0,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableFilters.searchText.delayedValue]);

  const onRenderItemColumn = (item: AccessMember, index?: number, column?: IColumn) => {
    let columnVal: string | undefined;
    const accessPolicyGroupsSid = item.accessPolicyGroups ? item.accessPolicyGroups[0].sid : '';
    if (column?.key === 'firstNm') {
      columnVal = item.firstNm;
    } else if (column?.key === 'lastNm') {
      columnVal = item.lastNm ?? '';
    } else if (column?.key === 'email') {
      columnVal = item.email;
    } else if (column?.key === 'organization') {
      columnVal = item.organization.name ?? '';
    } else if (column?.key === 'accessPolicyGroups') {
      columnVal = item.accessPolicyGroups ? item.accessPolicyGroups[0].name : '';
    }

    if (column?.key === 'accessPolicyGroups') {
      return (
        <ButtonLink
          title={columnVal}
          style={{ overflow: 'hidden' }}
          onClick={() => {
            setSelectedGroupId(accessPolicyGroupsSid ?? '');
            setIsGroupPanelOpen(true);
          }}
        >
          {columnVal}
        </ButtonLink>
      );
    }
    if (column?.key === 'organization') {
      return (
        <ButtonLink style={{ overflow: 'hidden' }} title={columnVal}>
          {columnVal}
        </ButtonLink>
      );
    }

    return (
      <ButtonLink
        style={{ overflow: 'hidden' }}
        title={columnVal}
        onClick={() => updateUserPanel.showPanel(item.userAccountSid)}
      >
        {columnVal}
      </ButtonLink>
    );
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__PanelHeader">
      <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
        <PanelTitle id="__AccessPolicyMembers_Panel_Title" variant="bold" size="large">
          {currentName} - members ({accessPolicyMembers?.nodes?.length})
        </PanelTitle>
      </Stack>
    </PanelHeader>
  );

  const renderBody = () => (
    <DetailsList
      items={accessPolicyMembers?.nodes ?? []}
      selectionMode={SelectionMode.none}
      columns={columns}
      layoutMode={DetailsListLayoutMode.justified}
      onRenderItemColumn={onRenderItemColumn}
      isHeaderVisible
    />
  );

  return (
    <ThemedPanel
      id="__AccessPolicyMembers_Panel"
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      onRenderHeader={renderPanelHeader}
      isOpen={isOpen}
      onDismiss={() => closePanel(false)}
    >
      {renderBody()}

      <UpdateUserPanel
        useUpdateUserPanel={updateUserPanel}
        onUpdateUser={() => {
          userService.fetchUsers(
            0,
            tableFilters.pagingParams.sort,
            tableFilters.searchText.delayedValue,
          ).then();
        }}
      />

      <AccessPolicyGroupPanel
        isOpen={isGroupPanelOpen}
        onCreateGroupPolicy={() => {
          fetchData();
        }}
        onUpdateGroupPolicy={() => {
          fetchData();
        }}
        onDismiss={() => {
          setIsGroupPanelOpen(false);
          setSelectedGroupId(null);
        }}
        selectedGroupId={selectedGroupId}
      />
    </ThemedPanel>
  );
};

export { AccessPolicyMembersPanel };
