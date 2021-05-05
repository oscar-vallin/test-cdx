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

    const _isLoggedIn = data.currentUser.loggedIn;
    if (_isLoggedIn === false) {
      if (localStorage.getItem('LOGIN') != null) {
        localStorage.removeItem('LOGIN');
      }
    }

    console.log('logged in: ', _isLoggedIn);
    setLoggedIn(_isLoggedIn);
  }, [data]);

  //
  // *
  //
  const currentUserQuery = async (__username) => {
    setProcessing(true);
    const _login = await localStorage.getItem('LOGIN');

    // if (_login != null) {
    //   return;
    // }
    await _apiCall();

    setProcessing(false);
  };

  return { currentUserQuery, currentUserData, isCurrentUserLogged };
};
