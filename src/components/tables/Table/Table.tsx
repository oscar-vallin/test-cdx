/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactElement, useEffect, useState } from 'react';

import {
  Link,
  mergeStyles,
  mergeStyleSets,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  buildColumns,
  IColumn,
} from '@fluentui/react';
import { EmptyState } from 'src/containers/states';
import { getDates } from 'src/helpers/tableHelpers.service';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { yyyyMMdd } from 'src/utils/CDXUtils';
import { TableHeader } from '../TableHeader';
import {
  StyledText,
  StyledContainer,
  StyledCell,
  StyledSpecs,
  StyledSublabel,
  RouteLink,
  StyledEmptyTable,
} from './Table.styles';

const _buildColumns = (
  items,
  xtColumns,
  canResizeColumns,
  onColumnClick,
  sortedColumnKey,
  isSortedDescending,
  groupedColumnKey,
  onColumnContextMenu
) => {
  //
  const columns = buildColumns(
    items,
    canResizeColumns,
    onColumnClick,
    sortedColumnKey,
    isSortedDescending,
    groupedColumnKey
  );

  columns.forEach((column) => {
    column.onColumnContextMenu = onColumnContextMenu;
    column.ariaLabel = `Operations for ${column.name}`;
    column.isResizable = true;

    const columnData = xtColumns.find((xtColumn) => xtColumn.key === column.fieldName);
    column.name = columnData?.label ?? column.name;

    column.minWidth = columnData?.minWidth ?? 100;
    column.maxWidth = columnData?.maxWidth ?? 200;

    if (!columnData?.minWidth || !columnData?.maxWidth) {
      switch (column.key) {
        case 'datetime':
          column.minWidth = 120;
          column.maxWidth = 120;
          break;

        default:
          break;
      }
    }
  });

  return columns;
};

/**
 * * TABLE COMPONENT
 * @author [Edison](mailto://edison.sanchez@known2u.com)
 * @param {array} items List of items.
 * @param {Object} columns Structure of Columns
 * @param {Object} structure Table Structure.
 * @param {Function} onOption Function when clic on row.
 * @param {Array} groups Group values to group rows.
 * @param {string} searchIntput String.typing filter locally in the table. Data not modified, just view after filter.
 * */

const defaultProps = {
  loading: true,
  // variant: 'primary',
  // pill: true,
  // label: '',
  // children: '',
};

type TableProps = {
  id?: string;
  items?: any;
  columns?: any;
  sortButtons?: string[];
  onOption?: any | null;
  groups?: any;
  searchInput?: any;
  date?: any;
  onItemsListChange?: any | null;
  loading?: boolean;
  title?: string;
  emptyMessage?: string;
  fromDate?: Date;
  toDate?: Date;
  titleRedirectPage: string;
} & typeof defaultProps;

export const Table = ({
  id,
  items,
  columns,
  sortButtons,
  onOption,
  groups,
  searchInput,
  date,
  onItemsListChange,
  emptyMessage = 'No data',
  fromDate,
  toDate,
  title,
  titleRedirectPage,
}: TableProps): ReactElement => {
  const { orgSid } = useOrgSid();

  const [sortLabel, setSortLabel] = useState<string | undefined>();
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedGroups, setSortedGroups] = useState();
  const [tablecolumns, setColumns] = useState<IColumn[]>();
  const [filterInput, setFilterInput] = useState(searchInput);
  const [option, setOption] = useState(false);
  const [sort, setSort] = useState('asc');

  const _copyAndSort = (argItems, columnKey, isSortedDescending = false) => {
    const key = columnKey;

    const filterItems = argItems.map((item) => {
      const _item = { ...item };

      if (Object.prototype.hasOwnProperty.call(item, 'groupId')) {
        delete _item.groupId;
      }

      return _item;
    });

    return filterItems.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  };

  /*
   * Local Functions.
   */
  const _buildItems = () => {
    if (!items) return null;
    const iItems = items.map((rowItem) => {
      const objItem = {};

      rowItem.forEach((rowColItem) => {
        objItem[rowColItem.columnId] = rowColItem.value;
      });

      return objItem;
    });

    setSortedItems(iItems);
    return iItems;
  };

  /*
   * Local Functions.
   */
  const _filterItems = (textFilter) => {
    const iItems = items.map((rowItem) => {
      const objItem = {};
      let filterFound = false;

      rowItem.forEach((rowColItem) => {
        objItem[rowColItem.columnId] = rowColItem.value;

        if (rowColItem.value && typeof rowColItem.value === 'string' && !filterFound) {
          filterFound = rowColItem.value.toLowerCase().includes(textFilter.toLowerCase());
        }
      });

      if (filterFound) return objItem;

      return undefined;
    });

    const itemsResult = iItems.filter((iItemRow) => !!iItemRow);

    setSortedItems(itemsResult);
    return itemsResult;
  };

  //
  // When items or groups change
  // > then group merge, build Columns, build Items, and set Columns.
  useEffect(() => {
    const doEffect = () => {
      if (groups) {
        const _groups = groups.map((groupItem) => {
          return {
            startIndex: groupItem?.startIndex ?? 0,
            count: groupItem.count ?? 2,
            level: groupItem.level ?? 0,
            ...groupItem,
          };
        });

        setSortedGroups(_groups);
      }

      const _items = _buildItems();
      const _columns: IColumn[] = _buildColumns(_items, columns, true, null, null, false, null, null);
      setColumns(_columns);
    };

    return doEffect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, groups]);

  // When searchInput param changes
  // -> setFilterInput and filter items changing sortedItems
  useEffect(() => {
    if (searchInput) {
      setFilterInput(searchInput);

      _filterItems(searchInput);
    } else if (!searchInput && !!filterInput) {
      setFilterInput(searchInput);
      _buildItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, items]);

  useEffect(() => {
    setFilterInput(searchInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);

  useEffect(() => {
    setSortedItems(_copyAndSort(sortedItems, 'datetime', false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (onItemsListChange) {
      onItemsListChange(sortedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedItems]);

  //
  // Render Item Column
  //
  const _renderItemColumn = (item, index, column) => {
    const { fieldName } = column;
    // eslint-disable-next-line react/destructuring-assignment
    const fieldContent = item[fieldName];
    const fieldItem = items[index].find((_item) => _item.columnId === column.fieldName);

    const columnData = columns.find((_column) => _column.key === column.key);

    switch (columnData.style) {
      case 'datetime':
        return <span>{fieldContent}</span>;

      case 'link':
        if (option) {
          return (
            <>
              <link id="__RouteLink">
                <RouteLink to={`${fieldItem.text}`}>{fieldContent}</RouteLink>
              </link>
              <StyledSublabel>{`Spec: ${fieldItem.sublabel}`}</StyledSublabel>
            </>
          );
        }

        return (
          <Link>
            <RouteLink to={`${fieldItem.text}`}>{fieldContent}</RouteLink>
          </Link>
        );

      case 'bus':
        return <StyledText right>{fieldContent}</StyledText>;

      case 'vendor': {
        let startFormatted;
        let endFormatted;
        if (date === 'custom') {
          startFormatted = yyyyMMdd(fromDate);
          endFormatted = yyyyMMdd(toDate);
        } else {
          startFormatted = yyyyMMdd(getDates(date).startDate);
          endFormatted = yyyyMMdd(getDates(date).endDate);
        }

        return (
          <StyledCell left>
            <Link>
              <RouteLink
                to={`/${titleRedirectPage}?filter=${fieldContent}&orgSid=${orgSid}&startDate=${startFormatted}&endDate=${endFormatted}`}
              >
                {fieldContent}
              </RouteLink>
            </Link>
            {fieldItem.sublabel && <StyledSpecs>{`spec: ${fieldItem.sublabel}`}</StyledSpecs>}
          </StyledCell>
        );
      }

      // case 'progress':
      //   return <FileProgress stringValues={item.progress} />;

      case 'color':
        return (
          <span
            data-selection-disabled="true"
            className={mergeStyles({ color: fieldContent, height: '100%', display: 'block' })}
          >
            {fieldContent}
          </span>
        );

      case 'specs':
        break;

      case 'total':
        return (
          <StyledCell id="TotalCell" right>
            <span>{fieldContent}</span>
          </StyledCell>
        );

      case 'node':
        return <StyledCell id="Progress">{fieldContent}</StyledCell>;

      default:
        return <span id="__defaultCaseNode">{fieldContent}</span>;
    }

    return <span>{fieldContent}</span>;
  };

  // * Click on Row.
  const _onItemInvoked = () => null;

  //
  const _onSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
    setSortLabel(sortLabel === 'Vendor' ? 'BUs' : 'Vendor');
    setSortedItems(_copyAndSort(sortedItems, columns[sortLabel === 'Vendor' ? 1 : 0].fieldName, false));
    return null;
  };

  //
  const _onShowSpecs = () => {
    setOption(!option);

    onOption(!option);
  };

  //
  //
  const _onRenderTableHeader = (props) => {
    if (!sortLabel) {
      setSortLabel('Vendor');
      setSortedItems(_copyAndSort(sortedItems, columns[0]?.fieldName, false));
    }

    return (
      <TableHeader
        id={`${id}_header`}
        header={{
          type: 'dashboard',
          title,
          url: `/${titleRedirectPage}?orgSid=${orgSid}&startDate=${yyyyMMdd(fromDate)}&endDate=${yyyyMMdd(toDate)}`,
          buttons: sortButtons,
        }}
        sortLabel={sortLabel}
        onSort={_onSort}
        onOption={_onShowSpecs}
        date={date}
        {...props}
      />
    );
  };

  // * RENDER

  const renderItems = () => {
    return sortedItems;
  };

  const renderSortedItem = () => {
    const classNames = mergeStyleSets({
      root: {
        width: '100%',
      },

      headerDivider: {
        display: 'inline-block',
        height: '100%',
      },
    });

    if (items?.length > 0) {
      return (
        <DetailsList
          className={classNames.root}
          items={sortedItems}
          columns={tablecolumns}
          selectionMode={SelectionMode.none}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
          onItemInvoked={_onItemInvoked}
          onRenderDetailsHeader={_onRenderTableHeader}
          onRenderItemColumn={_renderItemColumn}
          groups={sortedGroups}
        />
      );
    }
    return (
      <StyledEmptyTable>
        <TableHeader
          id={`${id}_header`}
          header={{
            type: 'dashboard',
            title,
            url: `/${titleRedirectPage}?orgSid=${orgSid}&startDate=${yyyyMMdd(fromDate)}&endDate=${yyyyMMdd(toDate)}`,
          }}
          sortLabel={sortLabel}
          onSort={_onSort}
          onOption={_onShowSpecs}
          date={date}
        />
        <div className="EmptyTable__message">{emptyMessage}</div>
      </StyledEmptyTable>
    );
  };

  //
  //
  const renderItem = () => {
    const classNames = mergeStyleSets({
      root: {
        width: '100%',
      },

      headerDivider: {
        display: 'inline-block',
        height: '100%',
      },
    });

    if (items?.length > 0) {
      return (
        <DetailsList
          className={classNames.root}
          items={renderItems()}
          columns={tablecolumns}
          selectionMode={SelectionMode.none}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
          onItemInvoked={_onItemInvoked}
          onRenderItemColumn={_renderItemColumn}
          groups={sortedGroups}
        />
      );
    }

    return <EmptyState description={emptyMessage} />;
  };

  if (sortedItems) {
    return <StyledContainer style={{ width: '100%' }}>{renderSortedItem()}</StyledContainer>;
  }

  return <StyledContainer style={{ width: '100%' }}>{renderItem()}</StyledContainer>;
};

Table.defaultProps = defaultProps;
