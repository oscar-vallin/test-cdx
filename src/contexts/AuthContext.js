import React, { useState, useEffect } from 'react';

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
    console.log('AuthContext Loading...');
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

  // Finally, return the interface that we want to expose to our other components
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

//
export function useAuthContext() {
  const context = React.useContext(AuthContext);

  return context;
}
