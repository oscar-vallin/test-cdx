/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSessionStore } from '../../store/SessionStore';
import { useLogOutMutation } from '../../data/services/graphql';
import { useCSRFToken } from '../../hooks/useCSRFToken';

type LogoutState = {
  loading: boolean;
  error?: any;
  data?: any;
};

const INITIAL_STATE: LogoutState = {
  loading: false,
  error: null,
  data: null,
};

export const useLogoutUseCase = () => {
  const SessionStore = useSessionStore();
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { setCSRFToken, setAuthToken } = useCSRFToken();

  const [apiCall, { loading: isLoggingOut, error: logoutError }] = useLogOutMutation();

  const clearTokens = () => {
    SessionStore.setCurrentSession({ token: null });
    setCSRFToken('');
    setAuthToken('');
    setState({ ...INITIAL_STATE });
  };

  const logoutUser = () => {
    apiCall()
      .catch((reason: any) => {
        // catch any error and just reset the tokens regardless
      })
      .finally(clearTokens);
  };

  useEffect(() => {
    setState({ ...state, loading: isLoggingOut, error: null });
  }, [isLoggingOut]);

  useEffect(() => {
    if (logoutError) {
      setState({ ...state, loading: false, error: 'An error occurred while ending your session. Please, try again.' });
    }
  }, [logoutError]);

  return { performUserLogout: logoutUser, state };
};
