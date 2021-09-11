import { useEffect, useState } from 'react';
import { useSessionStore } from '../../store/SessionStore';
import { useBeginLoginLazyQuery, usePasswordLoginMutation } from '../../data/services/graphql';

type LoginState = {
  step: string;
  loading: boolean;
  error?: any;
  data?: any;
  reset?: boolean;
};

const INITIAL_STATE: LoginState = {
  step: 'USER_ID',
  loading: false,
  error: null,
  data: null,
  reset: false,
};

export const useLoginUseCase = () => {
  const SessionStore = useSessionStore();
  const [state, setState] = useState({ ...INITIAL_STATE });

  const [verifyUserId, { data: verifiedUserId, loading: isVerifyingUserId, error: userIdVerificationError }] =
    useBeginLoginLazyQuery();

  const [
    verifyUserCredentials,
    { data: userSession, loading: isVerifyingCredentials, error: credentialsVerificationError },
  ] = usePasswordLoginMutation();

  const performUserIdVerification = ({ userId }) =>
    verifyUserId({
      variables: {
        userId,
      },
    });

  const performUserAuthentication = ({ userId, password }) =>
    verifyUserCredentials({
      variables: {
        userId,
        password,
      },
    }).catch(() => null);

  useEffect(() => {
    setState({ ...state, loading: isVerifyingUserId || isVerifyingCredentials, error: null, reset: false });
  }, [isVerifyingUserId, isVerifyingCredentials]);

  useEffect(() => {
    if (userIdVerificationError) {
      setState({ ...state, loading: false, error: 'Please provide a valid email address to proceed', reset: false });
    }
  }, [userIdVerificationError]);

  useEffect(() => {
    if (credentialsVerificationError) {
      setState({ step: 'USER_ID', data: null, loading: false, error: 'Invalid credentials', reset: true });
    }
  }, [credentialsVerificationError]);

  useEffect(() => {
    if (verifiedUserId) {
      setState({ step: 'PASSWORD', data: verifiedUserId.beginLogin, loading: false, error: null, reset: false });
    }
  }, [verifiedUserId]);

  useEffect(() => {
    if (userSession) {
      SessionStore.setCurrentSession({
        token: userSession.passwordLogin?.tokenUser?.token,
        ...userSession.passwordLogin?.tokenUser?.session,
      });

      /* Store domain in domain store */
    }
  }, [userSession]);

  return { performUserIdVerification, performUserAuthentication, state };
};
