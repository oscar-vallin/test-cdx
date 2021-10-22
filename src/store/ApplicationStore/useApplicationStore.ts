import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useVersionLazyQuery } from '../../data/services/graphql';

const getStoreObj = ({ ApplicationStore }) => ApplicationStore;

export const useApplicationStore = (): any => {
  const { status } = useStoreState(getStoreObj);
  const { setIsOffline, reset } = useStoreActions(getStoreObj);

  const [getCurrentVersion, { data, loading, error }] = useVersionLazyQuery();

  useEffect(() => {
    if (!loading) {
      const isOffline = error && error.message === 'Failed to fetch';

      setIsOffline(isOffline);
    }
  }, [data, loading, error]);

  return {
    reset,
    status,
    setIsOffline,
    server: { data, loading, error },
    initStatusCheck: () => setTimeout(getCurrentVersion, 30000),
  };
};
