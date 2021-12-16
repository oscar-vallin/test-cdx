/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useApplicationStore } from '../store/ApplicationStore';
import { useLogoutUseCase } from '../use-cases/Authentication';
import { useNotification } from './useNotification';

export const useQueryHandler = (lazyQuery) => {
  const Toast = useNotification();
  const ApplicationStore = useApplicationStore();
  const { performUserLogout } = useLogoutUseCase();

  const [callback, { data, loading, error }] = lazyQuery();

  useEffect(() => {
    if (error) {
      if (error?.networkError?.statusCode == 403) {
        Toast.error({ text: 'Your session has expired please login again.' });

        setTimeout(performUserLogout, 3000);
      } else {
        const { message } = error;
        const { extensions = null } = error?.graphQLErrors?.shift() || {};

        if (extensions) {
          if (extensions.errorSubType === 'NEED_AUTH') {
            Toast.error({ text: message });

            setTimeout(performUserLogout, 3000);
          }
        } else if (message === 'Failed to fetch') {
          ApplicationStore.setIsOffline(true);
        } // TODO: else add generic "unknown error" to the application store
      }
    }
  }, [error]);

  return [callback, { data, loading, error }];
};
