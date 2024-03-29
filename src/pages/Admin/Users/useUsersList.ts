import {
  ActiveEnum,
  PaginationInfo,
  SortDirection,
  UserConnectionTooltips,
  UserItem,
  useUsersForOrgLazyQuery,
  WebCommand,
} from 'src/data/services/graphql';
import { useEffect, useState } from 'react';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';

export const useUsersLists = (activeFilter: ActiveEnum) => {
  const [users, setUsers] = useState<UserItem[] | null | undefined>([]);
  const [userSearchForm, setUserSearchForm] = useState<any>({});
  const [tooltips, setTooltips] = useState<UserConnectionTooltips>({});
  const [commands, setCommands] = useState<WebCommand[] | null | undefined>([]);
  const { orgSid } = useOrgSid();
  const [apiUsersForOrgFpLazy, { data, loading, error }] = useUsersForOrgLazyQuery();
  const [pagingInfo, setPagingInfo] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 100,
    totalElements: 0,
    totalPages: 0,
  });

  const handleError = ErrorHandler();

  const fetchUsers = async (
    sortParam?,
    lockedFilter?,
    pendingActivationFilter?,
    expiredActivationFilter?,
    searchAllOrgs?,
    searchText?,
    pageNumber = 0,
  ) => {
    const sort = sortParam || [
      { property: 'person.lastNm', direction: SortDirection.Asc },
      { property: 'person.firstNm', direction: SortDirection.Asc },
      { property: 'email', direction: SortDirection.Asc },
    ];
    apiUsersForOrgFpLazy({
      variables: {
        orgSid,
        userFilter: {
          activeFilter,
          lockedFilter,
          pendingActivationFilter,
          expiredActivationFilter,
          searchAllOrgs,
          searchText: searchText ?? null,
        },
        pageableInput: {
          sort,
          pageSize: 100,
          pageNumber,
        },
      },
    });
  };

  useEffect(() => {
    fetchUsers().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgSid]);

  useEffect(() => {
    handleError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (!loading && data) {
      const userNodes = data?.usersForOrg?.nodes ?? [];
      const items: UserItem[] = [];
      userNodes.forEach((user) => {
        if (user) {
          items.push(user as UserItem);
        }
      });

      // update the paging info
      const newPagingInfo = data?.usersForOrg?.paginationInfo;
      if (newPagingInfo) {
        setPagingInfo(newPagingInfo);
      }

      const toolTips = data?.usersForOrg?.toolTips;
      if (toolTips) {
        setTooltips(toolTips);
      }

      const newCommands: WebCommand[] = [];
      const listPageInfo = data?.usersForOrg?.listPageInfo;
      listPageInfo?.listItemBulkCommands?.forEach((cmd) => {
        if (cmd) {
          newCommands.push(cmd);
        }
      });
      listPageInfo?.listItemCommands?.forEach((cmd) => {
        if (cmd) {
          newCommands.push(cmd);
        }
      });
      listPageInfo?.pageCommands?.forEach((cmd) => {
        if (cmd) {
          newCommands.push(cmd);
        }
      });

      setUserSearchForm(data?.usersForOrg?.userSearchForm);
      setCommands(newCommands);
      setUsers(items);
    }
  }, [loading, data]);

  const onPageChange = (pageNumber: number) => {
    fetchUsers(pageNumber).then();
  };

  return {
    users,
    pagingInfo,
    onPageChange,
    commands,
    loading,
    fetchUsers,
    userSearchForm,
    tooltips,
  };
};
