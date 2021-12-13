/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSessionStore } from '../../store/SessionStore';
import { useLogOutMutation } from '../../data/services/graphql';

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

  const [logoutUser, { data: logoutStatus, loading: isLoggingOut, error: logoutError }] = useLogOutMutation();

  useEffect(() => {
    setState({ ...state, loading: isLoggingOut, error: null });
  }, [isLoggingOut]);

  useEffect(() => {
    if (logoutError) {
      setState({ ...state, loading: false, error: 'An error occurred while ending your session. Please, try again.' });
    }
  }, [logoutError]);

  useEffect(() => {
    if (logoutStatus?.logOut?.successful) {
      SessionStore.setCurrentSession({ token: null });

      setState({ ...INITIAL_STATE });
    }
  }, [logoutStatus]);

  return { performUserLogout: logoutUser, state };
};
