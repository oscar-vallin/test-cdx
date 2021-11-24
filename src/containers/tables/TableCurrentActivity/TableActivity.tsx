import { ReactElement } from 'react';
import { IColumn, DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { format } from 'date-fns';
import { Column } from '../../../components/layouts';
import { TableName, TableWrap } from './TableActivity.styles';
import { OrganizationLink } from '../../../data/services/graphql';

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
    onRender: (itm: OrganizationLink) => {
      return format(new Date(itm.activityTime), 'MM/dd/yyyy hh:mm a');
    },
  },
];

const defaultProps = {
  id: '',
  loading: false,
  tableName: '',
  color: '',
};

type TableActivityProps = {
  id?: string;
  items: OrganizationLink[];
  loading: boolean;
  tableName?: any;
  color?: any;
} & typeof defaultProps;

const TableActivity = ({ id, items, loading, tableName, color }: TableActivityProps): ReactElement => {
  return (
    <TableWrap id={id}>
      <Column>
        <TableName variant="bold" color={color}>
          {tableName}
        </TableName>
      </Column>
      <Column>
        {!loading ? (
          <DetailsList
            items={items}
            selectionMode={SelectionMode.none}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible
          />
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
