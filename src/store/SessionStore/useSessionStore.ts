import { createTypedHooks } from 'easy-peasy';
import { StoreModel } from 'src/store/index';
import { SessionStages, SessionUser } from 'src/store/SessionStore/SessionTypes';

type SessionStoreType = {
  user: SessionUser;
  status: {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    stage: SessionStages;
  };
  redirectUrl: string | null;
  globalError?: string | null;
  logout: () => void;
  setSessionStage: (state: string) => void;
  setCurrentSession: (user: SessionUser) => void;
  setRedirectUrl: (url: string | null) => void;
  setGlobalError: (msg: string | null) => void;
};

export const useSessionStore = (): SessionStoreType => {
  const typedHooks = createTypedHooks<StoreModel>();

  const { user, status, redirectUrl, globalError } = typedHooks.useStoreState((state) => state.SessionStore);
  const { logout, setCurrentSession, setSessionStage, setRedirectUrl, setGlobalError } = typedHooks.useStoreActions(
    (state) => state.SessionStore
  );

  return {
    user,
    status,
    redirectUrl,
    globalError,
    logout,
    setCurrentSession,
    setSessionStage,
    setRedirectUrl,
    setGlobalError
  };
};
