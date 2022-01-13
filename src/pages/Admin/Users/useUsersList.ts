import { ActiveEnum, UserItem, useUsersForOrgLazyQuery } from 'src/data/services/graphql';
import { useEffect, useState } from 'react';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useOrgSid } from 'src/hooks/useOrgSid';

export const useUsersLists = (activeFilter: ActiveEnum) => {
  const [users, setUsers] = useState<UserItem[] | null | undefined>([]);
  const { orgSid } = useOrgSid();
  const [apiUsersForOrgFpLazy, { data, loading, error }] = useUsersForOrgLazyQuery();
  const handleError = ErrorHandler();

  const fetchUsers = async () => {
    apiUsersForOrgFpLazy({
      variables: {
        orgSid,
        userFilter: { activeFilter },
      },
    });
  };

  useEffect(() => {
    fetchUsers().then();
  }, [orgSid]);

  useEffect(() => {
    handleError(error);
  }, [error]);

  useEffect(() => {
    if (!loading && data) {
      const users = data?.usersForOrg?.nodes ?? [];
      const items: UserItem[] = [];
      users.forEach((user) => {
        if (user) {
          items.push(user as UserItem);
        }
      });

      setUsers(items);
    }
  }, [loading]);

  return {
    users,
    loading,
    fetchUsers,
  };
};
