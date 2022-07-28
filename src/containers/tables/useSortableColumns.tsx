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
              property: currColumn.key,
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

  const cloneFilters = () => {
    const clone = {};
    for (const field in tableFilters.additionalFilters) {
      clone[field] = tableFilters.additionalFilters[field];
    }
    return clone;
  }

  const renderColumnHeader = (
    col: DataColumn,
    props?: IDetailsColumnProps,
    defaultRender?: (props?: IDetailsColumnProps) => JSX.Element | null,
  ) => {
    const fieldName = props?.column?.fieldName ?? 'orgId';
    return (
      <span id={`__Col_${fieldName}`} className="ms-DetailsHeader-cellTitle" role="button">
        <span className="ms-DetailsHeader-cellName">
          <ColumnHeader
            id={`__Col_${fieldName}_button`}
            col={col}
            filterValue={tableFilters.additionalFilters[fieldName]}
            onFilter={(filterText) => {
              const _columnFilters = cloneFilters();
              _columnFilters[fieldName] = filterText;
              tableFilters.setAdditionalFilters(_columnFilters);
            }}
          />
        </span>
      </span>
    );
  };

  // Init
  const clonedColumns = [...tableColumns];
  clonedColumns.forEach((col) => {
    if (col.sortable) {
      col.onSortAsc = () => sortAsc(col);
      col.onSortDesc = () => sortDesc(col);
      col.onRenderHeader = (props, defaultRender) => renderColumnHeader(col, props, defaultRender);
    }
  });

  return {
    columns,
  };
};
