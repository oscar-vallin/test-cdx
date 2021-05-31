import React, { useState, useEffect } from 'react';
import { usePasswordLoginMutation, useCurrentUserLazyQuery } from '../data/services/graphql';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { getRouteByApiId } from '../data/constants/RouteConstants';
import { useCurrentUser } from './hooks/useCurrentUser';
import { useLogout } from './hooks/useLogout';
<<<<<<< HEAD
=======
import { setISODay } from 'date-fns';

const DEFAULT_POLLING_TIME = 10000; // 10secs.

>>>>>>> 7e741f7 (210525_CDX_Enhance__Polling: Adding new hook for common tables)
//
export const AuthContext = React.createContext(() => {
  //
});

export const AuthContextProvider = ({ children }) => {
  const AUTH_DATA = localStorage.getItem('AUTH_DATA');
  const [selectedPage, setSelectedPage] = useState('/');
  // LocalState
  const [isContextLoading, setLoading] = useState(true);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(true);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [authData, setAuthData] = useState(AUTH_DATA ? JSON.parse(AUTH_DATA) : null);
  
  const [authHistory, setHistory] = useState();
  const [token, setToken] = useState(localStorage);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [pollingTime, setPollingTime] = useState(DEFAULT_POLLING_TIME);

  // "userId": "joe.admin@example.com",
  // "password": "changeBen21"
  const { currentUserQuery, isCurrentUserLogged, setLoggedIn } = useCurrentUser(user, password);
  const { logoutQuery } = useLogout();

  const [passwordLoginMutation, { data, loading, error }] = usePasswordLoginMutation({
    variables: {
      userId: user,
      password,
    },
  });

  const authError = useErrorMessage();

  // Component Did Mount
  useEffect(async () => {
    const localFunction = async () => {
      setLoading(false);
      setAuthenticating(true);

      await currentUserQuery();
    };

    await localFunction();
  }, []);

  //
  useEffect(async () => {
    const _token = await localStorage.getItem('AUTH_TOKEN');

    setToken(_token);
    setAuthenticated(!!_token && !!isCurrentUserLogged);
    setAuthenticating(false);
    // setHistory(history);
  }, [isCurrentUserLogged]);

  useEffect(() => {
    setIsCheckingAuth(isAuthenticating || token !== null);

    if (!isAuthenticating && !authData && token === null) {
      setIsCheckingAuth(false);
    }

    if (token && authData) {
      setAuthenticated(true)
    }
  }, [token, isAuthenticating, isAuthenticated, authData]);

  //
  // When Server Response or Data is cleaned.
  //
  useEffect(() => {
    if (error) {
      setToken(null);

      return;
    }

    if (data) {
      const { step, tokenUser, loginCompleteDomain } = data?.passwordLogin;
      const isCompleted = (step ?? '') === 'COMPLETE';

      if (isCompleted) {
        const { token, session } = tokenUser;
        const { orgId } = session;
        const { navItems, selectedPage, type } = loginCompleteDomain;

        const authData = {
          orgId,
          selectedPage,
          userType: type,
          navItems,
          step,
          token,
        };

        console.log('Login Data response: ', data);

        localStorage.setItem('AUTH_DATA', JSON.stringify(authData));
        localStorage.setItem('USER_NAME', session.firstNm);
        setAuthData(authData);
        setAuthenticated(true);
        //
        // Set Bearer Token
      }
    }
  }, [data, error]);

  //
  // When AuthData changes cause is saved for login
  //
  useEffect(() => {
    if (!authData) {
      setToken(null);
      setAuthenticating(false);

      return;
    }

    const routePage = getRouteByApiId(authData.selectedPage);

    if (!routePage) {
      authError.setMessage('Route not Defined');
      return;
    }

    setSelectedPage(routePage);
    // "userId": "joe.admin@example.com",
    // "password": "changeBen21"

    if (!authHistory) return;

    authHistory.push(routePage.URL);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData, authHistory]);

  //
  // When user / password.
  //
  useEffect(() => {
    if (user?.length && password?.length) return passwordLoginMutation();

    return null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, password]);

  //
  const authLogin = (_user, _password, _history) => {
    localStorage.setItem('LOGIN', 'login');
    const logout = localStorage.getItem('LOGOUT');

    if (logout != null) {
      localStorage.removeItem('LOGOUT');
    }

    setUser(_user);
    setPassword(_password);
    setHistory(_history);
  };

  //
  // * Clear all the Input Data Username and Password for the context.
  //
  const clearInputLoginData = () => {
    setUser();
    setPassword();
  };

  //
  // * Clear all the Input Data Username and Password for the context.
  //
  const authLogout = (expired) => {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_NAME');
    localStorage.removeItem('LOGIN');

    if (expired != undefined) {
      localStorage.setItem('LOGOUT', expired);
    }

    logoutQuery();

    setAuthData();
    setAuthenticated(false);
    clearInputLoginData();
    setToken(null);
    setLoggedIn(false);
  };

  //
  // Set Polling timeout.
  //
  const updatePollingTime = (iTimer) => {
    if (iTimer) setPollingTime(iTimer);
    else setPollingTime(30000);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const values = React.useMemo(
    () => ({
      selectedPage,
      isCheckingAuth,
      setIsCheckingAuth,
      isContextLoading,
      isAuthenticating,
      isAuthenticated,
      authData,
      authError,
      token,
      pollingTime,
      authLogin,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      authLogout,
    }),
    [isContextLoading, isAuthenticating, isAuthenticated, authData, authError, token, pollingTime]
  );

  // Finally, return the interface that we want to expose to our other components
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

//
export function useAuthContext() {
  const context = React.useContext(AuthContext);

  return context;
}
