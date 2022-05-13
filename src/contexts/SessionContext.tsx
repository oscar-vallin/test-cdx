/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, ReactNode, useEffect, createContext } from 'react';
import { useHistory } from 'react-router';
import { useStoreRehydrated } from 'easy-peasy';

import { useLocation } from 'react-router-dom';
import { LoadingPage } from 'src/pages/Loading/LoadingPage';
import { SessionStages } from '../store/SessionStore/SessionTypes';
import { useSessionStore } from '../store/SessionStore';

export const SessionContext = createContext<any>(() => {
  return null;
});

const defaultProps = {
  // children: '',
};

type SessionContextProviderProps = {
  children?: ReactElement | ReactNode | string;
} & typeof defaultProps;

export const SessionContextProvider = ({ children }: SessionContextProviderProps): ReactElement => {
  const history = useHistory();
  const SessionStore = useSessionStore();
  const isRehydrated = useStoreRehydrated();
  const location = useLocation();

  useEffect(() => {
    if (isRehydrated) {
      const stage = SessionStore.user.token ? SessionStages.LoggedIn : SessionStages.LoggedOut;

      SessionStore.setSessionStage(stage);
    }
  }, [isRehydrated, SessionStore.user.token]);

  useEffect(() => {
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    const params = new URLSearchParams(window.location.search);
    if (params.get('redirectUrl')) {
      SessionStore.setRedirectUrl(currentUrl);
    }
    if (isRehydrated && !SessionStore.user.token && location.pathname.indexOf('ua/password-reset') < 0) {
      history.push('/login');
    }
  }, [SessionStore.user.token, isRehydrated]);

  return <SessionContext.Provider value={null}>{!isRehydrated ? <LoadingPage /> : children}</SessionContext.Provider>;
};

SessionContextProvider.defaultProps = defaultProps;
