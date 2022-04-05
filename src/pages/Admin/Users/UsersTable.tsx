import React , { useState } from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, Link, SelectionMode, TooltipHost, FontIcon, Stack } from '@fluentui/react';
import { UserItem, SortDirection, NullHandling, PageableInput, WebCommand, } from 'src/data/services/graphql';
import { UsersTableColumns, useUsersTableColumns } from './UsersTableColumn';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { Spacing } from 'src/components/spacings/Spacing';

type UsersTableType = {
  users: UserItem[];
  onClickUser: (userSid: string) => any;
  tableFilters?: TableFiltersType;
};

const cols: UsersTableColumns[] = [
  UsersTableColumns.FIRST_NAME,
  UsersTableColumns.LAST_NAME,
  UsersTableColumns.EMAIL            
]

export const UsersTable = ({ users, onClickUser, tableFilters}: UsersTableType) => {
  
  const _doSort = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol) => column.key === currCol.key)[0];
    let sortParam: PageableInput = {}
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        sortParam = {
          pageNumber: 0,
          pageSize: 100,
          sort: [
            {
              property: currColumn.key,
              direction: currColumn.isSortedDescending ? SortDirection.Desc : SortDirection.Asc,
              nullHandling: NullHandling.NullsFirst,
              ignoreCase: true,
            },
          ],
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    setColumns(newColumns);
    tableFilters?.setPagingParams(sortParam);
  };

  const { initialColumns } = useUsersTableColumns(cols, _doSort);

  const [columns, setColumns] = useState<IColumn[]>(initialColumns);

  const onRenderItemColumn = (node?: UserItem, itemIndex?: number, column?: IColumn) => {
    let columnVal: string | undefined;
    if (column?.key === 'email') {
      columnVal = node?.item?.email;
    } else if (column) {
      let personProp;
      const person = node?.item?.person;
      if (person) {
        personProp = person[column?.key];
      }
      columnVal = node?.item[column?.key] || personProp;
    } else {
      columnVal = '';
    }

    return (
      <>
        <Stack horizontal horizontalAlign='start' tokens={{childrenGap: 10}}>
          <Link
            id={`__ActiveUsersPage__${column?.key}_${(itemIndex ?? 0) + 1}`}
            onClick={() => {
              if (node) {
                onClickUser(node?.item?.sid);
              }
            }}
          >
            {columnVal}
          </Link>
          {(column?.key === 'email') && (
            <>
              {node?.notificationOnlyUser && (
                <TooltipHost content={'This is a notification only user and cannot login to the CDX Dashboard.'} id={'NotificationOnlyUser-Tooltip'}>          
                  <FontIcon style={{color: 'black', fontSize:'18px', cursor: 'pointer'}}  aria-describedby={'NotificationOnlyUser-Icon'} iconName="BlockContact" />
                </TooltipHost>
              )}
              {node?.expiredActivation && (
                <TooltipHost content={'An account activation or password reset was requested, but has since expired. A password reset must be requested again.'} id={'ExpiredActivation-Tooltip'}>          
                  <FontIcon style={{color: 'red', fontSize:'18px', cursor: 'pointer'}} aria-describedby={'ExpiredActivation-Icon'} iconName="UserOptional" />
                </TooltipHost>
              )}
              {node?.pendingActivation && (
                <TooltipHost content={'An account activation or password reset is pending.'} id={'PendingActivation-Tooltip'}>          
                  <FontIcon  style={{color: 'green', fontSize:'18px', cursor: 'pointer'}} aria-describedby={'PendingActivation-Icon'} iconName="UserOptional" />
                </TooltipHost>           
              )}
              {node?.accountLocked &&(               
                <TooltipHost content={'This user account is locked.'} id={'AccountLocked-Tooltip'}>          
                  <FontIcon  style={{color: 'red', fontSize:'18px', cursor: 'pointer'}}  aria-describedby={'AccountLocked-Icon'} iconName="ProtectRestrict" />
                </TooltipHost>            
              )}
            </>
          )}
        </Stack>
      </>
    );
  };

  return (
    <DetailsList
      items={users}
      columns={columns}
      layoutMode={DetailsListLayoutMode.justified}
      onRenderItemColumn={onRenderItemColumn}
      selectionMode={SelectionMode.none}
      isHeaderVisible
    />
  );
};
