import React, { useEffect, useState } from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import queryString from 'query-string';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { getDates } from '../../../helpers/tableHelpers';
import {
  ColumnActionsMode,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  buildColumns,
  DetailsHeader,
} from 'office-ui-fabric-react/lib/DetailsList';

import {
  StyledText,
  StyledContainer,
  StyledCell,
  StyledSpecs,
  StyledSublabel,
  CellItemRow,
  RouteLink,
  StyledMenuButton,
  StyledMenuIcon,
} from './Table.styles';

import { TableHeader } from '../TableHeader';
import { FileProgress } from '../../../containers/bars/FileProgress';

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
    // column.minWidth = 100;
    // column.maxWidth = 200;
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

    if (column.key === 'thumbnail') {
      column.iconName = 'Picture';
      column.isIconOnly = true;
    } else if (column.key === 'description') {
      column.isMultiline = true;
    } else if (column.key === 'key') {
      column.columnActionsMode = ColumnActionsMode.disabled;
      column.onRender = (item) => (
        <Link className={classNames.linkField} href="https://microsoft.com" target="_blank" rel="noopener">
          {item.key}
        </Link>
      );
    }
  });

  return columns;
};

const classNames = mergeStyleSets({
  root: {
    width: '100%',
  },

  headerDivider: {
    display: 'inline-block',
    height: '100%',
  },
});

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
const Table = ({ items, columns, structure, onOption, groups, searchInput, date }) => {
  const [sortLabel, setSortLabel] = useState();
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedGroups, setSortedGroups] = useState();
  const [tablecolumns, setColumns] = useState([]);
  const [filterInput, setFilterInput] = useState(searchInput);
  const [option, setOption] = useState(false);
  const [sort, setSort] = useState('asc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentKeySort, setCurrentKeySort] = useState('datetime');
  const [isHovering, setIsHovering] = useState(false);
  const [currentHover, setCurrentHover] = useState(null);
  const location = useLocation();
  const [urlParams, setUrlParams] = useState(queryString.parse(location.search));
  const { startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.');
  const initialStartDate = new Date(urlParams.startDate);
  const initialEndDate = new Date(urlParams.endDate);

  // * Component Effects
  // Component Did Mount.
  useEffect(() => {
    definePages();
  });
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
      const _columns = _buildColumns(_items, columns);
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
      setFilterInput();
      _buildItems();
    }
  }, [searchInput, items]);

  useEffect(() => {
    setFilterInput(searchInput);
  }, [option]);

  useEffect(() => {
    setSortedItems(_copyAndSort(sortedItems, 'datetime', false));
  }, []);

  const handleMouseOver = (key) => {
    setCurrentHover(key);
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setCurrentHover(null);
    setIsHovering(false);
  };

  /*
   * Local Functions.
   */
  const _buildItems = () => {
    if (!items) return;
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
    });

    const itemsResult = iItems.filter((iItemRow) => !!iItemRow);

    setSortedItems(itemsResult);
    return itemsResult;
  };

  //
  // Render Item Column
  //
  const _renderItemColumn = (item, index, column) => {
    const fieldContent = item[column.fieldName];
    const fieldItem = items[index].find((_item) => _item.columnId === column.fieldName);
    const tableType = structure.header.type;

    const isTableArchive = tableType === 'archives';
    const isTableFileStatus = tableType === 'file_status';

    const columnData = columns.find((_column) => _column.key === column.key);

    switch (columnData.style) {
      case 'datetime':
        if (isTableArchive) {
          return (
            <>
              <span>{`${fieldContent} `}</span>
              <Link href="#">(details)</Link>
            </>
          );
        }
        return <span>{fieldContent}</span>;

      case 'link':
        if (isTableFileStatus && fieldItem.child) {
          return (
            <CellItemRow>
              <Link>
                <RouteLink to={`${fieldItem.text}?filter=${filterInput}`}>{fieldContent}</RouteLink>
              </Link>
              {fieldItem.child.value}
            </CellItemRow>
          );
        }

        if (!!option) {
          return (
            <>
              <link>
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

      case 'vendor':
        if (isTableArchive) {
          return (
            <StyledCell left>
              <span>{fieldContent}</span>
            </StyledCell>
          );
        }

        const formatDatesURL = 'yyyy-MM-dd';
        const startFormatted = format(getDates(date).startDate, formatDatesURL);
        const endFormatted = format(getDates(date).endDate, formatDatesURL);

        return (
          <StyledCell left>
            <Link>
              <RouteLink to={`/file-status?filter=${fieldContent}&startDate=${startFormatted}&endDate=${endFormatted}`}>
                {fieldContent}
              </RouteLink>
            </Link>
            {fieldItem.sublabel && <StyledSpecs>{`spec: ${fieldItem.sublabel}`}</StyledSpecs>}
          </StyledCell>
        );

      // case 'progress':
      //   return <FileProgress stringValues={item.progress} />;

      case 'color':
        return (
          <span
            data-selection-disabled
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
        return <span>{fieldContent}</span>;
    }
  };

  // * Click on Row.
  const _onItemInvoked = (item, index) => {
    // alert(`Item ${item.name} at index ${index} has been invoked.`);
  };

  //
  const _copyAndSort = (argItems, columnKey, isSortedDescending = false) => {
    const key = columnKey;

    const filterItems = argItems.map((item) => {
      const _item = { ...item };

      if (item.hasOwnProperty('groupId')) {
        delete _item.groupId;
      }

      return _item;
    });

    return filterItems.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  };

  //
  const _onSort = (key) => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
    setCurrentKeySort(key);
    if (structure.header.type === 'dashboard') {
      setSortLabel(sortLabel === 'Vendor' ? 'BUs' : 'Vendor');

      setSortedItems(_copyAndSort(sortedItems, columns[sortLabel === 'Vendor' ? 1 : 0].fieldName, false));
    } else if (structure.header.type === 'file_status' && key !== 'progress') {
      if (totalPages === 1) {
        setSortedItems(_copyAndSort(sortedItems, key, sort === 'asc' ? false : true));
      } else {
        alert('Sorting unavailable for a multi-page table');
      }
    }
  };

  //
  const _onShowSpecs = () => {
    setOption(!option);

    onOption(!option);
  };

  const _onRenderTableHeader = (props) => {
    if (structure.header.type === 'dashboard' && !sortLabel) {
      setSortLabel('Vendor');

      setSortedItems(_copyAndSort(sortedItems, columns[0]?.fieldName, false));
    } else if (structure.header.type === 'file_status') {
      return (
        <DetailsHeader
          {...props}
          onColumnClick={(_ev, column) => _onSort(column.key)}
          onRenderColumnHeaderTooltip={(props) =>
            props.column.key === 'progress' ? (
              props.children
            ) : props.column.key === currentKeySort ? (
              <StyledMenuButton onClick={() => _onSort(props.column.key)} icon={sort}>
                {props.children}
              </StyledMenuButton>
            ) : (
              <div onMouseOver={() => handleMouseOver(props.column.key)} onMouseOut={handleMouseOut}>
                {isHovering && currentHover === props.column.key ? (
                  <StyledMenuIcon icon={'sort'} onClick={() => _onSort(props.column.key)}>
                    {props.children}
                  </StyledMenuIcon>
                ) : (
                  <StyledMenuButton onClick={() => _onSort(props.column.key)}>{props.children}</StyledMenuButton>
                )}
              </div>
            )
          }
        />
      );
    }

    return (
      <TableHeader
        header={structure.header}
        sortLabel={sortLabel}
        onSort={_onSort}
        onOption={_onShowSpecs}
        date={date}
      />
    );
  };

  // * RENDER

  const definePages = () => {
    // if (structure?.pagination?.active) {
    //   let _totalPages = 1;
    //   _totalPages = Math.ceil(sortedItems.length / structure?.pagination?.pageSize);
    //   _totalPages = _totalPages < 1 ? 1 : _totalPages;
    //   setTotalPages(_totalPages);
    // }
  };

  const onChangePage = (page) => {
    setPage(page > totalPages ? 1 : page);
  };

  const renderItems = () => {
    // if (structure?.pagination?.active) {
    //   return sortedItems.slice((page - 1) * structure?.pagination?.pageSize, page * structure?.pagination?.pageSize);
    // } else {
    return sortedItems;
    // }
  };

  if (sortedItems)
    if (structure.header.type === 'dashboard') {
      return (
        <StyledContainer id="Table_Detailed" style={{ width: '100%' }}>
          <DetailsList
            className={classNames.root}
            id="TableDetailedList"
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
          {/* )} */}
          {sortedItems?.length === 0 && <StyledText bold>No Data</StyledText>}
        </StyledContainer>
      );
    }
  return (
    <StyledContainer id="Table_Detailed" style={{ width: '100%' }}>
      <DetailsList
        className={classNames.root}
        id="TableDetailedList"
        items={renderItems()}
        columns={tablecolumns}
        selectionMode={SelectionMode.none}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
        onItemInvoked={_onItemInvoked}
        onRenderDetailsHeader={structure.header.type === 'file_status' ? _onRenderTableHeader : null}
        onRenderItemColumn={_renderItemColumn}
        groups={sortedGroups}
      />
      {/* )} */}
      {sortedItems?.length === 0 && <StyledText bold>No Data</StyledText>}
      {/* {structure?.pagination?.active && (
        <ContainerPagination>
          <Pagination currentPage={page} totalPages={totalPages || 1} onChange={(page) => onChangePage(page)} />
        </ContainerPagination>
      )} */}
    </StyledContainer>
  );

  // return <p>No Items</p>;
};

Table.propTypes = {};

export { Table };
