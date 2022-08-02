import React from 'react';
import { IColumn } from '@fluentui/react';
import { format } from 'date-fns';
import { UserAccount, UserAccountAuditEvent, UserAccountAuditLog } from 'src/data/services/graphql';
import { DataColumn } from 'src/containers/tables';
import { prettyEnumValue } from 'src/utils/CDXUtils';

export enum UserAuditLogsColumn {
  DATETIME,
  USER,
  EVENT_TYPE,
  CHANGED_BY,
  NEW_VALUE,
  OLD_VALUE,
}

export const useUserAuditLogsColumns = (selectedColumns: UserAuditLogsColumn[]) => {
  const getUserAccountAuditFormat = (userAccount?: UserAccount | null) => {
    if (userAccount && userAccount.person) {
      return `${userAccount.person.firstNm} ${userAccount.person.lastNm} <${userAccount.email}> `;
    }
    return '';
  };

  const columnOptions: DataColumn[] = [
    {
      key: 'auditDateTime',
      name: 'Date/Time',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 150,
      fieldName: 'auditDateTime',
      isPadded: true,
      data: UserAuditLogsColumn.DATETIME,
      dataType: 'date',
      sortable: true,
      filterable: false,
      onRender: (item: UserAccountAuditLog) => {
        const timestamp = format(new Date(item.auditDateTime), 'MM/dd/yyyy hh:mm a');
        return <span>{timestamp}</span>;
      },
    },
    {
      key: 'userAccount',
      name: 'User / Work Packet',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 200,
      fieldName: 'userAccount',
      isPadded: true,
      data: UserAuditLogsColumn.USER,
      dataType: 'string',
      sortable: false,
      filterable: false,
      onRender: (item?: UserAccountAuditLog) => {
        if (item?.event === UserAccountAuditEvent.ArchiveAccess) {
          return <span title={item?.workOrderId ?? undefined}>{item?.workOrderId}</span>;
        }
        const name = getUserAccountAuditFormat(item?.userAccount);
        return <span title={name}>{name}</span>;
      },
    },
    {
      key: 'event',
      name: 'Event',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 100,
      fieldName: 'event',
      isPadded: true,
      data: UserAuditLogsColumn.EVENT_TYPE,
      dataType: 'string',
      sortable: true,
      filterable: false,
      onRender: (item?: UserAccountAuditLog) => (
        <span title={prettyEnumValue(item?.event)}>{prettyEnumValue(item?.event)}</span>
      ),
    },
    {
      key: 'changedByUserAccount',
      name: 'Changed By',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 200,
      fieldName: 'changedByUserAccount',
      isPadded: true,
      data: UserAuditLogsColumn.CHANGED_BY,
      dataType: 'string',
      sortable: false,
      filterable: false,
      onRender: (item?: UserAccountAuditLog) => {
        if (item?.changedByUserAccount && item?.changedByUserAccount.sid !== item?.userAccount?.sid) {
          const name = getUserAccountAuditFormat(item.changedByUserAccount);
          return <span title={name}>{name}</span>;
        }
        return <span>Self</span>;
      },
    },
    {
      key: 'newValue',
      name: 'New Value',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 200,
      fieldName: 'newValue',
      isPadded: true,
      data: UserAuditLogsColumn.NEW_VALUE,
      dataType: 'string',
      sortable: false,
      filterable: false,
      onRender: (item: UserAccountAuditLog) => {
        return <span title={item.newValue ?? undefined}>{item.newValue}</span>;
      },
    },
    {
      key: 'oldValue',
      name: 'Old Value',
      targetWidthProportion: 1,
      minWidth: 80,
      fieldName: 'oldValue',
      isPadded: true,
      data: UserAuditLogsColumn.OLD_VALUE,
      dataType: 'string',
      sortable: false,
      filterable: false,
      onRender: (item: UserAccountAuditLog) => {
        return <span title={item.oldValue ?? undefined}>{item.oldValue}</span>;
      },
    },
  ];

  const initialColumns = (): DataColumn[] => {
    const initCols: DataColumn[] = [];
    selectedColumns.forEach((sCol: UserAuditLogsColumn) => {
      const matching = columnOptions.find((colOpt: IColumn) => {
        return colOpt.data === sCol;
      });
      if (matching != null) {
        initCols.push(matching);
      }
    });
    return initCols;
  };

  return {
    initialColumns,
  };
};
