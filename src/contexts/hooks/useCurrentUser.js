import { useState, useEffect } from 'react';
import { useCurrentUserLazyQuery } from '../../data/services/graphql';

export const useCurrentUser = (_username, _password) => {
  const [isProcessing, setProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const [isCurrentUserLogged, setLoggedIn] = useState(false);
  //
  const [_apiCall, { data, loading, error }] = useCurrentUserLazyQuery({
    variables: {},
  });

  //*
  useEffect(() => {
    if (!data) return;

    console.log('data currentUser', data);

    const _isLoggedIn = data.currentUser.loggedIn;
    setLoggedIn(_isLoggedIn);
  }, [data]);

  //
  // *
  //
  const currentUserQuery = async (__username) => {
    setProcessing(true);

    await _apiCall();

    setProcessing(false);
  };

  return { currentUserQuery, currentUserData, isCurrentUserLogged };
};
