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
      const stage = SessionStore.status.isAutheticated ? SessionStages.LoggedIn : SessionStages.LoggedOut;

      SessionStore.setSessionStage(stage);
    }
  }, [isRehydrated]);

  useEffect(() => {
    const {
      status: { isAutheticated, isRehydrating },
    } = SessionStore;

    if (!isRehydrating && !isAutheticated) {
      history.push('/login');
    }
  }, [SessionStore.status.isAutheticated, SessionStore.status.isRehydrating]);

  return <SessionContext.Provider>{children}</SessionContext.Provider>;
};
