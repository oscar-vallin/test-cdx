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
  useAccessSpecializationUsagesLazyQuery,
  AccessGroupUsage,
  useAccessPolicyGroupsForOrgLazyQuery,
  useAccessPolicyGroupTemplatesLazyQuery,
} from 'src/data/services/graphql';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { ButtonLink } from 'src/components/buttons';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { AccessPolicyGroupPanel } from '../../Groups/AccessPolicyGroup';

type AccessSpecializationUsageProps = {
  isOpen: boolean;
  closePanel: (data: boolean) => void;
  selectedAccessId: string;
  currentName: string;
};

const AccessSpecializationUsagePanel = ({
  isOpen,
  closePanel,
  selectedAccessId,
  currentName,
}: AccessSpecializationUsageProps) => {
  const { orgSid } = useOrgSid();
  const [usages, setUsages] = useState<AccessGroupUsage[] | null>();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>();
  const [isGroupPanelOpen, setIsGroupPanelOpen] = useState(false);
  const [apiAmGroupsForOrg] = useAccessPolicyGroupsForOrgLazyQuery();
  const [fetchTemplates] = useAccessPolicyGroupTemplatesLazyQuery({
    variables: {
      orgSid,
    },
  });
  const [
    accessSpecializationUsages,
    {
      data: accessSpecializationData,
      loading: isLoadingAccessSpecialization,
      error: errorSpecializationUsages,
    },
  ] = useAccessSpecializationUsagesLazyQuery();
  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(errorSpecializationUsages);
  }, [errorSpecializationUsages]);

  const fetchData = () => {
    apiAmGroupsForOrg({ variables: { orgSid } });
    if (orgSid) {
      fetchTemplates({ variables: { orgSid } });
    }
  };

  const columnOptions: DataColumn[] = [
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

  const getSpecializationGroups = () => {
    accessSpecializationUsages({
      variables: {
        specializationSid: selectedAccessId,
        pageableInput: tableFilters.pagingParams,
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      getSpecializationGroups();
    }
  }, [isOpen, tableFilters.pagingParams]);

  useEffect(() => {
    if (!isLoadingAccessSpecialization && accessSpecializationData) {
      setUsages(accessSpecializationData.accessSpecializationUsages?.nodes);
    }
  }, [accessSpecializationData, isLoadingAccessSpecialization]);

  const renderPanelHeader = () => (
    <PanelHeader id="__AccessSpecializationUsages_PanelHeader">
      <Stack horizontal styles={{ root: { height: 44, marginTop: '5px' } }}>
        <PanelTitle id="__AccessSpecializationUsages_Panel_Title" variant="bold" size="large">
          {currentName} - usage ({usages?.length})
        </PanelTitle>
      </Stack>
    </PanelHeader>
  );

  const onRenderItemColumn = (item: AccessGroupUsage, index?: number, column?: IColumn) => {
    let columnVal: string | undefined;
    if (column?.key === 'accessPolicyGroups') {
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

  const renderBody = () => (
    <DetailsList
      items={usages ?? []}
      selectionMode={SelectionMode.none}
      columns={columns}
      layoutMode={DetailsListLayoutMode.justified}
      onRenderItemColumn={onRenderItemColumn}
      isHeaderVisible
    />
  );

  return (
    <ThemedPanel
      id="__AccessSpecializationUsage_Panel"
      closeButtonAriaLabel="Close"
      type={PanelType.smallFixedFar}
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

export default AccessSpecializationUsagePanel;
