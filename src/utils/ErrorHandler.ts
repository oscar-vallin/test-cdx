import { useHistory } from 'react-router-dom';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { useSessionStore } from 'src/store/SessionStore';
import { useNotification } from 'src/hooks/useNotification';
import { useApplicationStore } from 'src/store/ApplicationStore';
import { useLogoutUseCase } from 'src/use-cases/Authentication';

export const ErrorHandler = () => {
  const Toast = useNotification();
  const SessionStore = useSessionStore();
  const ApplicationStore = useApplicationStore();
  const { performUserLogout } = useLogoutUseCase();
  const history = useHistory();

  return (error?: any) => {
    if (error) {
      if (error?.networkError?.statusCode === 403) {
        SessionStore.setGlobalError('Your session has expired please login again.');
        performUserLogout();
      } else {
        const { message } = error;
        const { extensions = null } = error?.graphQLErrors?.shift() || {};

        if (extensions) {
          if (extensions.errorSubType === 'NEED_AUTH') {
            SessionStore.setGlobalError(message);
            performUserLogout();
          } else if (extensions.errorSubType === 'INSUFFICIENT_PRIVILEGES') {
            history.push(ROUTES.ROUTE_UNAUTHORIZED.URL);
          } else {
            Toast.error({ text: 'An internal server error has occurred. Please contact your administrator.' });
          }
        } else if (message === 'Failed to fetch') {
          ApplicationStore.setIsOffline(true);
        } else {
          Toast.error({ text: 'An internal server error has occurred. Please contact your administrator.' });
        }
      }
    }
  };
};
