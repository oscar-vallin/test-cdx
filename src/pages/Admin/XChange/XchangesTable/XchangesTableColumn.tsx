import React from 'react';
import { IColumn } from '@fluentui/react';

export enum XchangesTableColumns {
  VENDOR,
  SPEC,
  CORE_FILENAME,
  ACTIVITY,
}

export const useXchangesTableColums = (selectedColumns: XchangesTableColumns[]) => {
  const columnOptions: IColumn[] = [
    {
      data: XchangesTableColumns.VENDOR,
      name: 'Vendor',
      key: 'vendor',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true,
    },
    {
      data: XchangesTableColumns.SPEC,
      name: 'Spec',
      key: 'spec',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true,
    },
    {
      data: XchangesTableColumns.CORE_FILENAME,
      name: 'Core Filename',
      key: 'coreFN',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true,
    },
    {
      data: XchangesTableColumns.ACTIVITY,
      name: 'Activity',
      key: 'activity',
      minWidth: 100,
      maxWidth: 255,
      isPadded: true,
    },
  ];

  const initialColumns = (): IColumn[] => {
    const initCols: IColumn[] = [];
    selectedColumns.forEach((sCol: XchangesTableColumns) => {
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
