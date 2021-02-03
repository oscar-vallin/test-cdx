import React, { useState, useEffect } from 'react';
import { usePasswordLoginMutation } from '../data/services/graphql';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { getRouteByApiId } from '../data/constants/RouteConstants';
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
  const [token, setToken] = useState();

  // "userId": "joe.admin@example.com",
  // "password": "changeBen21"

  const [passwordLoginMutation, { data, loading, error }] = usePasswordLoginMutation({
    variables: {
      userId: user,
      password,
    },
  });
  const authError = useErrorMessage();

  // Component Did Mount
  useEffect(() => {
    const localFunction = async () => {
      setLoading(false);
      const savedAuthData = localStorage.getItem('AUTH_DATA');
      const savedToken = localStorage.getItem('AUTH_TOKEN');

      if (savedToken) {
        setToken(savedToken);
        setAuthData(JSON.parse(savedAuthData));
        setAuthenticated(true);

        return;
      }

      setAuthenticated(false);

      // Execute Function
    };

    localFunction();
  }, []);

  //
  useEffect(() => {
    setAuthenticating(loading);
  }, [loading]);

  //
  // When Server Response or Data is cleaned.
  //
  useEffect(() => {
    // console.log('Data...: ', data);
    // console.log('Error...: ', error);

    if (error) {
      // console.log('Error: ', error);
      return;
    }

    if (data) {
      // console.log('Data', data);
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
        localStorage.setItem('AUTH_TOKEN', authData.token);
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

    // console.log('Change AuthData, authData.selectedPage: ', authData.selectedPage);

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
    // console.log('st User: ', user);
    // console.log('st Password:', password);

    if (user?.length && password?.length) return passwordLoginMutation();

    return null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, password]);

  //
  const authLogin = (_user, _password, _history) => {
    // console.log('authLogin');
    // console.log('_user: ', _user);
    // console.log('_password: ', _password);

    setUser(_user);
    setPassword(_password);
    setHistory(_history);
  };

  //
  // * Clear all the Input Data Username and Password for the context.
  //
  // const clearInputLoginData = () => {
  //   setUser();
  //   setPassword();
  // };

  //
  // * Clear all the Input Data Username and Password for the context.
  //
  // const authLogout = () => {
  //   localStorage.removeItem('AUTH_TOKEN');
  //   setAuthData();
  //   setAuthenticated(false);
  //   clearInputLoginData();
  // };

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
      // authLogout,
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
