import { useState, useEffect } from 'react';
import { getTableStructure } from '../data/constants/TableConstants';

export const useRefresh = (id, triggerFunction) => {
  const [refresh, setRefresh] = useState(false);
  const [refreshNow, setRefreshNow] = useState(false);
  // const { pollingTime } = useAuthContext();
  const pollingTime = 60000;
  const pollingFactor = getTableStructure(id)?.polling;

  const setRefreshOff = () => {
    setRefreshNow(false);
  };

  const disableRefresh = () => {
    setRefreshOff();
    setRefresh(false);
  };

  const setRefreshOn = () => {
    setRefreshNow(true);
  };

  const startRefresh = () => {
    setRefreshOff();

    setTimeout(setRefreshOn, pollingTime * (pollingFactor ?? 1));
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

  const enableRefresh = (condition) => {
    if (!condition) {
      disableRefresh();
      return;
    }

    setRefresh(true);
    startRefresh();
  };

  return { refreshNow, setRefreshOn, setRefreshOff, enableRefresh, disableRefresh };
};
