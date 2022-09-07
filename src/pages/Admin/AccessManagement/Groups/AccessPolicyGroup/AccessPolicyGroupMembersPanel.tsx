import { useEffect, useState } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  PanelType,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
} from '@fluentui/react';
import { PanelHeader, PanelTitle, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { useAccessPolicyGroupMembersLazyQuery, AccessMember, ActiveEnum } from 'src/data/services/graphql';
import { useUsersLists } from 'src/pages/Admin/Users/useUsersList';
import { Spacing } from 'src/components/spacings/Spacing';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { ButtonLink } from 'src/components/buttons';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { UpdateUserPanel, useUpdateUserPanel } from 'src/pages/Admin/Users/UpdateUsers';

type AccessPolicyMembersProps = {
  isOpen: boolean;
  closePanel: (data: boolean) => void;
  selectedGroupId: string;
  currentName: string;
};

const AccessPolicyGroupMembersPanel = ({
  isOpen,
  closePanel,
  selectedGroupId,
  currentName,
}: AccessPolicyMembersProps) => {
  const [groupMembers, setGroupMembers] = useState<AccessMember[] | null>();

  const [
    policyMembers,
    { data: accessPolicyGroupMembersData, loading: isLoadingAccessGroupMembers },
  ] = useAccessPolicyGroupMembersLazyQuery();

  const updateUserPanel = useUpdateUserPanel();

  const userService = useUsersLists(ActiveEnum.Active);

  const columnOptions: DataColumn[] = [
    {
      name: 'First Name',
      key: 'firstNm',
      fieldName: 'person.firstNm',
      minWidth: 200,
      maxWidth: 200,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
    {
      name: 'Last Name',
      key: 'lastNm',
      fieldName: 'person.lastNm',
      minWidth: 100,
      maxWidth: 200,
      isPadded: true,
      isSorted: true,
      isSortedDescending: false,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
    {
      name: 'Email',
      key: 'email',
      fieldName: 'email',
      data: 'string',
      dataType: 'enum',
      sortable: true,
      minWidth: 200,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: 'Organization',
      key: 'organization',
      fieldName: 'orgName',
      minWidth: 200,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
  ];
  const tableFilters = useTableFilters('Name, Last Name, Email, Organization, etc.');
  const { columns } = useSortableColumns(tableFilters, columnOptions);

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

  const renderPanelHeader = () => {
    if (!isLoadingAccessGroupMembers) {
      return (
        <PanelHeader id="__PanelHeader">
          <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
            <PanelTitle id="__AccessPolicyGroupMembers_Panel_Title" variant="bold" size="large">
              {currentName}
            </PanelTitle>
          </Stack>
        </PanelHeader>
      );
    }
    return null;
  };

  const renderBody = () => {
    if (isLoadingAccessGroupMembers) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading access policy group members" />
        </Spacing>
      );
    }

    return (
      <DetailsList
        items={groupMembers ?? []}
        selectionMode={SelectionMode.none}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={onRenderItemColumn}
        isHeaderVisible
      />
    );
  };

  return (
    <ThemedPanel
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
    </ThemedPanel>
  );
};

export default AccessPolicyGroupMembersPanel;
