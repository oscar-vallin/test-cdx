/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLogoutUseCase } from '../use-cases/Authentication';

export const useQueryHandler = (lazyQuery) => {
  const { performUserLogout } = useLogoutUseCase();

  const [callback, { data, loading, error }] = lazyQuery();

  useEffect(() => {
    if (error) {
      const { extensions = null } = error?.graphQLErrors.shift();

      if (extensions) {
        if (extensions.errorSubType === 'NEED_AUTH') {
          setTimeout(performUserLogout, 3000);
        }
      }
    }
  }, [error]);

  return [callback, { data, loading, error }];
};
