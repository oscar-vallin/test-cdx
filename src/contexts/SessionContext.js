import React, { useEffect } from 'react';
import { useStoreRehydrated } from 'easy-peasy';

import { SessionStages } from '../store/SessionStore/SessionTypes';
import { useSessionStore } from '../store/SessionStore';

export const SessionContext = React.createContext(() => {});

export const SessionContextProvider = ({ children }) => {
  const SessionStore = useSessionStore();
  const isRehydrated = useStoreRehydrated();

  useEffect(() => {
    if (!isRehydrated) {
      const stage = SessionStore.status.isAutheticated ? SessionStages.LoggedIn : SessionStages.LoggedOut;

      SessionStore.setSessionStage(stage);
    }
  }, [isRehydrated]);

  return <SessionContext.Provider>{children}</SessionContext.Provider>;
};
