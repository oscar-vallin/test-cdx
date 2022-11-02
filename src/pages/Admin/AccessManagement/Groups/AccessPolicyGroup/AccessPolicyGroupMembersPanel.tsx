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
  useAccessPolicyGroupMembersLazyQuery,
  AccessMember,
  CdxWebCommandType,
  PaginationInfo,
} from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { ButtonLink } from 'src/components/buttons';
import { UpdateUserPanel, useUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers';
import { Paginator } from 'src/components/tables/Paginator';
import { PresenceBlocked16Regular } from '@fluentui/react-icons';
import { theme } from 'src/styles/themes/theme';
import { MembersList } from '../../MembersList/MembersList';

type AccessPolicyMembersProps = {
  isOpen: boolean;
  closePanel: (data: boolean) => void;
  selectedGroupId: string;
  currentName?: string;
  members?: number;
};

const AccessPolicyGroupMembersPanel = ({
  isOpen,
  closePanel,
  selectedGroupId,
  currentName,
  members,
}: AccessPolicyMembersProps) => {
  const { tableFilters, columns } = MembersList({ organization: true, accessPolicyGroups: false });
  const [groupMembers, setGroupMembers] = useState<AccessMember[] | null>();

  const [
    policyMembers,
    {
      data: accessPolicyGroupMembersData,
      loading: isLoadingAccessGroupMembers,
      error: errorAccessGroupMembers,
    },
  ] = useAccessPolicyGroupMembersLazyQuery();
  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });
  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(errorAccessGroupMembers);
  }, [errorAccessGroupMembers]);

  const updateUserPanel = useUpdateUserPanel();

  const getMembers = () => {
    policyMembers({
      variables: {
        policyGroupSid: selectedGroupId,
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
    if (!isLoadingAccessGroupMembers && accessPolicyGroupMembersData) {
      setGroupMembers(accessPolicyGroupMembersData.accessPolicyGroupMembers?.nodes);

      const newPaginInfo = accessPolicyGroupMembersData.accessPolicyGroupMembers?.paginationInfo;
      if (newPaginInfo) {
        setPagingInfo(newPaginInfo);
      }
    }
  }, [accessPolicyGroupMembersData, isLoadingAccessGroupMembers]);

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
    if (column?.key === 'firstNm') {
      columnVal = item.firstNm;
    } else if (column?.key === 'lastNm') {
      columnVal = item.lastNm ?? '';
    } else if (column?.key === 'email') {
      columnVal = item.email;
    } else if (column?.key === 'organization') {
      columnVal = item.organization.name ?? '';
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

    if (column?.key === 'organization') {
      return (
        <ButtonLink style={{ overflow: 'hidden' }} title={columnVal}>
          {columnVal}
        </ButtonLink>
      );
    }

    const pageCommands = item.commands;
    const _viewCmd = pageCommands?.find((cmd) => cmd.commandType === CdxWebCommandType.View);

    return (
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        <ButtonLink
          style={{ overflow: 'hidden' }}
          title={columnVal}
          onClick={() => {
            if (_viewCmd) {
              updateUserPanel.showPanel(item.userAccountSid);
            }
          }}
        >
          {columnVal}
        </ButtonLink>
        {column?.key === 'email' && inactiveUser(item.active)}
      </Stack>
    );
  };

  const renderPanelHeader = () => (
    <PanelHeader id="__AccessPolicyGroupMembers_PanelHeader">
      <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
        <PanelTitle id="__AccessPolicyGroupMembers_Panel_Title" variant="bold" size="large">
          {currentName} - members ( {members} )
        </PanelTitle>
      </Stack>
    </PanelHeader>
  );

  const renderBody = () => (
    <>
      <DetailsList
        items={groupMembers ?? []}
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
      id="__AccessPolicyGroupMembers_Panel"
      closeButtonAriaLabel="Close"
      type={PanelType.large}
      onRenderHeader={renderPanelHeader}
      isOpen={isOpen}
      onDismiss={() => closePanel(false)}
    >
      {renderBody()}

      <UpdateUserPanel
        useUpdateUserPanel={updateUserPanel}
      />
    </ThemedPanel>
  );
};

export default AccessPolicyGroupMembersPanel;
