import React, { useState, useEffect } from 'react';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { Row, Column } from '../../../components/layouts';
import { TableName } from './TableActivity.style';

const generateColumns = () => {
  const createColumn = ({ name, key }) => ({
    name,
    key,
    fieldName: key,
    data: 'string',
    isPadded: true,
    minWidth: 225,
  });

  return [
    createColumn({ name: 'Client Id', key: 'id' }),
    createColumn({ name: 'Client Name', key: 'name' }),
    createColumn({ name: 'Last Activity', key: 'activity' }),
  ];
};

const TableActivity = ({ items, loading, tableName, color }) => {
  const columns = generateColumns();
  const [sortedItems, setSortedItems] = useState('initialState');

  useEffect(() => {
    if (loading === false) {
      _buildItems();
    }
  }, []);
  const _buildItems = () => {
    const iItems = items.map((rowItem) => {
      const objItem = {};

      rowItem.forEach((rowColItem) => {
        objItem[rowColItem.id] = rowColItem.value;
      });

      return objItem;
    });

    setSortedItems(iItems);
    return iItems;
  };

  return (
    <Row>
      <Column>
        <TableName variant="bold" color={color}>
          {tableName}
        </TableName>
      </Column>
      <Column>
        {loading === false ? (
          <DetailsList
            items={sortedItems}
            selectionMode={SelectionMode.none}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible
          />
        ) : (
          <Spinner label="Loading Activity" />
        )}
      </Column>
    </Row>
  );
};

export { TableActivity };
