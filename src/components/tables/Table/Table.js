import React, { useEffect, useState } from 'react';

import { Link } from 'office-ui-fabric-react/lib/Link';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import {
  ColumnActionsMode,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  buildColumns,
} from 'office-ui-fabric-react/lib/DetailsList';

import { StyledText, StyledContainer, StyledCell, StyledSpecs } from './Table.styles';

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

    column.minWidth = columnData.minWidth ?? 100;
    column.maxWidth = columnData.maxWidth ?? 200;

    if (column.key === 'thumbnail') {
      column.iconName = 'Picture';
      column.isIconOnly = true;
    } else if (column.key === 'datetime') {
      // column.minWidth = columnData.minWidth ?? 100;
      // column.maxWidth = columnData.maxWidth ?? 150;
    } else if (column.key === 'vendor') {
      // column.minWidth = 150;
      // column.maxWidth = 150;
    } else if (column.key === 'description') {
      column.isMultiline = true;
      // column.minWidth = 200;
    } else if (column.key === 'name') {
      // column.onRender = (item) => <Link data-selection-invoke>{item.name}</Link>;
    } else if (column.key === 'extractName') {
      // column.onRender = (item) => <Link data-selection-invoke>{item.name}</Link>;
      // column.minWidth = 200;
    } else if (column.key === 'progress') {
      // column.onRender = (item) => <Link data-selection-invoke>{item.name}</Link>;
      console.log('Progress Column');

      // column.minWidth = 80;
      // column.maxWidth = 80;
      // column.width = '80px';
    } else if (column.key === 'clientFile') {
      // column.minWidth = '300px';
      // column.maxWidth = '300px';
    } else if (column.key === 'key') {
      column.columnActionsMode = ColumnActionsMode.disabled;
      column.onRender = (item) => (
        <Link className={classNames.linkField} href="https://microsoft.com" target="_blank" rel="noopener">
          {item.key}
        </Link>
      );
      // column.minWidth = 90;
      // column.maxWidth = 90;
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
const Table = ({ items, columns, structure, onOption, groups, searchInput }) => {
  const [sortLabel, setSortLabel] = useState();
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedGroups, setSortedGroups] = useState();
  const [tablecolumns, setColumns] = useState([]);
  const [filterInput, setFilterInput] = useState(searchInput);

  // * Component Effects
  // Component Did Mount.
  useEffect(() => {}, []);

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
    console.log('Table, useEffect(searchInput): ', searchInput);

    if (searchInput) {
      setFilterInput(searchInput);

      _filterItems(searchInput);
    } else if (!searchInput && !!filterInput) {
      setFilterInput();
      _buildItems();
    }
  }, [searchInput]);

  /*
   * Local Functions.
   */
  const _buildItems = () => {
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
      console.log('map => rowItem: ', rowItem);

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
  const _renderItemColumn = (item, index, column) => {
    const fieldContent = item[column.fieldName];
    const fieldItem = items[index].find((_item) => _item.columnId === column.fieldName);
    const tableType = structure.header.type;

    const isTableArchive = tableType === 'archives';

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
        if (fieldItem?.sublabel) {
          return (
            <>
              <span>{`${fieldContent} `}</span>
              <Link href={`${fieldItem.text}`}>{fieldItem.sublabel}</Link>
            </>
          );
        }

        return <Link href={`${fieldItem.text}`}>{fieldContent}</Link>;

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
        return (
          <StyledCell left>
            <Link href="#">{fieldContent}</Link>
            {item.specs && <StyledSpecs>{`specs: ${item.specs}`}</StyledSpecs>}
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
    alert(`Item ${item.name} at index ${index} has been invoked.`);
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
  const _onSort = () => {
    if (structure.header.type === 'dashboard') {
      setSortLabel(sortLabel === 'Vendor' ? 'BUs' : 'Vendor');

      setSortedItems(_copyAndSort(sortedItems, columns[sortLabel === 'Vendor' ? 1 : 0].fieldName, false));
    }
  };

  //
  const _onShowSpecs = () => {
    onOption();
  };

  const _onRenderTableHeader = () => {
    if (structure.header.type === 'dashboard' && !sortLabel) {
      setSortLabel('Vendor');

      setSortedItems(_copyAndSort(sortedItems, columns[0]?.fieldName, false));
    }

    return <TableHeader header={structure.header} sortLabel={sortLabel} onSort={_onSort} onOption={_onShowSpecs} />;
  };

  // * RENDER

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
        items={sortedItems}
        columns={tablecolumns}
        selectionMode={SelectionMode.none}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
        onItemInvoked={_onItemInvoked}
        onRenderDetailsHeader={null}
        onRenderItemColumn={_renderItemColumn}
        groups={sortedGroups}
      />
      {/* )} */}
      {sortedItems?.length === 0 && <StyledText bold>No Data</StyledText>}
    </StyledContainer>
  );

  // return <p>No Items</p>;
};

Table.propTypes = {};

export { Table };
