import React, { useState, useEffect } from 'react';
import { getTableStructure } from '../data/constants/TableConstants';

export const useRefresh = (id, triggerFunction) => {
  const [refresh, setRefresh] = useState(false);
  const [refreshNow, setRefreshNow] = useState(false);
  // const { pollingTime } = useAuthContext();
  const pollingTime = 60000;
  const pollingFactor = getTableStructure(id)?.polling;

  useEffect(() => {
    return function unmountHook() {
      disableRefresh();
    };
  }, []);

  useEffect(() => {
    if (refreshNow && refresh) {
      triggerFunction();
      startRefresh();
    }
  }, [refreshNow]);

  const startRefresh = () => {
    setRefreshOff();

    setTimeout(setRefreshOn, pollingTime * (pollingFactor ?? 1));
  };

  const setRefreshOn = () => {
    setRefreshNow(true);
  };

  const setRefreshOff = () => {
    setRefreshNow(false);
  };

  const enableRefresh = (condition) => {
    if (!condition) {
      disableRefresh();
      return;
    }

    setRefresh(true);
    startRefresh();
  };

  const disableRefresh = () => {
    setRefreshOff();
    setRefresh(false);
  };

  return { refreshNow, setRefreshOn, setRefreshOff, enableRefresh, disableRefresh };
};
