import { useState, useEffect } from 'react';
import { useLogOutLazyQuery } from '../../data/services/graphql';

export const useLogout = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [logoutData, setApiData] = useState({});
  //
  const [_apiCall, { data, loading, error }] = useLogOutLazyQuery({
    variables: {},
  });

  //*
  useEffect(() => {
    if (data)
      setApiData({
        data,
        loading,
        error,
      });
  }, [data, error, loading]);

  //
  // *
  //
  const logoutQuery = async () => {
    setProcessing(true);
    _apiCall();

    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('AUTH_DATA');

    setProcessing(false);
  };

  return { logoutProcessing: isProcessing, logoutQuery, logoutData };
};
