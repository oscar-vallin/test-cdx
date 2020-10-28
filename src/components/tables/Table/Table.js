import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { CommandBar, ICommandBarStyles } from 'office-ui-fabric-react/lib/CommandBar';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { DirectionalHint, ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { mergeStyles, getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import {
  CheckboxVisibility,
  ColumnActionsMode,
  ConstrainMode,
  DetailsList,
  DetailsHeader,
  DetailsListLayoutMode,
  IColumn,
  IGroup,
  Selection,
  SelectionMode,
  buildColumns,
  IDetailsColumnProps,
} from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems, isGroupable } from '@uifabric/example-data';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import {
  StyledBox,
  StyledRow,
  StyledColumn,
  HeaderTable,
  HeaderColumn,
  StyledText,
  StyledMenuButton,
} from './Table.styles';

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

  console.log({ buildColumns: columns });

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

const _renderItemColumn = (item, index, column) => {
  const fieldContent = item[column.fieldName];

  switch (column.key) {
    // case 'thumbnail':
    //   return <Image src={fieldContent} width={50} height={50} imageFit={ImageFit.cover} />;

    case 'bus':
      return <StyledText right>{fieldContent}</StyledText>;
      break;

    case 'vendor':
      return <Link href="#">{fieldContent}</Link>;
      break;

    case 'color':
      return (
        <span
          data-selection-disabled
          className={mergeStyles({ color: fieldContent, height: '100%', display: 'block' })}
        >
          {fieldContent}
        </span>
      );

    default:
      return <span>{fieldContent}</span>;
  }
};

const classNames = mergeStyleSets({
  root: {
    width: '100%',
    backgroundColor: 'cyan',
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
  headerType = 'dashboard',
}) => {
  const sortedItems = items;
  const columns = _buildColumns(items);

  const _onColumnClick = (event, column) => {
    let { isSortedDescending } = column;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = _copyAndSort(sortedItems, column.fieldName, isSortedDescending);

    // Reset the items and columns to match the state.

    columns = columns.map((col) => {
      col.isSorted = col.key === column.key;

      if (col.isSorted) {
        col.isSortedDescending = isSortedDescending;
      }

      return col;
    });
  };

  const _getKey = (item, index) => {
    return item.key;
  };

  const _onRenderDetailsHeader = ({ ...props }) => {
    if (headerType === 'normal' && props) {
      return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton="Toggle selection" />;
    }
    if (headerType === 'dashboard') {
      return (
        <HeaderTable>
          <StyledColumn left paddingLeft={12}>
            <Link href="#">
              <StyledText>Transmissions / BUs by Vendor</StyledText>
            </Link>
          </StyledColumn>
          <StyledColumn>
            <StyledRow>
              <StyledColumn>
                <StyledMenuButton
                  icon="sort"
                  onClick={() => {
                    console.log('Sort');
                  }}
                >
                  Vendor
                </StyledMenuButton>
              </StyledColumn>
              <StyledColumn>
                <StyledMenuButton
                  icon="eye"
                  onClick={() => {
                    console.log('Specs');
                  }}
                >
                  Specs
                </StyledMenuButton>
              </StyledColumn>
            </StyledRow>
          </StyledColumn>
        </HeaderTable>
      );
    }
    return null;
  };

  const _onColumnHeaderContextMenu = (column, ev) => {
    console.log(`column ${column?.key} contextmenu opened.`);
  };

  const _onItemInvoked = (item, index) => {
    alert(`Item ${item.name} at index ${index} has been invoked.`);
  };

  const _copyAndSort = (items, columnKey, isSortedDescending = false) => {
    const key = columnKey;
    return items.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  };

  console.log({ columns });

  return (
    <div id="Table_Detailed" style={{ width: '100%' }}>
      <DetailsList
        id="TableDetailedList"
        // items={sortedItems}
        // // setKey="set"
        // columns={columns}
        // onRenderItemColumn={_renderItemColumn}
        // onColumnHeaderClick={_onColumnClick}
        // onItemInvoked={_onItemInvoked}
        // onColumnHeaderContextMenu={_onColumnHeaderContextMenu}
        // ariaLabelForSelectionColumn="Toggle selection"
        // ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        // checkButtonAriaLabel="Row checkbox"
        // className={classNames.root}
        // selectionMode={SelectionMode.none}
        items={items}
        columns={columns}
        selectionMode={SelectionMode.none}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
        onItemInvoked={_onItemInvoked}
        onRenderDetailsHeader={_onRenderDetailsHeader}
        onRenderItemColumn={_renderItemColumn}
      />
    </div>
  );
};

Table.propTypes = {};

export { Table };
