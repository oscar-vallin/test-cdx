import {
  DetailsList, DetailsListLayoutMode, IColumn, IconButton, SelectionMode, Stack,
} from '@fluentui/react';
import { SubscriberOptionProps } from 'src/pages/Admin/XChange/XchangeAlerts/XchangeAlertsPanel/XchangeAlertsPanel';
import { ButtonLink } from '../buttons';

type UserListProps = {
    currentSubscribers: SubscriberOptionProps[];
    totalSubscribers: (data: SubscriberOptionProps[]) => void;
}
const SubscribersList = ({ totalSubscribers, currentSubscribers }: UserListProps) => {
  const removeSubscriber = (removeBySid: string) => {
    totalSubscribers(
      currentSubscribers.filter((user: SubscriberOptionProps) => user.sid !== removeBySid),
    );
  };
  const onRenderAction = (item: any, index?: number) => <IconButton id={`Remove_Subscriber_${index}`} iconProps={{ iconName: 'Trash' }} onClick={() => removeSubscriber(item.sid)} />;

  const columns: IColumn[] = [
    {
      name: '',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      isPadded: true,
      minWidth: 180,
      maxWidth: 600,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'email',
      fieldName: 'email',
      data: 'string',
      isPadded: true,
      minWidth: 180,
      maxWidth: 400,
      flexGrow: 1,
    },
    {
      name: '',
      key: 'actions',
      fieldName: 'actions',
      data: 'string',
      isPadded: true,
      minWidth: 50,
      maxWidth: 50,
      onRender: onRenderAction,
    },
  ];

  const onRenderItemColum = (item, index, column) => {
    let columnVal: string | undefined;
    if (column?.key === 'name') {
      columnVal = item?.name;
    } else if (column?.key === 'email') {
      columnVal = item?.email;
    }
    return (
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        <ButtonLink id={`Subscriber_${index}`}>{columnVal}</ButtonLink>
      </Stack>
    );
  };

  return (
    <DetailsList
      items={currentSubscribers ?? []}
      columns={columns}
      selectionMode={SelectionMode.none}
      onRenderItemColumn={onRenderItemColum}
      layoutMode={DetailsListLayoutMode.justified}
      isHeaderVisible
    />
  )
};

export { SubscribersList };
