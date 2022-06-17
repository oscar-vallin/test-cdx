import { ReactElement } from 'react';
import { IColumn, DetailsListLayoutMode, SelectionMode, Spinner, DetailsList } from '@fluentui/react';
import { format } from 'date-fns';
import { Column } from 'src/components/layouts';
import { OrganizationLink } from 'src/data/services/graphql';
import { ButtonLink } from 'src/components/buttons';
import { TableName, TableWrap, EmptyMessage } from './TableActivity.styles';

type TableActivityProps = {
  id?: string;
  items: OrganizationLink[];
  loading: boolean;
  tableName?: string;
  color: string;
  emptyMessage: string;
  onClick: (orgSid: string) => void;
};

const TableActivity = ({
  id,
  items,
  loading,
  tableName,
  color,
  emptyMessage,
  onClick,
}: TableActivityProps): ReactElement => {
  const renderOrgName = (item: OrganizationLink) => {
    return (
      <ButtonLink
        onClick={() => {
          onClick(item.id);
        }}
      >
        {item.name}
      </ButtonLink>
    );
  };

  const renderLastActivity = (item: OrganizationLink) => {
    return (
      <ButtonLink
        onClick={() => {
          onClick(item.id);
        }}
      >
        {format(new Date(item.activityTime), 'MM/dd/yyyy hh:mm a')}
      </ButtonLink>
    );
  };

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
      onRender: renderOrgName,
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
      onRender: renderLastActivity,
    },
  ];

  const renderBody = () => {
    if (loading) {
      return <Spinner label="Loading Activity" />;
    }
    if (items.length > 0) {
      return (
        <DetailsList
          items={items}
          selectionMode={SelectionMode.none}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
        />
      );
    }
    return <EmptyMessage>{emptyMessage}</EmptyMessage>;
  };

  return (
    <TableWrap id={id}>
      <Column>
        <TableName variant="bold" color={color}>
          {tableName}
        </TableName>
      </Column>
      <Column>{renderBody()}</Column>
    </TableWrap>
  );
};

export { TableActivity };
export default TableActivity;
