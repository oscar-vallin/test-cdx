import { useState, useEffect } from 'react';
import { useBeginLoginLazyQuery, useCurrentUserLazyQuery } from '../../data/services/graphql';

export const useCurrentUser = (_username, _password) => {
  const [isProcessing, setProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});

  //
  const [_apiCall, { data, loading, error }] = useCurrentUserLazyQuery({
    variables: {},
  });

  //*
  useEffect(() => {
    setCurrentUserData({
      data,
      loading,
      error,
      isAuthenticated,
    });
  }, [data, loading, error]);

  //
  // *
  //
  const currentUserQuery = async (__username) => {
    setProcessing(true);

    _apiCall();

    setProcessing(false);
  };

  return { currentUserLoading: isProcessing, currentUserQuery, currentUserData };
};
