/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLogoutUseCase } from '../use-cases/Authentication';
import { useNotification } from './useNotification';

export const useQueryHandler = (lazyQuery) => {
  const Toast = useNotification();
  const { performUserLogout } = useLogoutUseCase();

  const [callback, { data, loading, error }] = lazyQuery();

  useEffect(() => {
    if (error) {
      const { extensions = null, message = 'An error occurred while perform this operation. Please, try again.' } =
        error?.graphQLErrors.shift();

      if (extensions) {
        if (extensions.errorSubType === 'NEED_AUTH') {
          Toast.error({ text: message });

          setTimeout(performUserLogout, 3000);
        } else {
          Toast.error({ text: message });
        }
      }
    }
  }, [error]);

  return [callback, { data, loading, error }];
};
