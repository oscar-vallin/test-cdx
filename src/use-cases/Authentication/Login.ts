/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSessionStore } from 'src/store/SessionStore';
import {
  LoginStepType,
  TokenUser,
  useBeginLoginMutation,
  useCurrentUserLazyQuery,
  usePasswordLoginMutation, WebAppDomain,
} from 'src/data/services/graphql';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { useCSRFToken } from 'src/hooks/useCSRFToken';
import { useCurrentUserTheme } from 'src/hooks/useCurrentUserTheme';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';

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
  const { callCSRFController, setCSRFToken } = useCSRFToken();

  const [retries, setRetries] = useState(0);
  const [fetchedTheme, setFetchedTheme] = useState(false);
  const [fetchedNav, setFetchedNav] = useState(false);
  const [state, setState] = useState({ ...INITIAL_STATE });
  const [userId, setUserId] = useState<string>();

  const [verifyUserId, {
    data: verifiedUserId,
    loading: isVerifyingUserId,
    error: userIdVerificationError,
  }] = useBeginLoginMutation();

  const { fetchTheme } = useCurrentUserTheme(
    () => { setFetchedTheme(true) },
  );
  const { performNavUpdate } = useActiveDomainUseCase(
    () => { setFetchedNav(true) },
  );

  const [
    verifyUserCredentials,
    { data: userSession, loading: isVerifyingCredentials, error: credentialsVerificationError },
  ] = usePasswordLoginMutation();

  const [
    callCurrentUser,
    { data: dataCurrentUser, loading: loadingCurrentUser, error: errorCurrentUser },
  ] = useCurrentUserLazyQuery();

  const performUserIdVerification = ({ userId: _userId }) => {
    setUserId(_userId);

    verifyUserId({
      variables: {
        userId: _userId,
      },
      errorPolicy: 'all',
    }).catch(() => null);
  };

  const performUserAuthentication = ({ userId: _userId, password }) => {
    verifyUserCredentials({
      variables: {
        userId: _userId,
        password,
      },
      errorPolicy: 'all',
    }).catch(() => null);
  };

  const returnToInitialStep = () => {
    setState({
      ...state, step: 'USER_ID', loading: false, error: null, reset: false,
    });
  };

  useEffect(() => {
    setState({
      ...state, loading: isVerifyingUserId || isVerifyingCredentials, error: null, reset: false,
    });
  }, [isVerifyingUserId, isVerifyingCredentials]);

  useEffect(() => {
    if (userIdVerificationError) {
      const { networkError } = userIdVerificationError;
      if (networkError && 'statusCode' in networkError && networkError.statusCode === 403) {
        // prevent an infinite loop of calls
        if (retries < 3) {
          // This means the CSRF Token has expired and we need to retrieve it
          setCSRFToken('');
          callCSRFController().then(() => {
            // retry
            performUserIdVerification({ userId });
            setRetries(retries + 1);
          });
        } else {
          // Just refresh the page
          window.location.reload();
        }
      } else {
        const errMsg = userIdVerificationError?.graphQLErrors[0]?.message
          ?? 'Please provide a valid email address to proceed';

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
      setState({
        step: 'USER_ID', data: null, loading: false, error: 'Invalid credentials', reset: true,
      });
    }
  }, [credentialsVerificationError]);

  useEffect(() => {
    if (errorCurrentUser) {
      setState({
        step: 'USER_ID', data: null, loading: false, error: 'An unexpected error occurred', reset: true,
      });
    }
  }, [errorCurrentUser]);

  useEffect(() => {
    if (verifiedUserId) {
      if (verifiedUserId.beginLogin?.step === LoginStepType.Password) {
        setState({
          step: 'PASSWORD', data: verifiedUserId.beginLogin, loading: false, error: null, reset: false,
        });
      } else if (verifiedUserId.beginLogin?.step === LoginStepType.SsoRedirect
        && verifiedUserId.beginLogin.redirectPath) {
        window.location.href = verifiedUserId.beginLogin.redirectPath;
      }
    }
  }, [verifiedUserId]);

  useEffect(() => {
    if (userSession?.passwordLogin?.step === LoginStepType.Complete) {
      const organization = {
        type: userSession.passwordLogin.loginCompleteDomain?.type,
        orgSid: userSession.passwordLogin.tokenUser?.session?.orgSid,
        destination: userSession.passwordLogin.loginCompleteDomain?.selectedPage,
        label: userSession.passwordLogin.tokenUser?.session?.orgName,
        orgId: userSession.passwordLogin.tokenUser?.session?.orgId,
        subNavItems: [],
      };

      const { orgSid } = organization;

      fetchTheme();
      performNavUpdate({ orgSid });
    }
  }, [userSession]);

  useEffect(() => {
    if (dataCurrentUser?.currentUser?.domain && dataCurrentUser?.currentUser?.tokenUser) {
      const organization = {
        type: dataCurrentUser.currentUser.domain.type,
        orgSid: dataCurrentUser.currentUser.tokenUser.session?.orgSid,
        destination: dataCurrentUser.currentUser.domain.selectedPage,
        label: dataCurrentUser.currentUser.tokenUser.session?.orgName,
        orgId: dataCurrentUser.currentUser.tokenUser.session?.orgId,
        subNavItems: [],
      };

      const { orgSid } = organization;

      fetchTheme();
      performNavUpdate({ orgSid });
    }
  }, [dataCurrentUser, loadingCurrentUser]);

  const storeCurrentUser = (tokenUser?: TokenUser | null, domain?: WebAppDomain | null) => {
    const organization = {
      type: domain?.type,
      orgSid: tokenUser?.session?.orgSid,
      destination: domain?.selectedPage,
      label: tokenUser?.session?.orgName,
      orgId: tokenUser?.session?.orgId,
      subNavItems: [],
    };

    SessionStore.setCurrentSession({
      token: tokenUser?.token,
      id: tokenUser?.session?.id,
      orgSid: tokenUser?.session?.orgSid,
      userId: tokenUser?.session?.userId,
      firstName: tokenUser?.session?.firstNm,
      defaultAuthorities: tokenUser?.session?.defaultAuthorities,
    });

    ActiveDomainStore.setOriginOrg(organization);
    ActiveDomainStore.setCurrentOrg(organization);
  };

  useEffect(() => {
    // Wait for the login to happen and for the navigation and theme queries to be done
    if (fetchedTheme && fetchedNav) {
      if (userSession) {
        storeCurrentUser(
          userSession.passwordLogin?.tokenUser,
          userSession.passwordLogin?.loginCompleteDomain,
        );
      }
      if (dataCurrentUser) {
        storeCurrentUser(
          dataCurrentUser.currentUser?.tokenUser,
          dataCurrentUser.currentUser?.domain,
        );
      }
    }
  }, [fetchedTheme, fetchedNav, userSession, dataCurrentUser]);

  return {
    performUserIdVerification,
    performUserAuthentication,
    returnToInitialStep,
    callCurrentUser,
    state,
  };
};
