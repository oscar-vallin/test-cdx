import { IColumn } from '@fluentui/react';
import { useState } from 'react';
import { NullHandling, PageableInput, SortDirection } from 'src/data/services/graphql';
import { TableFiltersType } from 'src/hooks/useTableFilters';

type UseSortableColumnsType = {
  columns: IColumn[];
};

export const useSortableColumns = (
  tableFilters: TableFiltersType,
  tableColumns: IColumn[],
  sortable: string[],
  onSort?: (key: string) => void
) : UseSortableColumnsType => {

  const [columns, setColumns] = useState(tableColumns);

  const _doSort = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol) => column.key === currCol.key)[0];
    let sortParam: PageableInput = tableFilters.pagingParams;
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        sortParam = {
          pageNumber: 0,
          pageSize: 100,
          sort: [
            {
              property: currColumn.key,
              direction: currColumn.isSortedDescending ? SortDirection.Desc : SortDirection.Asc,
              nullHandling: NullHandling.NullsFirst,
              ignoreCase: true,
            },
          ],
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    setColumns(newColumns);
    tableFilters.setPagingParams(sortParam);
    if (onSort) {
      onSort(column.key);
    }
  };

  // Init
  const clonedColumns = [...tableColumns];
  clonedColumns.forEach((value) => {
    if (sortable.includes(value.key)) {
      value.onColumnClick = _doSort
    }
  });

  return {
    columns
  };
}