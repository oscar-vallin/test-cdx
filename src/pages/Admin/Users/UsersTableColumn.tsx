import { IColumn } from '@fluentui/react';
import { DataColumn } from 'src/containers/tables';

export enum UsersTableColumns {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  ORGANIZATION,
}

export const useUsersTableColumns = (selectedColumns: UsersTableColumns[]) => {
  const columnOptions: DataColumn[] = [
    {
      data: UsersTableColumns.FIRST_NAME,
      name: 'First Name',
      key: 'firstNm',
      fieldName: 'person.firstNm',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
    {
      data: UsersTableColumns.LAST_NAME,
      name: 'Last Name',
      key: 'lastNm',
      fieldName: 'person.lastNm',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true,
      isSorted: true,
      isSortedDescending: false,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
    {
      data: UsersTableColumns.EMAIL,
      name: 'Email',
      key: 'email',
      fieldName: 'email',
      minWidth: 255,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
    {
      data: UsersTableColumns.ORGANIZATION,
      name: 'Organization',
      key: 'organization',
      fieldName: 'orgName',
      minWidth: 255,
      isPadded: true,
      dataType: 'string',
      sortable: true,
      filterable: false,
    },
  ];

  const initialColumns = (): DataColumn[] => {
    const initCols: DataColumn[] = [];
    selectedColumns.forEach((sCol: UsersTableColumns) => {
      const matching = columnOptions.find((colOpt: IColumn) => {
        return colOpt.data === sCol;
      });
      if (matching != null) {
        initCols.push(matching);
      }
    });
    return initCols;
  };

  return {
    initialColumns,
  };
};
