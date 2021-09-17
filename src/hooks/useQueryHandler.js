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
      /* TODO: Migrate to error handler */
      const { extensions = null, message = 'An error occurred while perform this operation. Please, try again.' } =
        error?.graphQLErrors.shift();

      if (extensions) {
        switch (extensions.errorSubType) {
          case 'NEED_AUTH':
            Toast.error({ text: message });

            setTimeout(performUserLogout, 3000);
            break;
          default:
            Toast.error({ text: message });
        }
      }
    }
  }, [error]);

  return [callback, { data, loading, error }];
};
