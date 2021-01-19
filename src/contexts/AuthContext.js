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
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState();
  const [data, setData] = useState();

  // Component Did Mount
  useEffect(() => {
    const localFunction = async () => {
      setLoading(false);
      // Execute Function
    };

    localFunction();
  }, []);

  //
  useEffect(() => {
    setAuthenticating(true);
    // Reload Authenticated Flag, and set Authenticated.
  }, [user, password]);

  // Local Functions shared in Context.
  const setLogin = async (_user, _password, _data) => {
    //
    setUser(_user);
    setPassword(_password);
    setToken('');
    setData(_data);
  };

  //
  const values = React.useMemo(() => ({ isContextLoading, isAuthenticating, isAuthenticated, token, data, setLogin }), [
    isContextLoading,
    isAuthenticating,
    isAuthenticated,
    token,
    data,
  ]);
    console.log('Data...: ', data);
    console.log('Error...: ', error);

    if (error) {
      console.log('Error: ', error);
      return;
    }

    if (data) {
      console.log('Data', data);
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

        console.log('Saved AuthData', authData);
        setAuthData(authData);
        setAuthenticated(true);
      }
    }
  }, [data, error]);

  //
  useEffect(() => {
    console.log('Change AuthData: ', authData);

    if (!authData) {
      return;
    }

    const routePage = getRouteByApiId(authData.selectedPage);

    console.log('routePage: ', routePage);

    if (!routePage) {
      authError.setMessage('Route not Defined');
      return;
    }

    // "userId": "joe.admin@example.com",
    // "password": "changeBen21"

    return authHistory.push(routePage.URL);
  }, [authData, authHistory]);

  useEffect(() => {
    console.log('st User: ', user);
    console.log('st Password:', password);

    if (user.length && password.length) return passwordLoginMutation();

    return null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, password]);

  //
  const authLogin = (_user, _password, _history) => {
    console.log('authLogin');
    console.log('_user: ', _user);
    console.log('_password: ', _password);

    setUser(_user);
    setPassword(_password);
    setHistory(_history);
    // passwordLoginMutation();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const values = React.useMemo(
    () => ({ isContextLoading, isAuthenticating, isAuthenticated, authData, authError, authLogin }),
    [isContextLoading, isAuthenticating, isAuthenticated, authData, authError]
  );

  // Finally, return the interface that we want to expose to our other components
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

//
export function useAuthContext() {
  const context = React.useContext(AuthContext);

  return context;
}
