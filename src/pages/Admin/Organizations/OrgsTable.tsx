import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IconButton,
  Link,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack,
} from '@fluentui/react'
import { Column, Container, Row } from 'src/components/layouts';
import { ThemedSearchBox } from 'src/components/inputs/SearchBox/ThemedSearchBox.styles';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { Organization, UiBooleanField } from 'src/data/services/graphql';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { Spacing } from 'src/components/spacings/Spacing';

type OrgsTableType = {
    orgs?: Organization[];
    tableFilters: TableFiltersType;
    searchAllOrgsFilter: boolean;
    setSearchAllOrgsFilter: (data: boolean) => void;
    loading?: boolean;
    type?: string;
    setSelectedOrgSid: (item: string | undefined) => void;
    setIsPanelOpen: (data: boolean) => void;
}

export const OrgsTable = ({
  orgs,
  tableFilters,
  searchAllOrgsFilter,
  setSearchAllOrgsFilter,
  type,
  loading,
  setSelectedOrgSid,
  setIsPanelOpen,
}: OrgsTableType) => {
  const ActiveDomain = useActiveDomainUseCase();
  const ActiveDomainStore = useActiveDomainStore();
  const onRenderItemColumn = (item?: Organization, index?: number, column?: IColumn) => {
    if (item && column) {
      const value = item[column.key];
      return <span title={value}>{value}</span>;
    }
    return '';
  };

  const changeActiveOrg = (org?: Organization) => {
    ActiveDomain.setCurrentOrg(org?.sid);
  };

  const onRenderOrgName = (item?: Organization, index = 0) => {
    if (type === 'ACTIVE') {
      return (
        <Link
          id={`__ActiveOrg__Name_Field_${index + 1}`}
          className={item?.orgId}
          to={`/admin/organizations/active-orgs?orgSid=${item?.sid}`}
          onClick={() => changeActiveOrg(item)}
        >
          {item?.name}
        </Link>
      )
    }
    return null;
  };

  const onRenderAction = (item?: Organization) => (
    <IconButton
      iconProps={{ iconName: 'Edit' }}
      title="View Org Details"
      onClick={() => {
        setSelectedOrgSid(item?.sid ?? undefined);
        setIsPanelOpen(true);
      }}
    />
  );

  const initColumns: DataColumn[] = [
    {
      name: 'Name',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      dataType: 'string',
      sortable: true,
      isSorted: true,
      isPadded: true,
      minWidth: 150,
      maxWidth: 600,
      flexGrow: 1,
      onRender: onRenderOrgName,
    },
    {
      name: 'Org ID',
      key: 'orgId',
      fieldName: 'orgId',
      data: 'string',
      dataType: 'string',
      sortable: true,
      isSorted: true,
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
      onRender: onRenderItemColumn,
    },
    {
      name: 'Org Type',
      key: 'orgTypeLabel',
      fieldName: 'orgType',
      data: 'string',
      dataType: 'enum',
      sortable: true,
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
      onRender: onRenderItemColumn,
    },
    {
      name: '',
      key: 'actions',
      fieldName: 'actions',
      data: 'string',
      dataType: 'string',
      isPadded: true,
      minWidth: 50,
      maxWidth: 50,
      onRender: onRenderAction,
    },
  ];
  const { columns } = useSortableColumns(tableFilters, initColumns);

  const renderBody = () => {
    if (loading) {
      const orgsType = type === 'ACTIVE' ? 'active' : 'inactive';
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label={`Loading ${orgsType} orgs`} />
        </Spacing>
      );
    }

    return (
      <DetailsList
        items={orgs ?? []}
        selectionMode={SelectionMode.none}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
      />
    )
  }

  const searchAllField: UiBooleanField = {
    label: 'Search all organizations',
    value: searchAllOrgsFilter,
    visible: true,
    required: false,
  };

  const showCheckbox = () => {
    if (ActiveDomainStore.domainOrg.current.orgId === 'CDX') {
      return (
        <UIInputCheck
          id="__SearchAllOrgs__Orgs-Checkbox"
          uiField={searchAllField}
          onChange={(_event, _searchAllOrgsFilter: any) => {
            setSearchAllOrgsFilter(_searchAllOrgsFilter);
          }}
        />
      );
    }
    return null;
  };

  return (
    <Container>
      <Row>
        <Stack horizontal={true} wrap={true} style={{ width: '100%' }} verticalAlign="end">
          <Column lg="6">
            <ThemedSearchBox
              id="Orgs_Input-Search"
              disabled={false}
              value={tableFilters.searchText.value}
              styles={{ root: { width: '100%' } }}
              onChange={tableFilters.searchText.onChange}
              placeholder="Search"
            />
          </Column>
          <Column lg="6">
            {showCheckbox()}
          </Column>
        </Stack>
      </Row>
      <Row>{renderBody()}</Row>
    </Container>
  )
};
