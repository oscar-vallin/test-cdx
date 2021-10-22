/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSessionStore } from '../../store/SessionStore';
import { useBeginLoginLazyQuery, usePasswordLoginMutation } from '../../data/services/graphql';
import { useActiveDomainStore } from '../../store/ActiveDomainStore';
import { useApplicationStore } from '../../store/ApplicationStore';
import { useQueryHandler } from '../../hooks/useQueryHandler';

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
  const ActiveDomainStore = useActiveDomainStore();
  const ApplicationStore = useApplicationStore();

  const [state, setState] = useState({ ...INITIAL_STATE });

  const [verifyUserId, { data: verifiedUserId, loading: isVerifyingUserId, error: userIdVerificationError }] =
    useQueryHandler(useBeginLoginLazyQuery);

  const [
    verifyUserCredentials,
    { data: userSession, loading: isVerifyingCredentials, error: credentialsVerificationError },
  ] = useQueryHandler(usePasswordLoginMutation);

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

  const returnToInitialStep = () => {
    setState({ ...state, step: 'USER_ID', loading: false, error: null, reset: false });
  };

  useEffect(() => {
    setState({ ...state, loading: isVerifyingUserId || isVerifyingCredentials, error: null, reset: false });
  }, [isVerifyingUserId, isVerifyingCredentials]);

  useEffect(() => {
    if (userIdVerificationError) {
      switch (userIdVerificationError.message) {
        default:
          setState({
            ...state,
            loading: false,
            error: 'Please provide a valid email address to proceed',
            reset: false,
          });
          break;
      }
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
      const { passwordLogin } = userSession;
      const organization = {
        type: passwordLogin?.loginCompleteDomain?.type,
        orgSid: passwordLogin?.tokenUser?.session?.orgSid,
        destination: passwordLogin?.loginCompleteDomain?.selectedPage,
        label: '',
        subNavItems: [],
      };

      SessionStore.setCurrentSession({
        token: passwordLogin?.tokenUser?.token,
        ...passwordLogin?.tokenUser?.session,
      });

      ActiveDomainStore.setOriginOrg(organization);
      ActiveDomainStore.setCurrentOrg(organization);
    }
  }, [userSession]);

  return { performUserIdVerification, performUserAuthentication, returnToInitialStep, state };
};
