/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSessionStore } from 'src/store/SessionStore';
import { LoginStepType, useBeginLoginMutation, usePasswordLoginMutation } from 'src/data/services/graphql';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { useCSRFToken } from 'src/hooks/useCSRFToken';

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
  const { callCSRFController } = useCSRFToken();

  const [retries, setRetries] = useState(0);
  const [state, setState] = useState({ ...INITIAL_STATE });
  const [userId, setUserId] = useState<string>();

  const [verifyUserId, { data: verifiedUserId, loading: isVerifyingUserId, error: userIdVerificationError }] =
    useBeginLoginMutation();

  const [
    verifyUserCredentials,
    { data: userSession, loading: isVerifyingCredentials, error: credentialsVerificationError },
  ] = usePasswordLoginMutation();

  const performUserIdVerification = ({ userId }) => {
    setUserId(userId);

    verifyUserId({
      variables: {
        userId,
      },
      errorPolicy: 'all'
    }).catch(() => null);
  }

  const performUserAuthentication = ({ userId, password }) =>
    verifyUserCredentials({
      variables: {
        userId,
        password,
      },
      errorPolicy: 'all'
    }).catch(() => null);

  const returnToInitialStep = () => {
    setState({ ...state, step: 'USER_ID', loading: false, error: null, reset: false });
  };

  useEffect(() => {
    setState({ ...state, loading: isVerifyingUserId || isVerifyingCredentials, error: null, reset: false });
  }, [isVerifyingUserId, isVerifyingCredentials]);

  useEffect(() => {
    if (userIdVerificationError) {
      const networkError = userIdVerificationError.networkError
      if (networkError && ('statusCode' in networkError) && (networkError.statusCode === 403)) {
        // prevent an infinite loop of calls
        if (retries < 3) {
          // This means the CSRF Token has expired and we need to retrieve it
          callCSRFController();
          // retry
          performUserIdVerification({ userId });
          setRetries(retries + 1);
        } else {
          // Just refresh the page
          window.location.reload();
        }
      } else {
        const errMsg = userIdVerificationError.graphQLErrors[0].message ?? 'Please provide a valid email address to proceed'

        setState({
          ...state,
          step: 'USER_ID',
          loading: false,
          error: errMsg,
          reset: false,
        });
      }
    }
  }, [userIdVerificationError]);

  useEffect(() => {
    if (credentialsVerificationError) {
      setState({ step: 'USER_ID', data: null, loading: false, error: 'Invalid credentials', reset: true });
    }
  }, [credentialsVerificationError]);

  useEffect(() => {
    if (verifiedUserId && verifiedUserId.beginLogin?.step === LoginStepType.Password) {
      setState({ step: 'PASSWORD', data: verifiedUserId.beginLogin, loading: false, error: null, reset: false });
    }
  }, [verifiedUserId]);

  useEffect(() => {
    if (userSession?.passwordLogin?.step === LoginStepType.Complete) {
      const { passwordLogin } = userSession;
      const organization = {
        type: passwordLogin?.loginCompleteDomain?.type,
        orgSid: passwordLogin?.tokenUser?.session?.orgSid,
        destination: passwordLogin?.loginCompleteDomain?.selectedPage,
        label: passwordLogin?.tokenUser?.session?.orgName,
        orgId: passwordLogin?.tokenUser?.session?.orgId,
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
