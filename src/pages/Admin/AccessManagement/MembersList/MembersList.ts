import { DataColumn, useSortableColumns } from 'src/containers/tables';
import { useTableFilters } from 'src/hooks/useTableFilters';

const defaultProps = {
  organization: false,
  accessPolicyGroups: false,
}
type MemberListProps = {
    organization?: boolean;
    accessPolicyGroups?: boolean;
} & typeof defaultProps;

export const MembersList = ({ organization, accessPolicyGroups }: MemberListProps) => {
  const organ: DataColumn = {
    name: 'Organization',
    key: 'organization',
    fieldName: 'orgName',
    minWidth: 200,
    isPadded: true,
    dataType: 'string',
    sortable: true,
    filterable: false,
  };
  const accPoGr: DataColumn = {
    name: 'Access Policy Groups',
    key: 'accessPolicyGroups',
    fieldName: 'accessName',
    minWidth: 200,
    isPadded: true,
    dataType: 'string',
    sortable: true,
    filterable: false,
  };
  const columnOptions: DataColumn[] = [
    {
      name: 'First Name',
      key: 'firstNm',
      fieldName: 'person.firstNm',
      minWidth: 100,
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
  ];

  if (organization) columnOptions.push(organ);
  if (accessPolicyGroups) columnOptions.push(accPoGr);

  const org = organization ? 'Organization' : '';
  const access = accessPolicyGroups ? 'Access Policy Groups' : '';

  const tableFilters = useTableFilters(`Name, Last Name, Email, ${org}, ${access}, etc.`);
  const { columns } = useSortableColumns(tableFilters, columnOptions);

  return { tableFilters, columns };
};
