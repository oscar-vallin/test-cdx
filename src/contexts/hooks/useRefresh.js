import { useState, useEffect } from 'react';
import { useAuthContext } from '../AuthContext';
import { getTableStructure } from '../../data/constants/TableConstants';

export const useRefresh = (id, triggerFunction) => {
  const [refresh, setRefresh] = useState(false);
  const [refreshNow, setRefreshNow] = useState(false);
  const { pollingTime } = useAuthContext();
  const pollingFactor = getTableStructure(id)?.polling;

  const setRefreshOff = () => {
    setRefreshNow(false);
  };

  const setRefreshOn = () => {
    setRefreshNow(true);
  };

  const startRefresh = () => {
    setRefreshOff();

    setTimeout(setRefreshOn, pollingTime * (pollingFactor ?? 1));
  };

  const disableRefresh = () => {
    setRefreshOff();
    setRefresh(false);
  };

  const enableRefresh = (condition) => {
    if (!condition) {
      disableRefresh();
      return;
    }

    setRefreshOff();
    setRefresh(true);
    startRefresh();
  };

  useEffect(() => {
    return function unmountHook() {
      disableRefresh();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (refreshNow && refresh) {
      triggerFunction();
      startRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshNow]);

  return { refreshNow, setRefreshOn, setRefreshOff, enableRefresh, disableRefresh };
};
