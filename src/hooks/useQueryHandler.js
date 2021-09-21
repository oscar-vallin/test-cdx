/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLogoutUseCase } from '../use-cases/Authentication';
import { useNotification } from './useNotification';
import { useOrgSid } from './useOrgSid';

export const useQueryHandler = (lazyQuery) => {
  const Toast = useNotification();
  const { orgSid } = useOrgSid();
  const { performUserLogout } = useLogoutUseCase();

  const [callback, { data, loading, error }] = lazyQuery();

  // const query = (params) =>
  //   callback({
  //     variables: { orgSid, ...params },
  //   });

  useEffect(() => {
    if (error) {
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
