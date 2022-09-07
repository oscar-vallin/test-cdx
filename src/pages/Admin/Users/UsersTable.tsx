import React from 'react';
import {
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  TooltipHost,
  FontIcon,
  Stack,
  DetailsList,
} from '@fluentui/react';
import { UserItem, UserConnectionTooltips } from 'src/data/services/graphql';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { useThemeStore } from 'src/store/ThemeStore';
import { ButtonLink } from 'src/components/buttons';
import { useSortableColumns } from 'src/containers/tables/useSortableColumns';
import { UsersTableColumns, useUsersTableColumns } from './UsersTableColumn';

type UsersTableType = {
  users: UserItem[];
  onClickUser: (userSid: string) => any;
  tableFilters: TableFiltersType;
  tooltips?: UserConnectionTooltips;
  searchAllOrgs?: boolean;
};

const cols: UsersTableColumns[] = [UsersTableColumns.FIRST_NAME, UsersTableColumns.LAST_NAME, UsersTableColumns.EMAIL];

const searchAllOrgsCols: UsersTableColumns[] = [...cols, UsersTableColumns.ORGANIZATION];

export const UsersTable = ({
  users, onClickUser, tableFilters, tooltips, searchAllOrgs,
}: UsersTableType) => {
  const ThemeStore = useThemeStore();

  const { initialColumns } = useUsersTableColumns(cols);
  const { initialColumns: allOrgsInitColumns } = useUsersTableColumns(searchAllOrgsCols);

  const { columns } = useSortableColumns(tableFilters, initialColumns());
  const { columns: allOrgColumns } = useSortableColumns(tableFilters, allOrgsInitColumns());

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
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
        <ButtonLink
          id={`__ActiveUsersPage__${column?.key}_${(itemIndex ?? 0) + 1}`}
          onClick={() => {
            if (node) {
              onClickUser(node?.item?.sid);
            }
          }}
        >
          {columnVal}
        </ButtonLink>
        {column?.key === 'email' && (
          <>
            {node?.notificationOnlyUser && !node?.pendingActivation && !node?.expiredActivation && (
              <TooltipHost content={tooltips?.notificationOnlyUser ?? ''}>
                <FontIcon
                  style={{ color: ThemeStore.userTheme.colors.black, fontSize: '18px', cursor: 'pointer' }}
                  aria-describedby="NotificationOnlyUser-Icon"
                  iconName="BlockContact"
                />
              </TooltipHost>
            )}
            {node?.expiredActivation && (
              <TooltipHost content={tooltips?.expiredActivation ?? ''} id="ExpiredActivation-Tooltip">
                <FontIcon
                  style={{ color: ThemeStore.userTheme.colors.custom.error, fontSize: '18px', cursor: 'pointer' }}
                  aria-describedby="ExpiredActivation-Icon"
                  iconName="UserOptional"
                />
              </TooltipHost>
            )}
            {node?.pendingActivation && (
              <TooltipHost content={tooltips?.pendingActivation ?? ''} id="PendingActivation-Tooltip">
                <FontIcon
                  style={{ color: ThemeStore.userTheme.colors.custom.success, fontSize: '18px', cursor: 'pointer' }}
                  aria-describedby="PendingActivation-Icon"
                  iconName="UserOptional"
                />
              </TooltipHost>
            )}
            {node?.accountLocked && (
              <TooltipHost content={tooltips?.accountLocked ?? ''} id="AccountLocked-Tooltip">
                <FontIcon
                  style={{ color: ThemeStore.userTheme.colors.custom.error, fontSize: '18px', cursor: 'pointer' }}
                  aria-describedby="AccountLocked-Icon"
                  iconName="ProtectRestrict"
                />
              </TooltipHost>
            )}
          </>
        )}
      </Stack>
    );
  };

  return (
    <DetailsList
      items={users}
      columns={searchAllOrgs ? allOrgColumns : columns}
      layoutMode={DetailsListLayoutMode.justified}
      onRenderItemColumn={onRenderItemColumn}
      selectionMode={SelectionMode.none}
      isHeaderVisible
    />
  );
};
