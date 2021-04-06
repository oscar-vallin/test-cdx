import { useState, useEffect } from 'react';
import { useBeginLoginLazyQuery, useCurrentUserLazyQuery } from '../../data/services/graphql';

export const useLoginBegin = (_username, _password) => {
  const [isProcessing, setProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});

  //
  const [currentUserQuery, { data, loading, error }] = useCurrentUserLazyQuery({
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

    if (data?.currentUser?.loggedIn ?? false) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setProcessing(false);
  };

  return { currentUserLoading: isProcessing, currentUserQuery, currentUserData };
};
