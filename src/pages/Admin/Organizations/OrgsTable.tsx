import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IconButton,
  Link,
  SelectionMode,
} from '@fluentui/react'
import { Row } from 'src/components/layouts';
import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { Organization } from 'src/data/services/graphql';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';

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
  type,
  setSelectedOrgSid,
  setIsPanelOpen,
}: OrgsTableType) => {
  const ActiveDomain = useActiveDomainUseCase();
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

  const renderBody = () => (
    <DetailsList
      items={orgs ?? []}
      selectionMode={SelectionMode.none}
      columns={columns}
      layoutMode={DetailsListLayoutMode.justified}
      isHeaderVisible
    />
  );

  return (
    <Row>{renderBody()}</Row>
  )
};
