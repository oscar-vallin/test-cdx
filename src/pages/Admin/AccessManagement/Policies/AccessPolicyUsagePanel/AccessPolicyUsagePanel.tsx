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
import {
  useAccessPolicyUsagesLazyQuery,
  AccessGroupUsageConnection,
  AccessGroupUsage,
  useAccessPolicyGroupsForOrgLazyQuery,
  useAccessPolicyGroupTemplatesLazyQuery,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { Spacing } from 'src/components/spacings/Spacing';
import { ButtonLink } from 'src/components/buttons';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { AccessPolicyGroupPanel } from '../../Groups/AccessPolicyGroup';

type AccessPolicyUsageProps = {
  isOpen: boolean;
  closePanel: (data: boolean) => void;
  selectedPolicyId: string;
  currentName: string;
};

const AccessPolicyUsagePanel = ({
  isOpen, closePanel, selectedPolicyId, currentName,
}: AccessPolicyUsageProps) => {
  const { orgSid } = useOrgSid();
  const [accessPolicyUsages, setAccessPolicyUsages] = useState<AccessGroupUsageConnection | null>();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>();
  const [isGroupPanelOpen, setIsGroupPanelOpen] = useState(false);
  const [
    policyUsages,
    { data: accessUsages, loading: isLoadingAccessUsages, error: errorUsages },
  ] = useAccessPolicyUsagesLazyQuery();
  const [apiAmGroupsForOrg] = useAccessPolicyGroupsForOrgLazyQuery();
  const [fetchTemplates] = useAccessPolicyGroupTemplatesLazyQuery({
    variables: {
      orgSid,
    },
  });

  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(errorUsages);
  }, [errorUsages]);

  const fetchData = () => {
    apiAmGroupsForOrg({ variables: { orgSid } });
    if (orgSid) {
      fetchTemplates({ variables: { orgSid } });
    }
  };

  const columnOptions: DataColumn[] = [
    {
      name: 'Organization',
      key: 'organization',
      fieldName: 'org',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
    {
      name: 'Access Policy Group',
      key: 'accessPolicyGroups',
      fieldName: 'group',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true,
      isSorted: true,
      isSortedDescending: false,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
  ];

  const tableFilters = useTableFilters('Organization, Access Policy Groups, etc.');
  const { columns } = useSortableColumns(tableFilters, columnOptions);

  const getPolicyGroups = () => {
    policyUsages({
      variables: {
        policySid: selectedPolicyId,
        pageableInput: tableFilters.pagingParams,
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      getPolicyGroups();
    }
  }, [isOpen, tableFilters.pagingParams]);

  useEffect(() => {
    if (!isLoadingAccessUsages && accessUsages) {
      setAccessPolicyUsages(accessUsages.accessPolicyUsages);
    }
  }, [accessUsages, isLoadingAccessUsages]);

  const onRenderItemColumn = (item: AccessGroupUsage, index?: number, column?: IColumn) => {
    let columnVal: string | undefined;
    if (column?.key === 'organization') {
      columnVal = item.organization?.name ?? '';
    } else if (column?.key === 'accessPolicyGroups') {
      columnVal = item.group?.name ?? '';
    }

    if (column?.key === 'accessPolicyGroups') {
      return (
        <ButtonLink
          onClick={() => {
            setSelectedGroupId(item.group?.sid);
            setIsGroupPanelOpen(true);
          }}
        >
          {columnVal}
        </ButtonLink>
      );
    }
    return <ButtonLink>{columnVal}</ButtonLink>;
  };

  const renderPanelHeader = () => {
    if (!isLoadingAccessUsages) {
      return (
        <PanelHeader id="__PanelHeader">
          <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
            <PanelTitle id="__AccessPolicyUsages_Panel_Title" variant="bold" size="large">
              {currentName} - usage ({accessPolicyUsages?.nodes?.length})
            </PanelTitle>
          </Stack>
        </PanelHeader>
      );
    }
    return null;
  };

  const renderBody = () => {
    if (isLoadingAccessUsages) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading access policy usages" />
        </Spacing>
      );
    }

    return (
      <DetailsList
        items={accessPolicyUsages?.nodes ?? []}
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
      id="__AccessPolicyUsage_Panel"
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      onRenderHeader={renderPanelHeader}
      isOpen={isOpen}
      onDismiss={() => closePanel(false)}
    >
      {renderBody()}
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

export { AccessPolicyUsagePanel };
