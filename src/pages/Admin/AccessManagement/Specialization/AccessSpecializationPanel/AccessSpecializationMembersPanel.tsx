import { useEffect, useState } from 'react';
import {
  useAccessSpecializationMembersLazyQuery,
  AccessMember,
  ActiveEnum,
  useAccessPolicyGroupsForOrgLazyQuery,
  useAccessPolicyGroupTemplatesLazyQuery,
  PaginationInfo,
} from 'src/data/services/graphql';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  PanelType,
  SelectionMode,
  Stack,
} from '@fluentui/react';
import { PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { ButtonLink } from 'src/components/buttons';
import { UpdateUserPanel, useUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers';
import { Paginator } from 'src/components/tables/Paginator';
import { useUsersLists } from 'src/pages/Admin/Users/useUsersList';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { AccessPolicyGroupPanel } from '../../Groups/AccessPolicyGroup';
import { MembersList } from '../../MembersList/MembersList';

type AccessSpecializationMembersProps = {
  isOpen: boolean;
  closePanel: (data: boolean) => void;
  selectedAccessId: string;
  currentName: string;
};

const AccessSpecializationMembersPanel = ({
  isOpen,
  closePanel,
  selectedAccessId,
  currentName,
}: AccessSpecializationMembersProps) => {
  const { orgSid } = useOrgSid();
  const { tableFilters, columns } = MembersList({ organization: false, accessPolicyGroups: true });
  const [members, setMembers] = useState<AccessMember[] | null>();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>();
  const [isGroupPanelOpen, setIsGroupPanelOpen] = useState(false);
  const [apiAmGroupsForOrg] = useAccessPolicyGroupsForOrgLazyQuery();
  const [fetchTemplates] = useAccessPolicyGroupTemplatesLazyQuery({
    variables: {
      orgSid,
    },
  });

  const [
    accessSpecializationMembers,
    {
      data: specializationMembersData,
      loading: isLoadingSpecializationMembers,
      error: errorSpecializationMembers,
    },
  ] = useAccessSpecializationMembersLazyQuery();
  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });
  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(errorSpecializationMembers);
  }, [errorSpecializationMembers]);

  const updateUserPanel = useUpdateUserPanel();

  const userService = useUsersLists(ActiveEnum.Active);

  const fetchData = () => {
    apiAmGroupsForOrg({ variables: { orgSid } });
    if (orgSid) {
      fetchTemplates({ variables: { orgSid } });
    }
  };

  const getspecializationMembers = () => {
    accessSpecializationMembers({
      variables: {
        specializationSid: selectedAccessId,
        pageableInput: tableFilters.pagingParams,
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      getspecializationMembers();
    }
  }, [isOpen, tableFilters.pagingParams]);

  useEffect(() => {
    if (!isLoadingSpecializationMembers && specializationMembersData) {
      setMembers(specializationMembersData.accessSpecializationMembers?.nodes);

      const newPaginInfo = specializationMembersData.accessSpecializationMembers?.paginationInfo;
      if (newPaginInfo) {
        setPagingInfo(newPaginInfo);
      }
    }
  }, [specializationMembersData, isLoadingSpecializationMembers]);

  useEffect(() => {
    // Reset the page number when any filtering occurs
    tableFilters.setPagingParams({
      pageNumber: 0,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableFilters.searchText.delayedValue]);

  const onPageChange = (pageNumber: number) => {
    tableFilters.pagingParams.pageNumber = pageNumber;
    tableFilters.setPagingParams({
      pageNumber,
      pageSize: 100,
      sort: tableFilters.pagingParams.sort,
    });
  };

  const onRenderItemColumn = (item: AccessMember, index?: number, column?: IColumn) => {
    let columnVal: string | undefined;
    const accessPolicyGroupsSid = item.accessPolicyGroups ? item.accessPolicyGroups[0].sid : '';
    if (column?.key === 'firstNm') {
      columnVal = item.firstNm;
    } else if (column?.key === 'lastNm') {
      columnVal = item.lastNm ?? '';
    } else if (column?.key === 'email') {
      columnVal = item.email;
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
    <PanelHeader id="__AccessSpecializationMembers_PanelHeader">
      <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
        <PanelTitle id="__AccessSpecializationMembers_Panel_Title" variant="bold" size="large">
          {currentName} - members ({members?.length})
        </PanelTitle>
      </Stack>
    </PanelHeader>
  );

  const renderBody = () => (
    <>
      <DetailsList
        items={members ?? []}
        selectionMode={SelectionMode.none}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={onRenderItemColumn}
        isHeaderVisible
      />
      <Paginator id="__Paginator" pagingInfo={pagingInfo} onPageChange={onPageChange} />
    </>
  );

  return (
    <ThemedPanel
      id="__AccessSpecializationMembers_Panel"
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

export default AccessSpecializationMembersPanel;
