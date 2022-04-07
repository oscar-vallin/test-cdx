import React from 'react';
import { IColumn } from '@fluentui/react';

export enum UsersTableColumns {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  ORGANIZATION,
}

export const useUsersTableColumns = (
  selectedColumns: UsersTableColumns[],
  onSort?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void
) => {
  const columnOptions: IColumn[] = [
    {
      data: UsersTableColumns.FIRST_NAME,
      name: 'First Name',
      key: 'firstNm',
      fieldName: 'person.firstNm',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true,
      onColumnClick: onSort,
    },
    {
      data: UsersTableColumns.LAST_NAME,
      name: 'Last Name',
      key: 'lastNm',
      fieldName: 'person.lastNm',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true,
      onColumnClick: onSort,
    },
    {
      data: UsersTableColumns.EMAIL,
      name: 'Email',
      key: 'email',
      fieldName: 'email',
      minWidth: 255,
      isPadded: true,
      onColumnClick: onSort,
    },
    {
      data: UsersTableColumns.ORGANIZATION,
      name: 'Organization',
      key: 'organization',
      fieldName: 'orgName',
      minWidth: 255,
      isPadded: true,
    },
  ];

  const initialColumns = (): IColumn[] => {
    const initCols: IColumn[] = [];
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
