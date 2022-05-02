import React, { useEffect, useState, useRef } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Link,
  SelectionMode,
  TooltipHost,
  FontIcon,
  Stack,
} from '@fluentui/react';
import {
  UserItem,
  SortDirection,
  NullHandling,
  PageableInput,
  UserConnectionTooltips,
} from 'src/data/services/graphql';
import { UsersTableColumns, useUsersTableColumns } from './UsersTableColumn';
import { TableFiltersType } from 'src/hooks/useTableFilters';

type UsersTableType = {
  users: UserItem[];
  onClickUser: (userSid: string) => any;
  tableFilters?: TableFiltersType;
  tooltips?: UserConnectionTooltips;
  searchAllOrgs?: Boolean;
};

const cols: UsersTableColumns[] = [UsersTableColumns.FIRST_NAME, UsersTableColumns.LAST_NAME, UsersTableColumns.EMAIL];

const searchAllOrgsCols: UsersTableColumns[] = [...cols, UsersTableColumns.ORGANIZATION];

export const UsersTable = ({ users, onClickUser, tableFilters, tooltips, searchAllOrgs }: UsersTableType) => {
  const _doSort = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = columnsRef?.current?.slice() ?? [];
    const currColumn: IColumn = newColumns.filter((currCol) => column.key === currCol.key)[0];
    let sortParam: PageableInput = {};
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

  const { initialColumns } = useUsersTableColumns(searchAllOrgs ? searchAllOrgsCols : cols, _doSort);

  const [columns, setColumns] = useState<IColumn[]>(initialColumns);
  // make columnsRef always have the current count
  // your "fixed" callbacks (doSort) can refer to this object whenever
  // they need the current value, unlike default behaviour where doSort callback used stale state value
  const columnsRef = useRef<IColumn[]>();
  columnsRef.current = columns;

  useEffect(() => {
    const { initialColumns } = useUsersTableColumns(searchAllOrgs ? searchAllOrgsCols : cols, _doSort);
    setColumns(initialColumns);
  }, [searchAllOrgs]);

  const onRenderItemColumn = (node?: UserItem, itemIndex?: number, column?: IColumn) => {
    let columnVal: string | undefined;
    if (column?.key === 'email') {
      columnVal = node?.item?.email;
    } else if (column?.key === 'organization') {
      columnVal = node?.orgName ?? '';
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
        <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
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
          {column?.key === 'email' && (
            <>
              {node?.notificationOnlyUser && !node?.pendingActivation && !node?.expiredActivation && (
                <TooltipHost content={tooltips?.notificationOnlyUser ?? ''}>
                  <FontIcon
                    style={{ color: 'black', fontSize: '18px', cursor: 'pointer' }}
                    aria-describedby={'NotificationOnlyUser-Icon'}
                    iconName="BlockContact"
                  />
                </TooltipHost>
              )}
              {node?.expiredActivation && (
                <TooltipHost content={tooltips?.expiredActivation ?? ''} id={'ExpiredActivation-Tooltip'}>
                  <FontIcon
                    style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                    aria-describedby={'ExpiredActivation-Icon'}
                    iconName="UserOptional"
                  />
                </TooltipHost>
              )}
              {node?.pendingActivation && (
                <TooltipHost content={tooltips?.pendingActivation ?? ''} id={'PendingActivation-Tooltip'}>
                  <FontIcon
                    style={{ color: 'green', fontSize: '18px', cursor: 'pointer' }}
                    aria-describedby={'PendingActivation-Icon'}
                    iconName="UserOptional"
                  />
                </TooltipHost>
              )}
              {node?.accountLocked && (
                <TooltipHost content={tooltips?.accountLocked ?? ''} id={'AccountLocked-Tooltip'}>
                  <FontIcon
                    style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                    aria-describedby={'AccountLocked-Icon'}
                    iconName="ProtectRestrict"
                  />
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
