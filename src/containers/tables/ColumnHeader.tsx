import { useEffect } from 'react';
import {
  DefaultButton,
  IButtonStyles,
  IColumn,
  IContextualMenuItem,
  IContextualMenuListProps,
  IRenderFunction,
  SearchBox,
} from '@fluentui/react';
import { useDelayedInputValue } from 'src/hooks/useInputValue';
import { prettyEnumValue } from 'src/utils/CDXUtils';
import { FilterWrapper } from './ColumnHeader.styles';

// An extension of the Fluent UI IColumn
export interface DataColumn extends IColumn {
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'enum';
  // When dataType = enum, specify the enumeration here
  enumType?: any;
  sortable?: boolean;
  filterable?: boolean;
  onSortAsc?: () => void;
  onSortDesc?: () => void;
  tooltip?: string;
}

type ColumnHeaderType = {
  id: string;
  col: DataColumn;
  filterValue?: any;
  onFilter?: (filterValue: any) => void;
};

export const ColumnHeader = ({
  id, col, filterValue, onFilter,
}: ColumnHeaderType) => {
  const filterText = useDelayedInputValue('', 'Filter', filterValue, 'text');

  const menuItems: IContextualMenuItem[] = [];
  if (col.sortable) {
    let ascText: string;
    let descText: string;
    switch (col.dataType) {
      case 'number':
        ascText = 'Smaller to larger';
        descText = 'Larger to smaller';
        break;
      case 'date':
        ascText = 'Older to newer';
        descText = 'Newer to older';
        break;
      default:
        ascText = 'A to Z';
        descText = 'Z to A';
        break;
    }
    menuItems.push({
      key: 'sortAsc',
      className: `sort-asc-${col.fieldName}`,
      text: ascText,
      iconProps: {
        iconName: col.isSorted && !col.isSortedDescending ? 'CheckMark' : '',
      },
      onClick: col.onSortAsc,
    });
    menuItems.push({
      key: 'sortDesc',
      className: `sort-desc-${col.fieldName}`,
      text: descText,
      iconProps: {
        iconName: col.isSorted && col.isSortedDescending ? 'CheckMark' : '',
      },
      onClick: col.onSortDesc,
    });
  }
  if (col.filterable && col.dataType === 'enum' && col.enumType) {
    // Include enum filters
    if (col.sortable) {
      // Add a Separator
      menuItems.push({
        key: 'separator',
        text: '-',
      });
    }
    Object.keys(col.enumType).forEach((key, index) => {
      const value = col.enumType[key];
      const isChecked = filterValue === value.toString();
      menuItems.push({
        key: `enum-${index}`,
        className: `filter-enum-${key}`,
        text: prettyEnumValue(value),
        iconProps: {
          iconName: isChecked ? 'CheckMark' : '',
        },
        onClick: () => {
          if (onFilter) {
            if (isChecked) {
              onFilter(undefined);
              col.isFiltered = false;
            } else {
              onFilter(value.toString());
              col.isFiltered = true;
            }
          }
        },
      });
    });
  }

  useEffect(() => {
    if (onFilter) {
      const text = filterText.delayedValue;
      onFilter(text);
      col.isFiltered = text !== undefined && text?.trim().length > 0;
    }
  }, [filterText.delayedValue]);

  const renderTextFilter = () => {
    if (!col.filterable || col.dataType !== 'string') {
      return null;
    }
    return (
      <FilterWrapper>
        <SearchBox
          id={`${id}_filter`}
          placeholder="Filter"
          styles={{ root: { width: '100%' } }}
          iconProps={{ iconName: 'Filter' }}
          value={filterText.value}
          onChange={filterText.onChange}
          showIcon
          onClear={() => filterText.setValue('')}
        />
      </FilterWrapper>
    );
  };

  const renderMenuList = (
    menuListProps?: IContextualMenuListProps,
    defaultRender?: IRenderFunction<IContextualMenuListProps>,
  ) => (
    <div>
      {defaultRender && defaultRender(menuListProps)}
      {renderTextFilter()}
    </div>
  );

  const buttonStyles: IButtonStyles = {
    root: {
      border: 'none',
      background: 'none',
      padding: 0,
    },
    label: {
      textAlign: 'left',
      marginLeft: 0,
    },
  };

  const calloutStyles = {
    root: {
      marginTop: '6px',
      marginLeft: '-12px',
    },
  };

  return (
    <DefaultButton
      id={id}
      text={col.name}
      styles={buttonStyles}
      menuProps={{
        onRenderMenuList: renderMenuList,
        shouldFocusOnMount: true,
        items: menuItems,
        calloutProps: {
          styles: calloutStyles,
        },
      }}
      title={col.name}
      ariaLabel={col.name}
    />
  );
};
