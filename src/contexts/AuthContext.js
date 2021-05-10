import React, { useState, useEffect } from 'react';
import { usePasswordLoginMutation, useCurrentUserLazyQuery } from '../data/services/graphql';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { getRouteByApiId } from '../data/constants/RouteConstants';
import { useCurrentUser } from './hooks/useCurrentUser';
import { useLogout } from './hooks/useLogout';
//
export const AuthContext = React.createContext(() => {
  //
});

export const AuthContextProvider = ({ children }) => {
  // LocalState
  const [isContextLoading, setLoading] = useState(true);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [authData, setAuthData] = useState();
  const [authHistory, setHistory] = useState();
  const [token, setToken] = useState(localStorage);

  // "userId": "joe.admin@example.com",
  // "password": "changeBen21"
  const { currentUserQuery, isCurrentUserLogged } = useCurrentUser(user, password);
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

      console.log('CurrentUser loggedIn??? ', isCurrentUserLogged);
      console.log('CurrentUser token??? ', token);
    };

    await localFunction();
  }, []);

  //
  useEffect(async () => {
    const _token = await localStorage.getItem('AUTH_TOKEN');
    const _login = await localStorage.getItem('LOGIN');

    console.log('setAuthenticated, _token?', _token);
    console.log('setAuthenticated, isCurrentUserLogged?', isCurrentUserLogged);

    // if (_login === null) {
    //   setAuthenticated(false);
    // } else {
    // setAuthenticated(true);
    // }

    setAuthenticated(!!_token && !!isCurrentUserLogged);
    setAuthenticating(false);
  }, [isCurrentUserLogged]);

  //
  // When Server Response or Data is cleaned.
  //
  useEffect(() => {
    // console.log('Data...: ', data);
    // console.log('Error...: ', error);

    if (error) {
      console.log('Error: ', error);

      return;
    }

    if (data) {
      console.log('Data probe', data);
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

        // console.log('Saved AuthData', authData);
        localStorage.setItem('AUTH_DATA', JSON.stringify(authData));
        localStorage.setItem('USER_NAME', session.firstNm);
        // localStorage.setItem('AUTH_TOKEN', authData.token);
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
    // console.log('Change AuthData: ', authData);

    if (!authData) {
      return;
    }

    console.log('Change AuthData, authData.selectedPage: ', authData.selectedPage);

    const routePage = getRouteByApiId(authData.selectedPage);

    // console.log('routePage: ', routePage);

    if (!routePage) {
      authError.setMessage('Route not Defined');
      return;
    }

    // "userId": "joe.admin@example.com",
    // "password": "changeBen21"

    if (!authHistory) return;

    return authHistory.push(routePage.URL);

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
    console.log('authLogin');
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

    if (expired === 'expired') {
      localStorage.setItem('LOGOUT', 'logout');
    }
    console.log('Removed Item, AUTH_TOKEN');
    logoutQuery();

    setAuthData();
    setAuthenticated(false);
    clearInputLoginData();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const values = React.useMemo(
    () => ({
      isContextLoading,
      isAuthenticating,
      isAuthenticated,
      authData,
      authError,
      token,
      authLogin,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      authLogout,
    }),
    [isContextLoading, isAuthenticating, isAuthenticated, authData, authError, token]
  );

  // Finally, return the interface that we want to expose to our other components
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

//
export function useAuthContext() {
  const context = React.useContext(AuthContext);

  return context;
}
