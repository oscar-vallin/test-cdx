import React from 'react';
import PropTypes from 'prop-types';

const { Link, TextField, CommandBar, ICommandBarStyles, Announced, IContextualMenuProps, IContextualMenuItem, DirectionalHint, ContextualMenu, CheckboxVisibility, ColumnActionsMode, ConstrainMode, DetailsList, DetailsListLayoutMode, IColumn, IGroup, Selection, SelectionMode, buildColumns, IDetailsColumnProps, memoizeFunction, getTheme, mergeStyleSets, Fabric, initializeIcons } = window.Fabric;
const { createListItems, isGroupable, IExampleItem } = window.FabricExampleData;

const theme = getTheme();
const headerDividerClass = 'DetailsListAdvancedExample-divider';
const classNames = mergeStyleSets({
  headerDivider: {
    display: 'inline-block',
    height: '100%',
  },
  headerDividerBar: [
    {
      display: 'none',
      background: theme.palette.themePrimary,
      position: 'absolute',
      top: 16,
      bottom: 0,
      width: '1px',
      zIndex: 5,
    },
    headerDividerClass,
  ],
  linkField: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  root: {
    selectors: {
      [`.${headerDividerClass}:hover + .${headerDividerClass}`]: {
        display: 'inline',
      },
    },
  },
});

const commandBarStyles = { root: { marginBottom: '40px' } };

const DEFAULT_ITEM_LIMIT = 5;
const PAGING_SIZE = 10;
const PAGING_DELAY = 2000;
const ITEMS_COUNT = 5000;


const TableDashboard = ({canResizeColumns = false,
  checkboxVisibility,
  columns,
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
  announcedMessage}) =>  {

  const _isFetchingItems;
  const _selection;
  const _allItems;

  const _getCommandItems = memoizeFunction(this._getCommandItems);

  const _allItems = createListItems(ITEMS_COUNT);
  const _selection = new Selection({
      onSelectionChanged: _onItemsSelectionChanged,
    });

  _selection.setItems(this._allItems, false);

  const items = _allItems;
  const selectionCount= 0;
  const groups= undefined;
  const groupItemLimit=  DEFAULT_ITEM_LIMIT;
  const layoutMode= DetailsListLayoutMode.justified;
  const constrainMode = ConstrainMode.horizontalConstrained;
  const selectionMode = SelectionMode.multiple;
  const canResizeColumns = true;
  const checkboxVisibility= CheckboxVisibility.onHover;
  const columns= _buildColumns(
        _allItems,
        true,
        _onColumnClick,
        '',
        undefined,
        undefined,
        _onColumnContextMenu,
      );
  const contextualMenuProps= undefined;
  const sortedColumnKey = 'name';
  const isSortedDescending= false;
  const isLazyLoaded= false;
  const isHeaderVisible=  true;

  const render = () => {
    const {
      canResizeColumns,
      checkboxVisibility,
      columns,
      constrainMode,
      contextualMenuProps,
      groupItemLimit,
      groups,
      isHeaderVisible,
      isLazyLoaded,
      items,
      layoutMode,
      selectionMode,
      announcedMessage,
    } = this.state;

    const isGrouped = groups && groups.length > 0;
    const groupProps = {
      getGroupItemLimit: (group) => {
        if (group) {
          return group.isShowingAll ? group.count : Math.min(group.count, groupItemLimit);
        } else {
          return items.length;
        }
      },
      footerProps: {
        showAllLinkText: 'Show all',
      },
    };

    return (
      <div className={classNames.root}>
        <CommandBar
          styles={commandBarStyles}
          items={this._getCommandItems(
            canResizeColumns,
            checkboxVisibility,
            constrainMode,
            isHeaderVisible,
            isLazyLoaded,
            layoutMode,
            selectionMode,
          )}
          farItems={[{ key: 'count', text: `${this.state.selectionCount} selected` }]}
        />
        <Announced message={`${this.state.selectionCount} selected`} />

        {isGrouped ? <TextField label="Group item limit" onChange={this._onItemLimitChanged} /> : null}

        {announcedMessage ? <Announced message={announcedMessage} /> : undefined}

        <DetailsList
          setKey="items"
          items={items}
          selection={this._selection}
          groups={groups}
          columns={columns}
          checkboxVisibility={checkboxVisibility}
          layoutMode={layoutMode}
          isHeaderVisible={isHeaderVisible}
          selectionMode={selectionMode}
          constrainMode={constrainMode}
          groupProps={groupProps}
          enterModalSelectionOnTouch={true}
          onItemInvoked={this._onItemInvoked}
          onItemContextMenu={this._onItemContextMenu}
          selectionZoneProps={{
            selection: this._selection,
            disableAutoSelectOnInputElements: true,
            selectionMode: selectionMode,
          }}
          ariaLabelForListHeader="Column headers. Click to sort."
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          ariaLabelForSelectionColumn="Toggle selection"
          checkButtonAriaLabel="Row checkbox"
          onRenderMissingItem={this._onRenderMissingItem}
        />

        {contextualMenuProps && <ContextualMenu {...contextualMenuProps} />}
      </div>
    );
  }

  const _onRenderDivider = (
    columnProps,
    defaultRenderer,
  ) => {
    const { columnIndex } = columnProps;
    return (
      <React.Fragment key={`divider-wrapper-${columnIndex}`}>
        <span className={classNames.headerDivider}>{defaultRenderer(columnProps)}</span>
        <span className={classNames.headerDividerBar} />
      </React.Fragment>
    );
  };

  const _onDataMiss = (index) => {
    index = Math.floor(index / PAGING_SIZE) * PAGING_SIZE;

    if (!_isFetchingItems) {
      _isFetchingItems = true;

      setTimeout(() => {
        _isFetchingItems = false;
        const itemsCopy = [...this.state.items];

        itemsCopy.splice(index, PAGING_SIZE).concat(_allItems.slice(index, index + PAGING_SIZE));

        // this.setState({
        //   items: itemsCopy,
        // });
      }, PAGING_DELAY);
    }
  }

  const _onRenderMissingItem = (index) => {
    this._onDataMiss(index);
    return null;
  };

  const _onToggleLazyLoad = () => {
    let { isLazyLoaded } = this.state;

    isLazyLoaded = !isLazyLoaded;

    this.setState({
      isLazyLoaded: isLazyLoaded,
      items: isLazyLoaded
        ? this._allItems.slice(0, PAGING_SIZE).concat(new Array(ITEMS_COUNT - PAGING_SIZE))
        : this._allItems,
    });
  };

  const _onToggleHeaderVisible = () => {
    this.setState({ isHeaderVisible: !this.state.isHeaderVisible });
  };

  const _onToggleResizing = () => {
    const { items, sortedColumnKey, isSortedDescending } = this.state;
    let { canResizeColumns } = this.state;

    canResizeColumns = !canResizeColumns;

    this.setState({
      canResizeColumns: canResizeColumns,
      columns: this._buildColumns(items, canResizeColumns, this._onColumnClick, sortedColumnKey, isSortedDescending),
    });
  };

  const _onCheckboxVisibilityChanged = (ev, menuItem) => {
    this.setState({ checkboxVisibility: menuItem.data });
  };

  const _onLayoutChanged = (ev, menuItem) => {
    this.setState({ layoutMode: menuItem.data });
  };

  const _onConstrainModeChanged = (ev, menuItem) => {
    this.setState({ constrainMode: menuItem.data });
  };

  const _onSelectionChanged = (ev, menuItem) => {
    this.setState({ selectionMode: menuItem.data });
  };

  const _onItemLimitChanged = (ev, value) => {
    let newValue = parseInt(value, 10);
    if (isNaN(newValue)) {
      newValue = DEFAULT_ITEM_LIMIT;
    }
    this.setState({ groupItemLimit: newValue });
  };

  const _getCommandItems = (
    canResizeColumns,
    checkboxVisibility,
    constrainMode,
    isHeaderVisible,
    isLazyLoaded,
    layoutMode,
    selectionMode,
  ) => {
    return [
      {
        key: 'addRow',
        text: 'Insert row',
        iconProps: { iconName: 'Add' },
        onClick: this._onAddRow,
      },
      {
        key: 'deleteRow',
        text: 'Delete row',
        iconProps: { iconName: 'Delete' },
        onClick: this._onDeleteRow,
      },
      {
        key: 'configure',
        text: 'Configure',
        iconProps: { iconName: 'Settings' },
        subMenuProps: {
          items: [
            {
              key: 'resizing',
              text: 'Allow column resizing',
              canCheck: true,
              checked: canResizeColumns,
              onClick: this._onToggleResizing,
            },
            {
              key: 'headerVisible',
              text: 'Is header visible',
              canCheck: true,
              checked: isHeaderVisible,
              onClick: this._onToggleHeaderVisible,
            },
            {
              key: 'lazyload',
              text: 'Simulate async loading',
              canCheck: true,
              checked: isLazyLoaded,
              onClick: this._onToggleLazyLoad,
            },
            {
              key: 'dash',
              text: '-',
            },
            {
              key: 'checkboxVisibility',
              text: 'Checkbox visibility',
              subMenuProps: {
                items: [
                  {
                    key: 'checkboxVisibility.always',
                    text: 'Always',
                    canCheck: true,
                    isChecked: checkboxVisibility === CheckboxVisibility.always,
                    onClick: this._onCheckboxVisibilityChanged,
                    data: CheckboxVisibility.always,
                  },
                  {
                    key: 'checkboxVisibility.onHover',
                    text: 'On hover',
                    canCheck: true,
                    isChecked: checkboxVisibility === CheckboxVisibility.onHover,
                    onClick: this._onCheckboxVisibilityChanged,
                    data: CheckboxVisibility.onHover,
                  },
                  {
                    key: 'checkboxVisibility.hidden',
                    text: 'Hidden',
                    canCheck: true,
                    isChecked: checkboxVisibility === CheckboxVisibility.hidden,
                    onClick: this._onCheckboxVisibilityChanged,
                    data: CheckboxVisibility.hidden,
                  },
                ],
              },
            },
            {
              key: 'layoutMode',
              text: 'Layout mode',
              subMenuProps: {
                items: [
                  {
                    key: DetailsListLayoutMode[DetailsListLayoutMode.fixedColumns],
                    text: 'Fixed columns',
                    canCheck: true,
                    checked: layoutMode === DetailsListLayoutMode.fixedColumns,
                    onClick: this._onLayoutChanged,
                    data: DetailsListLayoutMode.fixedColumns,
                  },
                  {
                    key: DetailsListLayoutMode[DetailsListLayoutMode.justified],
                    text: 'Justified columns',
                    canCheck: true,
                    checked: layoutMode === DetailsListLayoutMode.justified,
                    onClick: this._onLayoutChanged,
                    data: DetailsListLayoutMode.justified,
                  },
                ],
              },
            },
            {
              key: 'selectionMode',
              text: 'Selection mode',
              subMenuProps: {
                items: [
                  {
                    key: SelectionMode[SelectionMode.none],
                    text: 'None',
                    canCheck: true,
                    checked: selectionMode === SelectionMode.none,
                    onClick: this._onSelectionChanged,
                    data: SelectionMode.none,
                  },
                  {
                    key: SelectionMode[SelectionMode.single],
                    text: 'Single select',
                    canCheck: true,
                    checked: selectionMode === SelectionMode.single,
                    onClick: this._onSelectionChanged,
                    data: SelectionMode.single,
                  },
                  {
                    key: SelectionMode[SelectionMode.multiple],
                    text: 'Multi select',
                    canCheck: true,
                    checked: selectionMode === SelectionMode.multiple,
                    onClick: this._onSelectionChanged,
                    data: SelectionMode.multiple,
                  },
                ],
              },
            },
            {
              key: 'constrainMode',
              text: 'Constrain mode',
              subMenuProps: {
                items: [
                  {
                    key: ConstrainMode[ConstrainMode.unconstrained],
                    text: 'Unconstrained',
                    canCheck: true,
                    checked: constrainMode === ConstrainMode.unconstrained,
                    onClick: this._onConstrainModeChanged,
                    data: ConstrainMode.unconstrained,
                  },
                  {
                    key: ConstrainMode[ConstrainMode.horizontalConstrained],
                    text: 'Horizontal constrained',
                    canCheck: true,
                    checked: constrainMode === ConstrainMode.horizontalConstrained,
                    onClick: this._onConstrainModeChanged,
                    data: ConstrainMode.horizontalConstrained,
                  },
                ],
              },
            },
          ],
        },
      },
    ];
  };

  const _getContextualMenuProps = (ev, column) => {
    const items = [
      {
        key: 'aToZ',
        name: 'A to Z',
        iconProps: { iconName: 'SortUp' },
        canCheck: true,
        checked: column.isSorted && !column.isSortedDescending,
        onClick: () => this._onSortColumn(column.key, false),
      },
      {
        key: 'zToA',
        name: 'Z to A',
        iconProps: { iconName: 'SortDown' },
        canCheck: true,
        checked: column.isSorted && column.isSortedDescending,
        onClick: () => this._onSortColumn(column.key, true),
      },
    ];
    if (isGroupable(column.key)) {
      items.push({
        key: 'groupBy',
        name: 'Group by ' + column.name,
        iconProps: { iconName: 'GroupedDescending' },
        canCheck: true,
        checked: column.isGrouped,
        onClick: () => this._onGroupByColumn(column),
      });
    }
    return {
      items: items,
      target: ev.currentTarget,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: 10,
      isBeakVisible: true,
      onDismiss: this._onContextualMenuDismissed,
    };
  }

  const _onItemInvoked = (item, index) => {
    console.log('Item invoked', item, index);
  };

  const _onItemContextMenu = (item, index, ev) => {
    const contextualMenuProps = {
      target: ev.target,
      items: [
        {
          key: 'text',
          name: `${this._selection.getSelectedCount()} selected`,
        },
      ],
      onDismiss: () => {
        // this.setState({
          // contextualMenuProps: undefined,
          console.log('setContextMenu undefined');
        // });
      },
    };

    if (index > -1) {
      // this.setState({
      //   contextualMenuProps: contextualMenuProps,
      // });
      console.log('contextualMenuProps: contextualMenuProps');

    }

    return false;
  };

  const _onColumnClick = (ev, column) => {
    if (column.columnActionsMode !== ColumnActionsMode.disabled) {
      // this.setState({
      //   contextualMenuProps: this._getContextualMenuProps(ev, column),
      // });

      console.log('thisContextMenu');
    }
  };

  const _onColumnContextMenu = (column, ev) => {
    if (column.columnActionsMode !== ColumnActionsMode.disabled) {
      // this.setState({
      //   contextualMenuProps: this._getContextualMenuProps(ev, column),
      // });
      console.log('contextualMenuProps: this')
    }
  };

  const _onContextualMenuDismissed = () => {
    // this.setState({
    //   contextualMenuProps: undefined,
    // });

    console.log('undefined ...');
  };

  const _onSortColumn = (columnKey, isSortedDescending) => {
    const sortedItems = _copyAndSort(this._allItems, columnKey, isSortedDescending);

    // this.setState({
    //   items: sortedItems,
    //   announcedMessage: `${columnKey} is sorted ${isSortedDescending ? 'descending' : 'ascending'}`,
    //   groups: undefined,
    //   columns: this._buildColumns(
    //     sortedItems,
    //     true,
    //     this._onColumnClick,
    //     columnKey,
    //     isSortedDescending,
    //     undefined,
    //     this._onColumnContextMenu,
    //   ),
    //   isSortedDescending: isSortedDescending,
    //   sortedColumnKey: columnKey,
    // });
  };

  const _onGroupByColumn = (column) => {
    const { key, isGrouped } = column;
    // const { sortedColumnKey, isSortedDescending, groups, items, columns } = this.state;

    // if (isGrouped) {
    //   // ungroup
    //   this._onSortColumn(sortedColumnKey!, !!isSortedDescending);
    // } else {
    //   let groupedItems = [];
    //   let newGroups: IGroup[];
    //   if (groups) {
    //     newGroups = [...groups];
    //     groupedItems = this._groupByKey(newGroups, items, key as keyof IExampleItem);
    //   } else {
    //     groupedItems = _copyAndSort(items, key);
    //     newGroups = this._getGroups(groupedItems, key as keyof IExampleItem);
    //   }

    //   for (const c of columns) {
    //     if (c.key === key) {
    //       c.isGrouped = true;
    //       break;
    //     }
    //   }
    //   this.setState({
    //     items: groupedItems,
    //     columns: [...columns],
    //     groups: newGroups,
    //   });
    // }
  };

  const _groupByKey = (groups, items, key) => {
    let groupedItems = [];
    if (groups) {
      for (const group of groups) {
        if (group.children && group.children.length > 0) {
          const childGroupedItems = this._groupByKey(group.children, items, key);
          groupedItems = groupedItems.concat(childGroupedItems);
        } else {
          const itemsInGroup = items.slice(group.startIndex, group.startIndex + group.count);
          const nextLevelGroupedItems = _copyAndSort(itemsInGroup, key);
          groupedItems = groupedItems.concat(nextLevelGroupedItems);
          group.children = this._getGroups(nextLevelGroupedItems, key, group);
        }
      }
    }
    return groupedItems;
  }

  const _getGroups = (groupedItems, key, parentGroup) => {
    const separator = '-';
    const groups = groupedItems.reduce((current, item, index) => {
      const currentGroup = current[current.length - 1];
      const itemColumnValue = item[key];

      if (!currentGroup || this._getLeafGroupKey(currentGroup.key, separator) !== itemColumnValue) {
        current.push({
          key: (parentGroup ? parentGroup.key + separator : '') + itemColumnValue,
          name: key + ': ' + itemColumnValue,
          startIndex: parentGroup ? parentGroup.startIndex + index : index,
          count: 1,
          // level: parentGroup ? parentGroup.level! + 1 : 0,
        });
      } else {
        currentGroup.count++;
      }
      return current;
    }, []);

    return groups;
  }

  const _getLeafGroupKey = (key, separator) => {
    let leafKey = key;
    if (key.indexOf(separator) !== -1) {
      const arrKeys = key.split(separator);
      leafKey = arrKeys[arrKeys.length - 1];
    }
    return leafKey;
  }

  const _onAddRow = () => {
    this.setState({
      items: createListItems(1).concat(this.state.items),
    });
  };

  const _onDeleteRow = () => {
    if (this._selection.getSelectedCount() > 0) {
      // this.setState((previousState: IDetailsListAdvancedExampleState) => {
      //   return {
      //     items: previousState.items.filter((item, index) => !this._selection.isIndexSelected(index)),
      //   };
      // });
    } else {
      // this.setState({
      //   items: this.state.items.slice(1),
      // });
    }
  };

  const _onItemsSelectionChanged = () => {
    // this.setState({
    //   selectionCount: this._selection.getSelectedCount(),
    // });
  };

  const _buildColumns = (
    items,
    canResizeColumns,
    onColumnClick,
    sortedColumnKey,
    isSortedDescending,
    groupedColumnKey,
    onColumnContextMenu,
  ) => {
    const columns = buildColumns(
      items,
      canResizeColumns,
      onColumnClick,
      sortedColumnKey,
      isSortedDescending,
      groupedColumnKey,
    );

    columns.forEach(column => {
      column.onRenderDivider = this._onRenderDivider;
      column.onColumnContextMenu = onColumnContextMenu;
      column.ariaLabel = `Operations for ${column.name}`;
      if (column.key === 'thumbnail') {
        column.iconName = 'Picture';
        column.isIconOnly = true;
      } else if (column.key === 'description') {
        column.isMultiline = true;
        column.minWidth = 200;
      } else if (column.key === 'name') {
        column.onRender = (item) => <Link data-selection-invoke={true}>{item.name}</Link>;
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
  }
}

const _copyAndSort = (items, columnKey, isSortedDescending) => {
  const key = columnKey;
  return items.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}