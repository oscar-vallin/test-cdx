import React from 'react';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar } from 'office-ui-fabric-react';
import { Row, Column } from '../../../components/layouts';
import { TableName, StyledBox } from './TableActivity.style';

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

const onRenderItemColumn = (item, index, column) => {
  switch (column.key) {
    case 'tmpl':
      return <FontIcon iconName={item.tmpl ? 'CheckMark' : 'Cancel'} />;
    default:
      return item[column.key];
  }
};

const TableActivity = ({ id = 'TableActivity', tableName, data, color }) => {
  const columns = generateColumns();

  return (
    // <StyledBox id={id}>
    <Row>
      <Column>
        <TableName variant="bold" color={color}>
          {tableName}
        </TableName>
      </Column>
      <Column>
        {/* {!loading ? (
      groups.length > 0 ? ( */}
        <DetailsList
          items={data}
          selectionMode={SelectionMode.none}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          onRenderItemColumn={onRenderItemColumn}
          isHeaderVisible
        />
        {/* ) : (
        <MessageBar>No groups added</MessageBar>
      )
    ) : (
      <Spinner label="Loading groups" />
    )} */}
      </Column>
    </Row>
    // </StyledBox>
  );
};

export { TableActivity };
