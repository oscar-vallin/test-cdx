import { useState, useEffect } from 'react';
import { useBeginLoginLazyQuery } from '../../data/services/graphql';
import { useCurrentUser } from './useCurrentUser';

export const useLoginBegin = (resetInterval = null) => {
  const [isProcessing, setProcessing] = useState(false);
  const [username, setUsername] = useState();
  const [isValidEmail, setValidEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [apiData, setApiData] = useState();
  const [apiLoading, setApiLoading] = useState();
  const [apiError, setApiError] = useState();
  // const [password, setPassword] = useUsername(_password);
  //
  const [_apiBeginLogin, { data, loading, error }] = useBeginLoginLazyQuery({
    variables: {
      userId: username,
    },
  });

  //*
  useEffect(() => {
    if (data) setApiData(data);
  }, [data]);

  //*
  useEffect(() => {
    setApiError(error);
  }, [error]);

  useEffect(() => {
    if (apiLoading) {
      return false;
    }

    if (apiError) {
      setValidEmail(false);
    }

    if (data) {
      if (apiData?.beginLogin?.step === 'PASSWORD') {
        setValidEmail(true);
      } else {
        setErrorMessage('Please provide a valid email address to proceed');
        setValidEmail();
      }
    }

    setProcessing(false);
  }, [apiData, apiError, apiLoading]);

  useEffect(() => {
    let timeout;
    if (errorMessage && resetInterval) {
      timeout = setTimeout(() => setErrorMessage(undefined), resetInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [errorMessage, isValidEmail]);

  //
  // *
  //

  const editUser = () => {
    setValidEmail(false);
  };

  const validateEmail = (email) => {
    clearState();
    const validationResult = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
    if (validationResult) {
      apiBeginLogin(email);
    } else {
      setValidEmail(false);
      setErrorMessage('Please provide a valid email address to proceed');
    }
  };

  const apiBeginLogin = async (__username) => {
    setUsername(__username);
    await _apiBeginLogin();
  };

  const clearState = () => {
    setValidEmail(undefined);
    setErrorMessage(undefined);
    setApiData();
    setApiError();
    setProcessing();
  };

  return {
    isProcessingBegin: isProcessing,
    username,
    isValidEmail,
    editUser,
    emailError: errorMessage,
    apiBeginLogin,
    setUsername,
    validateEmail,
  };
};
