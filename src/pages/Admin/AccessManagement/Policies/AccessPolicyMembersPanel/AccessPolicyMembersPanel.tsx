import { useEffect, useState } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  DirectionalHint,
  IColumn,
  PanelType,
  SelectionMode,
  Stack,
  TooltipHost,
} from '@fluentui/react';
import { PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import {
  useAccessPolicyMembersLazyQuery,
  AccessMemberConnection,
  AccessMember,
  ActiveEnum,
  useAccessPolicyGroupsForOrgLazyQuery,
  useAccessPolicyGroupTemplatesLazyQuery,
  PaginationInfo,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useUsersLists } from 'src/pages/Admin/Users/useUsersList';
import { ButtonLink } from 'src/components/buttons';
import { PresenceBlocked16Regular } from '@fluentui/react-icons';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { UpdateUserPanel, useUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers';
import { Paginator } from 'src/components/tables/Paginator';
import { theme } from 'src/styles/themes/theme';
import { AccessPolicyGroupPanel } from '../../Groups/AccessPolicyGroup';
import { MembersList } from '../../MembersList/MembersList';

type AccessPolicyMembersProps = {
  isOpen: boolean;
  closePanel: (data: boolean) => void;
  selectedPolicyId: string;
  currentName: string;
  members?: number;
};

const AccessPolicyMembersPanel = ({
  isOpen, closePanel, selectedPolicyId, currentName, members,
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
  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });
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

      const newPaginInfo = accessMembers.accessPolicyMembers?.paginationInfo;
      if (newPaginInfo) {
        setPagingInfo(newPaginInfo);
      }
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
    } else if (column?.key === 'organization') {
      columnVal = item.organization.name ?? '';
    } else if (column?.key === 'accessPolicyGroups') {
      columnVal = item.accessPolicyGroups ? item.accessPolicyGroups[0].name : '';
    }

    const inactiveUser = (status: boolean) => {
      if (!status) {
        return (
          <TooltipHost content="Inactive" directionalHintForRTL={DirectionalHint['bottomCenter']}>
            <PresenceBlocked16Regular style={{ cursor: 'pointer', color: theme.colors.neutralQuaternary }} />
          </TooltipHost>
        )
      }
      return null;
    };

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
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        <ButtonLink
          style={{ overflow: 'hidden' }}
          title={columnVal}
          onClick={() => updateUserPanel.showPanel(item.userAccountSid)}
        >
          {columnVal}
        </ButtonLink>
        {column?.key === 'email' && inactiveUser(item.active)}
      </Stack>
    );
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__AccessPolicyMembers_PanelHeader">
      <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
        <PanelTitle id="__AccessPolicyMembers_Panel_Title" variant="bold" size="large">
          {currentName} - members ( {members} )
        </PanelTitle>
      </Stack>
    </PanelHeader>
  );

  const renderBody = () => (
    <>
      <DetailsList
        items={accessPolicyMembers?.nodes ?? []}
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
