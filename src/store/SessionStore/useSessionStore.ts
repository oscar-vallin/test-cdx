import { useStoreState, useStoreActions } from 'easy-peasy';

const getStoreObj = ({ SessionStore }) => SessionStore;

export const useSessionStore = (): any => {
  const { user, status } = useStoreState(getStoreObj);
  const { setCurrentSession, setSessionStage } = useStoreActions(getStoreObj);

  return {
    user,
    status,
    setCurrentSession,
    setSessionStage,
  };
};
