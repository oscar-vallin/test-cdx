import { useStoreState, useStoreActions } from 'easy-peasy';

const getStoreObj = ({ SessionStore }) => SessionStore;

export const useSessionStore = (): any => {
  const { user, status, redirectUrl } = useStoreState(getStoreObj);
  const { setCurrentSession, setSessionStage, setRedirectUrl } = useStoreActions(getStoreObj);

  return {
    user,
    status,
    redirectUrl,
    setCurrentSession,
    setSessionStage,
    setRedirectUrl,
  };
};
