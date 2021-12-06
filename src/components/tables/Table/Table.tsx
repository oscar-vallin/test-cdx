/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'office-ui-fabric-react/lib-commonjs/Link';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib-commonjs/Styling';
import { format } from 'date-fns';

import {
  ColumnActionsMode,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  buildColumns,
  DetailsHeader,
  IColumn,
} from 'office-ui-fabric-react/lib-commonjs/DetailsList';
import { EmptyState } from 'src/containers/states';
import { SpinnerSize } from '@fluentui/react';
import { StyleConstants } from '../../../data/constants/StyleConstants';
import { getDates } from '../../../helpers/tableHelpers.service';
import { Spinner } from '../../spinners/Spinner';

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
  StyledSpacing,
} from './Table.styles';

import { TableHeader } from '../TableHeader';
import { useOrgSid } from '../../../hooks/useOrgSid';

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

    if (column.key === 'thumbnail') {
      column.iconName = 'Picture';
      column.isIconOnly = true;
    } else if (column.key === 'description') {
      column.isMultiline = true;
    } else if (column.key === 'key') {
      column.columnActionsMode = ColumnActionsMode.disabled;
      column.onRender = ({ key }) => (
        <Link className={classNames?.root} href="https://microsoft.com" target="_blank" rel="noopener">
          {key}
        </Link>
      );
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
  structure?: any;
  onOption?: any | null;
  groups?: any;
  searchInput?: any;
  date?: any;
  onItemsListChange?: any | null;
  loading?: boolean;
  title?: string;
  emptyMessage?: string;
} & typeof defaultProps;

const Table = ({
  items,
  columns,
  structure,
  onOption,
  groups,
  searchInput,
  date,
  onItemsListChange,
  loading = true,
  title,
  emptyMessage = 'No data',
}: TableProps): ReactElement => {
  const { orgSid } = useOrgSid();

  const [sortLabel, setSortLabel] = useState<string | undefined>();
  const [sortedItems, setSortedItems] = useState([]);
  const [sortedGroups, setSortedGroups] = useState();
  const [tablecolumns, setColumns] = useState<IColumn[]>();
  const [filterInput, setFilterInput] = useState(searchInput);
  const [option, setOption] = useState(false);
  const [sort, setSort] = useState('asc');
  const totalPages = 1;

  const [currentKeySort, setCurrentKeySort] = useState('datetime');
  const [isHovering, setIsHovering] = useState(false);
  const [currentHover, setCurrentHover] = useState(null);

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

  const handleMouseOver = (key) => {
    setCurrentHover(key);
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setCurrentHover(null);
    setIsHovering(false);
  };

  //
  // Render Item Column
  //
  const _renderItemColumn = (item, index, column) => {
    const { fieldName } = column;
    // eslint-disable-next-line react/destructuring-assignment
    const fieldContent = item[fieldName];
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
                <RouteLink to={`${fieldItem.text}?filter=${filterInput}&orgSid=${orgSid}`}>{fieldContent}</RouteLink>
              </Link>
              {fieldItem.child.value}
            </CellItemRow>
          );
        }

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

      case 'vendor':
        if (isTableArchive) {
          return (
            <StyledCell left>
              <span>{fieldContent}</span>
            </StyledCell>
          );
        }

        {
          const formatDatesURL = 'yyyy-MM-dd';
          const startFormatted = format(getDates(date).startDate, formatDatesURL);
          const endFormatted = format(getDates(date).endDate, formatDatesURL);

          return (
            <StyledCell left>
              <Link>
                <RouteLink
                  to={`/file-status?filter=${fieldContent}&orgSid=${orgSid}&startDate=${startFormatted}&endDate=${endFormatted}`}
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
        return <span id="__defaultCaseNode">{fieldContent}</span>;
    }

    return <span>{fieldContent}</span>;
  };

  // * Click on Row.
  const _onItemInvoked = () => null;

  //
  const _onSort = (key) => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
    setCurrentKeySort(key);
    if (structure.header.type === 'dashboard') {
      setSortLabel(sortLabel === 'Vendor' ? 'BUs' : 'Vendor');

      setSortedItems(_copyAndSort(sortedItems, columns[sortLabel === 'Vendor' ? 1 : 0].fieldName, false));
    } else if (structure.header.type === 'file_status' && key !== 'progress') {
      if (totalPages === 1) {
        setSortedItems(_copyAndSort(sortedItems, key, sort !== 'asc'));
      } else {
        // eslint-disable-next-line no-alert
        alert('Sorting unavailable for a multi-page table');
      }
    }

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
    if (structure.header.type === 'dashboard' && !sortLabel) {
      setSortLabel('Vendor');

      setSortedItems(_copyAndSort(sortedItems, columns[0]?.fieldName, false));
    } else if (structure.header.type === 'file_status') {
      return (
        <DetailsHeader
          {...props}
          onColumnClick={(_ev, column) => _onSort(column.key)}
          onRenderColumnHeaderTooltip={(_props) => {
            if (_props?.column?.key === 'progress') {
              return _props.children;
            }

            if (_props?.column?.key === currentKeySort) {
              return (
                <StyledMenuButton
                  id={_props.column.name.replaceAll(' ', '__')}
                  onClick={() => _onSort(_props?.column?.key)}
                  icon={sort}
                  disabled={false}
                >
                  {_props.children}
                </StyledMenuButton>
              );
            }

            return (
              <div
                id="__onRenderTableHeaderId"
                onMouseOver={() => handleMouseOver(_props?.column?.key)}
                onMouseOut={handleMouseOut}
                onFocus={() => null}
                onBlur={() => null}
              >
                {isHovering && currentHover === _props?.column?.key ? (
                  <StyledMenuIcon id="" icon="sort" onClick={() => _onSort(_props?.column?.key)} disabled={false}>
                    {_props.children}
                  </StyledMenuIcon>
                ) : (
                  <StyledMenuButton
                    id={_props?.column?.name.replaceAll(' ', '__') ?? ''}
                    icon={sort}
                    onClick={() => _onSort(_props?.column?.key)}
                    disabled={false}
                  >
                    {_props?.children}
                  </StyledMenuButton>
                )}
              </div>
            );
          }}
        />
      );
    }

    return (
      <TableHeader
        id="header"
        header={structure.header}
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

    if (loading) {
      return (
        <StyledSpacing margin={{ top: 'double' }}>
          <Spinner size={StyleConstants.SPINNER_LARGE} label="Loading data" />
        </StyledSpacing>
      );
    }

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

    return <EmptyState title={title} description={emptyMessage} />;
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

    if (loading) {
      return (
        <StyledSpacing margin={{ top: 'double' }}>
          <Spinner size={StyleConstants.SPINNER_LARGE} label="Loading data" />
        </StyledSpacing>
      );
    }

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
          onRenderDetailsHeader={structure.header.type === 'file_status' ? _onRenderTableHeader : undefined}
          onRenderItemColumn={_renderItemColumn}
          groups={sortedGroups}
        />
      );
    }

    return <EmptyState description={emptyMessage} />;
  };

  if (sortedItems)
    if (structure.header.type === 'dashboard') {
      return (
        <StyledContainer id="Table_Detailed" style={{ width: '100%' }}>
          {renderSortedItem()}
        </StyledContainer>
      );
    }

  return (
    <StyledContainer id="Table_Detailed" style={{ width: '100%' }}>
      {renderItem()}
    </StyledContainer>
  );
};

Table.defaultProps = defaultProps;

export { Table };
