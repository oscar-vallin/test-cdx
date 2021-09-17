/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, createContext } from 'react';
import { useHistory } from 'react-router';
import { useStoreRehydrated } from 'easy-peasy';

import { SessionStages } from '../store/SessionStore/SessionTypes';
import { useSessionStore } from '../store/SessionStore';

export const SessionContext = createContext(() => {
  return null;
});

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
    if (isRehydrated && !SessionStore.user.token) {
      history.push('/login');
    }
  }, [SessionStore.user.token, isRehydrated]);

  return <SessionContext.Provider>{!isRehydrated ? <div>Loading</div> : children}</SessionContext.Provider>;
};
