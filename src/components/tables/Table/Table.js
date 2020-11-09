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
const Table = ({ items, structure, onOption }) => {
  const [sortLabel, setSortLabel] = React.useState();
  const [sortedItems, setSortedItems] = React.useState(items);

  React.useEffect(() => {
    setSortedItems(items);
  }, [items]);

  const columns = _buildColumns(items);

  const _renderItemColumn = (item, index, column) => {
    const fieldContent = item[column.fieldName];

    switch (column.key) {
      case 'bus':
        return <StyledText right>{fieldContent}</StyledText>;

      case 'vendor':
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
  };

  const _onRenderTableHeader = () => {
    if (structure.header.type === 'dashboard' && !sortLabel) {
      setSortLabel('Vendor');

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
