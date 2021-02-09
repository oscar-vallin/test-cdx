import React from 'react';

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
    console.log('_buildColumns: column', column.ariaLabel);
    column.isResizable = true;
    column.minWidth = 100;
    column.maxWidth = 200;
    const columnData = xtColumns.find((xtColumn) => xtColumn.key === column.fieldName);
    column.name = columnData?.label ?? column.name;
    console.log('_buildColumns, xtColumns: ', columnData);

    if (column.key === 'thumbnail') {
      column.iconName = 'Picture';
      column.isIconOnly = true;
    } else if (column.key === 'datetime') {
      column.minWidth = 150;
      column.maxWidth = 190;
    } else if (column.key === 'vendor') {
      column.minWidth = 150;
      column.maxWidth = 150;
    } else if (column.key === 'description') {
      column.isMultiline = true;
      column.minWidth = 200;
    } else if (column.key === 'name') {
      // column.onRender = (item) => <Link data-selection-invoke>{item.name}</Link>;
    } else if (column.key === 'progress') {
      // column.onRender = (item) => <Link data-selection-invoke>{item.name}</Link>;
      column.minWidth = 270;
      column.maxWidth = 270;
    } else if (column.key === 'clientFile') {
      column.minWidth = 300;
      column.maxWidth = 300;
    } else if (column.key === 'key') {
      column.columnActionsMode = ColumnActionsMode.disabled;
      column.onRender = (item) => (
        <Link className={classNames.linkField} href="https://microsoft.com" target="_blank" rel="noopener">
          {item.key}
        </Link>
      );
      column.minWidth = 90;
      column.maxWidth = 90;
    } else {
      column.minWidth = 90;
      column.maxWidth = 90;
    }
  });

  console.log('Columns built: ', columns);

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

//
const Table = ({ items, columns, structure, onOption, groups }) => {
  const [sortLabel, setSortLabel] = React.useState();
  const [sortedItems, setSortedItems] = React.useState([]);
  const [sortedGroups, setSortedGroups] = React.useState();
  const [tablecolumns, setColumns] = React.useState([]);

  console.log('Table, items:', items);
  console.log('Table, columns:', columns);
  console.log('Table, structure:', structure);

  React.useEffect(() => {}, []);

  const _buildItems = () => {
    const iItems = items.map((rowItem) => {
      const objItem = {};

      rowItem.forEach((rowColItem) => {
        objItem[rowColItem.columnId] = rowColItem.value;
      });

      return objItem;
    });

    console.log('table, _buildItems, iItems', iItems);
    setSortedItems(iItems);
    return iItems;
  };

  React.useEffect(() => {
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

  //
  const _renderItemColumn = (item, index, column) => {
    const fieldContent = item[column.fieldName];
    const fieldItem = items[index].find((_item) => _item.columnId === column.fieldName);
    const tableType = structure.header.type;

    console.log('renderItemColum, item: ', item);
    console.log('renderItemColum, fieldContent: ', fieldContent);
    console.log('renderItemColum, fieldLabel: ', fieldItem);

    const isTableArchive = tableType === 'archives';

    const columnData = columns.find((_column) => _column.key === column.key);

    // console.log('renderItemColum, columnData: ', columnData);

    switch (columnData.style) {
      case 'datetime':
        console.log('structure: ', structure);
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
        console.log('Table = link, fieldContent: ', fieldContent);
        console.log('Table = link, fieldItem: ', fieldItem);

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
        console.log('total cell: ', fieldContent);
        return (
          <StyledCell id="TotalCell" right>
            <span>{fieldContent}</span>
          </StyledCell>
        );

      case 'node':
        console.log('progressBar: ', fieldContent);
        return (
          <StyledCell id="Progress">
            <span>{fieldContent}</span>
          </StyledCell>
        );

      default:
        return <span>{fieldContent}</span>;
    }
  };

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

  console.log('Render, SortedItems: ', sortedItems);
  console.log('Render, tablecolumns: ', tablecolumns);
  console.log('Header, type:', structure.header.type);

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
