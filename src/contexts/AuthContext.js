import React, { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { usePasswordLoginMutation, useCurrentUserLazyQuery } from '../data/services/graphql';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { getRouteByApiId } from '../data/constants/RouteConstants';
import { useCurrentUser } from './hooks/useCurrentUser';
import { useLogout } from './hooks/useLogout';
import { DEFAULT_POLLING_TIME } from '../data/constants/TableConstants';

import { useCurrentUserTheme } from '../hooks/useCurrentUserTheme';
import { LayoutLogin } from '../layouts/LayoutLogin';
import { Spacing } from '../components/spacings/Spacing';
import { Spinner } from '../components/spinners/Spinner';
import { StyledCard } from '../containers/forms/FormLogin/FormLogin.styles';
import { useThemeContext } from './ThemeContext';
import Theming from '../utils/Theming';

//
export const AuthContext = React.createContext(() => {
  //
});

export const AuthContextProvider = ({ children }) => {
  const { changeTheme } = useThemeContext();
  const { userTheme, isLoadingTheme, fetchTheme } = useCurrentUserTheme();

  const AUTH_DATA = localStorage.getItem('AUTH_DATA');
  const [selectedPage, setSelectedPage] = useState('/');
  // LocalState
  const [isContextLoading, setLoading] = useState(true);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [authHistory, setHistory] = useState();
  const [token, setToken] = useState(localStorage);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [pollingTime, setPollingTime] = useState(DEFAULT_POLLING_TIME);
  const [errorMessage, setErrorMessage] = useState('');

  const { authData, orgSid } = useStoreState(({ AuthStore, ActiveOrgStore }) => ({
    authData: AuthStore.data,
    orgSid: ActiveOrgStore.orgSid,
  }));

  const { setAuthData, updateOrgSid } = useStoreActions(({ AuthStore, ActiveOrgStore }) => ({
    setAuthData: AuthStore.setAuthData,
    updateOrgSid: ActiveOrgStore.updateOrgSid,
  }));

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

  useEffect(() => {
    setAuthData(AUTH_DATA ? JSON.parse(AUTH_DATA) : null);
  }, []);

  useEffect(() => {
    if (!orgSid) {
      const _orgSid = localStorage.getItem('ORGS_ID');
      if (_orgSid) {
        updateOrgSid(_orgSid);
      }
    }
  }, []);

  //
  useEffect(async () => {
    const _token = await localStorage.getItem('AUTH_TOKEN');

    setToken(_token);
    setAuthenticated(!!_token && !!isCurrentUserLogged);
    setAuthenticating(false);
    // setHistory(history);
  }, [isCurrentUserLogged]);

  //
  useEffect(() => {
    setIsCheckingAuth(isAuthenticating);

    if (!isAuthenticating && !authData && !token) {
      setIsCheckingAuth(false);
    }

    if (!!token && !!authData) {
      setAuthenticated(true);
    }
  }, [token, isAuthenticating, isAuthenticated, authData]);

  //
  // When Server Response or Data is cleaned.
  //
  useEffect(() => {
    if (error) {
      setToken(null);
      setAuthenticated(false);
      setErrorMessage('Wrong User/Password');

      return;
    }

    if (data) {
      const { step, tokenUser, loginCompleteDomain } = data?.passwordLogin;
      const isCompleted = (step ?? '') === 'COMPLETE';

      if (isCompleted) {
        const { token, session } = tokenUser;
        const { id, orgId } = session;
        const { navItems, selectedPage, type } = loginCompleteDomain;

        const authData = {
          id,
          orgId,
          selectedPage,
          userType: type,
          navItems,
          step,
          token,
        };

        localStorage.setItem('AUTH_DATA', JSON.stringify(authData));
        localStorage.setItem('USER_NAME', session.firstNm);
        setAuthData(authData);
        setAuthenticated(true);

        updateOrgSid(authData?.orgId);
        localStorage.setItem('ORGS_ID', authData?.orgId);
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

      localStorage.removeItem('DASHBOARD_NAV');

      localStorage.removeItem('ADMIN_NAV');

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

  useEffect(async () => {
    if (user?.length && password?.length) {
      try {
        const passwordResponse = await passwordLoginMutation();

        return passwordResponse;
      } catch (e) {
        // console.log('Exception e = ', e);
      }
    }

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
    localStorage.removeItem('ORGS_ID');
    localStorage.removeItem('LOGIN');

    if (expired) {
      localStorage.setItem('LOGOUT', expired);
    }

    logoutQuery();

    setAuthData(null);
    setAuthenticated(false);
    clearInputLoginData();
    setToken(null);
    updateOrgSid(null);
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
      authError,
      token,
      pollingTime,
      errorMessage,
      authLogin,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      authLogout,
    }),
    [isContextLoading, isAuthenticating, isAuthenticated, authData, authError, token, pollingTime, orgSid]
  );

  // Finally, return the interface that we want to expose to our other components
  return (
    <AuthContext.Provider value={values}>
      {isLoadingTheme ? (
        <LayoutLogin id="AuthContext">
          <StyledCard>
            <Spacing margin={{ top: 'normal' }}>
              <Spinner size="lg" label="Fetching your preferences" />
            </Spacing>
          </StyledCard>
        </LayoutLogin>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

//
export function useAuthContext() {
  const context = React.useContext(AuthContext);

  return context;
}
