import React, { useState, useEffect } from 'react';

export const useRefresh = (isToday, action, apiCall) => {
  const [refreshNow, setRefreshNow] = useState(true);

  useEffect(() => {
    if (isToday) {
      console.log('estravirauis');

      setRefreshNow(false);
      setTimeout(setRefreshNow(true), 30000);
    }
  }, [refreshNow]);

  const resetTime = () => {
    setRefreshNow(true);
  };

  return { refreshNow };
};

export default useRefresh;
