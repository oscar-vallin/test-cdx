import { useEffect } from 'react';
import { createTypedHooks } from 'easy-peasy';
import { useVersionLazyQuery } from 'src/data/services/graphql';
import { StoreModel } from 'src/store/index';
import { ApplicationStatus } from 'src/store/ApplicationStore/ApplicationTypes';
import { useSessionStore } from 'src/store/SessionStore';

type ApplicationStoreType = {
  status: ApplicationStatus;
  version: string;
  reset: () => void;
  setIsOffline: (offline: boolean) => void;
};

export const useApplicationStore = (): ApplicationStoreType => {
  const typedHooks = createTypedHooks<StoreModel>();

  const { status, version } = typedHooks.useStoreState((state) => state.ApplicationStore);
  const { setIsOffline, updateVersion, reset } = typedHooks.useStoreActions((state) => state.ApplicationStore);

  const SessionStore = useSessionStore();
  const [callGetVersion, { data, loading, error }] = useVersionLazyQuery();

  useEffect(() => {
    if (!version && SessionStore.status.isAuthenticated) {
      callGetVersion();
    }
  }, [SessionStore.user.token, version]);

  useEffect(() => {
    if (!loading) {
      if (data && data.version) {
        updateVersion(data.version);
      } else if (error?.message === 'Failed to fetch') {
        setIsOffline(true);
      }
    }
  }, [data, loading, error, setIsOffline, updateVersion]);

  return {
    status,
    version,
    reset,
    setIsOffline,
  };
};
