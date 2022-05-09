import { ReactElement } from 'react';
import { IColumn, DetailsList, DetailsListLayoutMode, SelectionMode, Spinner, Link } from '@fluentui/react';
import { format } from 'date-fns';
import { Column } from 'src/components/layouts';
import { OrganizationLink } from 'src/data/services/graphql';
import { TableName, TableWrap, EmptyMessage } from './TableActivity.styles';

const defaultProps = {
  id: '',
  loading: false,
  tableName: '',
  color: '',
  emptyMessage: '(None)',
};

type TableActivityProps = {
  id?: string;
  items: OrganizationLink[];
  loading: boolean;
  tableName?: any;
  color?: any;
  emptyMessage: string;
  onClick: (orgSid: string) => void;
} & typeof defaultProps;

const TableActivity = ({ id, items, loading, tableName, color, emptyMessage, onClick }: TableActivityProps): ReactElement => {
  
  const columns: IColumn[] = [
    {
      name: 'Client Name',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      isPadded: true,
      minWidth: 225,
      maxWidth: 1000,
      targetWidthProportion: 1,
      flexGrow: 1,
      onRender: (item: OrganizationLink) => {
        return (
          <Link onClick={()=>{onClick(item.id)}}>{item.name}</Link>
        );
      }
    },
    {
      name: 'Last Activity',
      key: 'activityTime',
      fieldName: 'activityTime',
      data: 'string',
      isPadded: true,
      minWidth: 225,
      maxWidth: 1000,
      targetWidthProportion: 1,
      flexGrow: 1,
      onRender: (item: OrganizationLink) => {
        return (
          <Link onClick={()=>{onClick(item.id)}}>{format(new Date(item.activityTime), 'MM/dd/yyyy hh:mm a')}</Link>
        ) 
      },
    },
  ];

  return (
    <TableWrap id={id}>
      <Column>
        <TableName variant="bold" color={color}>
          {tableName}
        </TableName>
      </Column>
      <Column>
        {!loading ? (
          items.length > 0 ? (
            <DetailsList
              items={items}
              selectionMode={SelectionMode.none}
              columns={columns}
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible
            />
          ) : (
            <EmptyMessage>{emptyMessage}</EmptyMessage>
          )
        ) : (
          <Spinner label="Loading Activity" />
        )}
      </Column>
    </TableWrap>
  );
};

TableActivity.defaultProps = defaultProps;

export { TableActivity };
export default TableActivity;
