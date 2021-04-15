import { useState, useEffect } from 'react';
import { useBeginLoginLazyQuery, useLogOutLazyQuery } from '../../data/services/graphql';

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

    ('logging Out');
    _apiCall();

    localStorage.removeItem('AUTH_TOKEN');

    setProcessing(false);
  };

  return { logoutProcessing: isProcessing, logoutQuery, logoutData };
};
