import React, { useState } from 'react';
import { NullHandling, PageableInput, SortDirection } from 'src/data/services/graphql';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { ColumnHeader, DataColumn } from 'src/containers/tables/ColumnHeader';
import { IDetailsColumnProps } from '@fluentui/react/lib/components/DetailsList/DetailsColumn.types';

type UseSortableColumnsType = {
  columns: DataColumn[];
};

export const useSortableColumns = (
  tableFilters: TableFiltersType,
  tableColumns: DataColumn[],
  onFilter?: (key: string, value?: any) => void,
): UseSortableColumnsType => {
  const [columns, setColumns] = useState(tableColumns);

  const _doSort = (column: DataColumn, desc: boolean): void => {
    const newColumns: DataColumn[] = columns.slice();
    const currColumn: DataColumn = newColumns.filter((currCol) => column.key === currCol.key)[0];
    let sortParam: PageableInput = tableFilters.pagingParams;
    newColumns.forEach((newCol: DataColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = desc;
        currColumn.isSorted = true;
        sortParam = {
          pageNumber: 0,
          pageSize: 100,
          sort: [
            {
              property: currColumn.fieldName,
              direction: desc ? SortDirection.Desc : SortDirection.Asc,
              nullHandling: NullHandling.NullsFirst,
              ignoreCase: true,
            },
          ],
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = false;
      }
    });
    setColumns(newColumns);
    tableFilters.setPagingParams(sortParam);
  };

  const sortAsc = (column: DataColumn) => {
    _doSort(column, false);
  };

  const sortDesc = (column: DataColumn) => {
    _doSort(column, true);
  };

  const doFilter = (col: DataColumn, fieldName: string, filterText?: string) => {
    if (onFilter) {
      onFilter(fieldName, filterText);
      if (filterText && filterText.trim().length > 0) {
        col.filterAriaLabel = `Filtered by "${filterText}"`;
      } else {
        col.filterAriaLabel = undefined;
      }
    }
  };

  const renderColumnHeader = (col: DataColumn, _additionalFilters: any, props?: IDetailsColumnProps) => {
    const fieldName = props?.column?.fieldName ?? 'orgId';
    return (
      <span id={`__Col_${fieldName}`} className="ms-DetailsHeader-cellName">
        <ColumnHeader
          id={`__Col_${fieldName}_button`}
          col={col}
          filterValue={_additionalFilters[fieldName]}
          onFilter={(filterText) => doFilter(col, fieldName, filterText)}
        />
      </span>
    );
  };

  // Init
  const clonedColumns = [...tableColumns];
  clonedColumns.forEach((col) => {
    if (col.sortable) {
      col.onSortAsc = () => sortAsc(col);
      col.onSortDesc = () => sortDesc(col);
      col.onRenderHeader = (props) => renderColumnHeader(col, tableFilters.additionalFilters, props);
    }
  });

  return {
    columns,
  };
};
