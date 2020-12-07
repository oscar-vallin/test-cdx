import React, { useState, useEffect } from 'react';
import { usePasswordLoginMutation } from '../data/services/graphql';

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
  const [passwordLoginMutation, { data, loading, error }] = usePasswordLoginMutation({
    variables: {
      userId: user,
      password,
    },
  });
  // const history = useHistory();

  // Component Did Mount
  useEffect(() => {
    const localFunction = async () => {
      setLoading(false);
      // Execute Function
    };

    localFunction();
    console.log('AuthContext Loading...');
  }, []);

  //
  useEffect(() => {
    setAuthenticating(loading);
  }, [loading]);

  //
  useEffect(() => {
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

    if (!routePage) {
      return;
    }

    console.log('routePAge: ', routePage);

    authHistory.push(routePage.URL);
  }, [authData, authHistory]);

  // const authNavigate = (_history) => {
  //   if (authData) console.log('authHistory: ', authHistory);
  //   console.log('authData: ', authData);
  //   const routePage = getRouteByApiId(authData.selectedPage);

  //   if (!routePage) {
  //     return;
  //   }

  //   console.log('routePAge: ', routePage);

  //   authHistory.push(routePage.URL);
  // };

  //
  const authLogin = (_user, _password, _history) => {
    console.log('authLogin');
    console.log('_user: ', _user);
    console.log('_password: ', _password);

    setUser(_user);
    setPassword(_password);
    setHistory(_history);
    passwordLoginMutation();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const values = React.useMemo(() => ({ isContextLoading, isAuthenticating, isAuthenticated, authData, authLogin }), [
    isContextLoading,
    isAuthenticating,
    isAuthenticated,
    authData,
  ]);

  // Finally, return the interface that we want to expose to our other components
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

//
export function useAuthContext() {
  const context = React.useContext(AuthContext);

  return context;
}
