# TABLE COMPONENT DOCUMENTATION

- [Purpose](#purpose)
- [Props](#props)
  - [Items - items](#items)
  - [Structure - structure](#structure)
  - [Loading - loading](#loading)
  - [on Click Option - onOption](#onclick)
- [Next](#next)

## PURPOSE <a name="purpose"></a>

This table component renders all the tables currently in the project. Applying different styles presented in the design in Figma. Currently still under construction as it is only configured for dashboard tables.

## PROPS <a name="props"></a>

```jsx
<Table items={tableData} structure={getTableStructure(tableId)} loading={loading} onOption={() => onChangeOption()} />
```

### Items - items <a name="items"></a>

Items argument is an array of objects of equal dimensions will be passed in which the key contains, it will be the identifier of the column, and the value will be the data that will be placed in the cell for each of the rows (objects within the array ).

The default column, that is, any column that is not with the name configured inside the component in the function:

```js
const _renderItemColumn = (item, index, column) => {
    const fieldContent = item[column.fieldName];

    switch (column.key) {
      case 'bus':
        return <StyledText right>{fieldContent}</Style
    }
}
```

Depending on the name of the column according to the Items argument, that is, if the key has a particular style that can be configured in a different way from the name.

### Structure - structure <a name="structure"></a>

The structure argument defines how the header will be defined when rendering the table. Internally, the table renders the TableHeader component, to modify it must be included in the component internally other possible headers, or in the TableHeader component.

```jsx
const _onRenderTableHeader = () => {
  if (structure.header.type === 'dashboard' && !sortLabel) {
    setSortLabel('Vendor');

    setSortedItems(_copyAndSort(sortedItems, columns[0]?.fieldName, false));
  }

  return <TableHeader header={structure.header} sortLabel={sortLabel} onSort={_onSort} onOption={_onShowSpecs} />;
};
```

To correctly define the structure of the tables it is found in the constants file and the function that brings this information must be imported.

```jsx
import {getTableStructure} from '../../../data/constants/TableConstants';

structure = {getTableStructure (tableId)}
```

Below is an example of how the structure should be configured in the table of records. In the array, you configure a name or identifier for the table.

```js
DASHBOARD_TRANSMISSIONS_VENDOR: 'TRANSMISSIONS_VENDOR',
```

This identifier will be used for the following table:

```js
export const TABLES = {
  DEFAULT: {
    header: {},
  },
  TRANSMISSIONS_VENDOR: {
    header: {
      type: 'dashboard',
      title: 'Transmissions / BUS by Vendor',
      url: './transmissions',
      buttons: ['Sort', 'Specs'],
    },
  },
};
```

As in this table, the type of table appears, the title of the table, the url that will be accessed if the header has a link, and the names of the buttons in the header.

### Loading - loading <a name="loading"></a>

The "loading" argument gives the component the flag to know if the component's state is in the loading state.

### on Click Option - onOption <a name="onclick"></a>

Function that will be called in the event that any of the items is linked or clicked on.

---

## NEXT <a name="next"></a>

The configuration and the styles must be defined in the items and in its json itself; so it is required to change the way this component is called.

This can also be done through a render component that would be a list of rows previously created from the parent container or component.
