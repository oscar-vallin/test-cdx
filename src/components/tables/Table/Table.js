import React from 'react';

import { Link } from 'office-ui-fabric-react/lib/Link';
// import { TextField } from 'office-ui-fabric-react/lib/TextField';
// import { CommandBar, ICommandBarStyles } from 'office-ui-fabric-react/lib/CommandBar';
// import { Announced } from 'office-ui-fabric-react/lib/Announced';
// import { DirectionalHint, ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
// import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import {
  mergeStyles,
  // getTheme,
  mergeStyleSets,
} from 'office-ui-fabric-react/lib/Styling';
import {
  // CheckboxVisibility,
  ColumnActionsMode,
  // ConstrainMode,
  DetailsList,
  // DetailsHeader,
  DetailsListLayoutMode,
  // IColumn,
  // IGroup,
  // Selection,
  SelectionMode,
  buildColumns,
  // IDetailsColumnProps,
} from 'office-ui-fabric-react/lib/DetailsList';
// import { createListItems, isGroupable } from '@uifabric/example-data';
// import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import {
  // StyledBox,
  // StyledRow,
  // StyledColumn,
  // HeaderTable,
  // HeaderColumn,
  StyledText,
  // StyledMenuButton,
  StyledContainer,
  StyledCell,
  StyledSpecs,
} from './Table.styles';

import { TableHeader } from '../TableHeader';

const _buildColumns = (
  items,
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
    // column.onRenderDivider = _onRenderDivider;

    column.onColumnContextMenu = onColumnContextMenu;
    column.ariaLabel = `Operations for ${column.name}`;
    if (column.key === 'thumbnail') {
      column.iconName = 'Picture';
      column.isIconOnly = true;
    } else if (column.key === 'description') {
      column.isMultiline = true;
      column.minWidth = 200;
    } else if (column.key === 'name') {
      // column.onRender = (item) => <Link data-selection-invoke>{item.name}</Link>;
    } else if (column.key === 'key') {
      column.columnActionsMode = ColumnActionsMode.disabled;
      column.onRender = (item) => (
        <Link className={classNames.linkField} href="https://microsoft.com" target="_blank" rel="noopener">
          {item.key}
        </Link>
      );
      column.minWidth = 90;
      column.maxWidth = 90;
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

//
const Table = ({
  canResizeColumns = false,
  checkboxVisibility = false,
  constrainMode,
  contextualMenuProps,
  groupItemLimit,
  groups,
  isHeaderVisible,
  isLazyLoaded,
  isSortedDescending,
  items,
  layoutMode,
  selectionMode,
  sortedColumnKey,
  selectionCount,
  announcedMessage,
  structure,
  onOption,
}) => {
  const [sortLabel, setSortLabel] = React.useState();
  const [sortedItems, setSortedItems] = React.useState(items);

  React.useEffect(() => {
    setSortedItems(items);
  }, [items]);

  // console.log('Rendering Component Table...', sortedItems);
  const columns = _buildColumns(items);

  const _renderItemColumn = (item, index, column) => {
    const fieldContent = item[column.fieldName];
    // console.log('_renderItemColumn, columns: ', columns);
    // console.log('_renderItemColumn, item: ', item);

    switch (column.key) {
      case 'bus':
        return <StyledText right>{fieldContent}</StyledText>;

      case 'vendor':
        // console.log([item.column]);
        return (
          <StyledCell left>
            <Link href="#">{fieldContent}</Link>
            {item.specs && <StyledSpecs>{`specs: ${item.specs}`}</StyledSpecs>}
          </StyledCell>
        );

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

      default:
        return <span>{fieldContent}</span>;
    }
  };

  // const _onColumnClick = (event, column) => {
  //   let { isSortedDescending } = column;

  //   // If we've sorted this column, flip it.
  //   if (column.isSorted) {
  //     isSortedDescending = !isSortedDescending;
  //   }

  //   // console.log({ column, sortedItems });
  //   // Sort the items.
  //   const _sortedItems = _copyAndSort(sortedItems, column?.fieldName, isSortedDescending);
  //   setSortedItems(_sortedItems);
  //   // Reset the items and columns to match the state.

  //   columns = columns.map((col) => {
  //     col.isSorted = col.key === column.key;

  //     if (col.isSorted) {
  //       col.isSortedDescending = isSortedDescending;
  //     }

  //     return col;
  //   });
  // };

  // const _getKey = (item, index) => {
  //   return item.key;
  // };

  // const _onColumnHeaderContextMenu = (column, ev) => {
  //   // console.log(`column ${column?.key} contextmenu opened.`);
  // };

  const _onItemInvoked = (item, index) => {
    alert(`Item ${item.name} at index ${index} has been invoked.`);
  };

  const _copyAndSort = (items, columnKey, isSortedDescending = false) => {
    const key = columnKey;
    return items.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  };

  const _onSort = () => {
    if (structure.header.type === 'dashboard') {
      setSortLabel(sortLabel === 'Vendor' ? 'BUs' : 'Vendor');

      setSortedItems(_copyAndSort(sortedItems, columns[sortLabel === 'Vendor' ? 1 : 0].fieldName, false));
    }
  };

  const _onShowSpecs = () => {
    onOption();
    // setOptionFlag(!optionFlag);
  };

  const _onRenderTableHeader = () => {
    if (structure.header.type === 'dashboard' && !sortLabel) {
      setSortLabel('Vendor');

      // console.log('_onRenderTableHeader, ', { columns, sortedItems });
      // if (columns.length)
      setSortedItems(_copyAndSort(sortedItems, columns[0]?.fieldName, false));
    }

    return <TableHeader header={structure.header} sortLabel={sortLabel} onSort={_onSort} onOption={_onShowSpecs} />;
  };

  return (
    <StyledContainer id="Table_Detailed" style={{ width: '100%' }}>
      <DetailsList
        className={classNames.root}
        id="TableDetailedList"
        items={sortedItems}
        columns={columns}
        selectionMode={SelectionMode.none}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
        onItemInvoked={_onItemInvoked}
        onRenderDetailsHeader={_onRenderTableHeader}
        onRenderItemColumn={_renderItemColumn}
      />
      {sortedItems?.length === 0 && <StyledText bold>No Data</StyledText>}
    </StyledContainer>
  );
};

Table.propTypes = {};

export { Table };
