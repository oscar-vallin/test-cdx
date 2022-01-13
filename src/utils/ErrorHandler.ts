import { useNotification } from '../hooks/useNotification';
import { useApplicationStore } from '../store/ApplicationStore';
import { useLogoutUseCase } from '../use-cases/Authentication';

export const ErrorHandler = () => {
  const Toast = useNotification();
  const ApplicationStore = useApplicationStore();
  const { performUserLogout } = useLogoutUseCase();

  return (error?: any) => {
    if (error) {
      if (error?.networkError?.statusCode === 403) {
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
  };
};
