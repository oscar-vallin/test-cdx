import React from 'react';
import { IColumn, Link } from '@fluentui/react';
import { format } from 'date-fns';
import {
  UserAccountAuditLog,
  UserAccount
} from 'src/data/services/graphql';
import { getEventTypeName } from './UserAuditLogsTable';

export enum UserAuditLogsColumn {
    DATETIME,
    USER,
    EVENT_TYPE,
    CHANGED_BY,
    NEW_VALUE,
    OLD_VALUE
}

export const useUserAuditLogsColumns = (
  selectedColumns: UserAuditLogsColumn[],
  onSort?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void
) => {

  const getUserAccountAuditFormat =(userAccount: UserAccount)=>{
    if(userAccount && userAccount.person){
        return `${userAccount.person.firstNm} ${userAccount.person.lastNm} <${userAccount.email}> `
    }else{
        return ''
    }
  }

  const columnOptions: IColumn[] = [
    {
        key: 'auditDateTime',
        name: 'Date/Time',
        targetWidthProportion: 1,
        minWidth: 80,
        maxWidth: 200,
        fieldName: 'auditDateTime',
        isPadded: true,
        data: UserAuditLogsColumn.DATETIME,
        onColumnClick: onSort,
        onRender: (item: UserAccountAuditLog) => {
            const timestamp = format(new Date(item.auditDateTime), 'MM/dd/yyyy hh:mm a');
            return <span>{timestamp}</span>;
          },
    },
    {
        key: 'userAccount',
        name: 'User',
        targetWidthProportion: 1,
        minWidth: 80,
        maxWidth: 200,
        fieldName: 'userAccount',
        isPadded: true,
        data: UserAuditLogsColumn.USER,
        //onColumnClick: onSort,
        onRender: (item: UserAccountAuditLog) => {
            return <span>{getUserAccountAuditFormat(item.userAccount)}</span>;
        }
      },
      {
        key: 'event',
        name: 'Event',
        targetWidthProportion: 1,
        minWidth: 80,
        maxWidth: 200,
        fieldName: 'event',
        isPadded: true,
        data: UserAuditLogsColumn.EVENT_TYPE,
        onColumnClick: onSort,
        onRender: (item: UserAccountAuditLog) => <span>{getEventTypeName(item.event)}</span>
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
        //onColumnClick: onSort,
        onRender: (item: UserAccountAuditLog) => {
            if(item.changedByUserAccount && item.changedByUserAccount.sid !== item.userAccount.sid){
                return <span>{getUserAccountAuditFormat(item.changedByUserAccount)}</span>;
            }else{
                return <span>Self</span>
            }
        }
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
       
      },
      {
        key: 'oldValue',
        name: 'Old Value',
        targetWidthProportion: 1,
        minWidth: 80,
        fieldName: 'oldValue',
        isPadded: true,
        data: UserAuditLogsColumn.OLD_VALUE,
       
      },
  ];

  const initialColumns = (): IColumn[] => {
    const initCols: IColumn[] = [];
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
