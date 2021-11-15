import { useState, useEffect } from 'react';
import { useCurrentUserLazyQuery } from '../../data/services/graphql';

export const useCurrentUser = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [isCurrentUserLogged, setLoggedIn] = useState(false);

  //
  const [_apiCall, { data, loading, error }]: any = useCurrentUserLazyQuery({
    variables: {},
  });

  useEffect(() => {
    if (error) {
      // console.log('We have an error');
      // authLogout('Session Expired');
      // history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  //*
  useEffect(() => {
    if (!data) return;

    const _isLoggedIn = data.currentUser.loggedIn;
    if (!_isLoggedIn) {
      if (localStorage.getItem('LOGIN') != null) {
        localStorage.removeItem('LOGIN');
      }
    }

    setLoggedIn(_isLoggedIn);
  }, [data]);

  //
  // *
  //
  const currentUserQuery = async () => {
    setProcessing(true);
    await _apiCall();
    setProcessing(false);
  };

  return { currentUserQuery, isProcessing, isLoading: loading, isCurrentUserLogged, setLoggedIn };
};
