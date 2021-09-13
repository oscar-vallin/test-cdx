import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useStoreRehydrated } from 'easy-peasy';

import { SessionStages } from '../store/SessionStore/SessionTypes';
import { useSessionStore } from '../store/SessionStore';

export const SessionContext = React.createContext(() => {});

export const SessionContextProvider = ({ children }) => {
  const history = useHistory();
  const SessionStore = useSessionStore();
  const isRehydrated = useStoreRehydrated();

  useEffect(() => {
    if (isRehydrated) {
      const stage = SessionStore.user.token ? SessionStages.LoggedIn : SessionStages.LoggedOut;

      SessionStore.setSessionStage(stage);
    }
  }, [isRehydrated, SessionStore.user.token]);

  useEffect(() => {
    const {
      status: { isAuthenticated, isRehydrating },
    } = SessionStore;

    if (!isRehydrating && !isAuthenticated) {
      history.push('/login');
    }
  }, [SessionStore.status.isAuthenticated, SessionStore.status.isRehydrating]);

  return <SessionContext.Provider>{isRehydrated && children}</SessionContext.Provider>;
};
