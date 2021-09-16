import { useState, useEffect } from 'react';
import { useBeginLoginLazyQuery } from '../../data/services/graphql';

export const useLoginBegin = (resetInterval = null) => {
  const [isProcessing, setProcessing] = useState(false);
  const [username, setUsername] = useState();
  const [isValidEmail, setValidEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [apiData, setApiData] = useState();
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
    if (loading) {
      return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiData, apiError, loading]);

  useEffect(() => {
    let timeout;
    if (errorMessage && resetInterval) {
      timeout = setTimeout(() => setErrorMessage(undefined), resetInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage, isValidEmail]);

  //
  // *
  //

  const editUser = () => {
    setValidEmail(false);
  };

  const clearState = () => {
    setValidEmail(undefined);
    setErrorMessage(undefined);
    setApiData();
    setApiError();
    setProcessing();
  };

  const apiBeginLogin = async (__username) => {
    setUsername(__username);
    await _apiBeginLogin();
  };

  const validateEmail = (email) => {
    clearState();
    // eslint-disable-next-line no-useless-escape
    const validationResult = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
    if (validationResult) {
      apiBeginLogin(email);
    } else {
      setValidEmail(false);
      setErrorMessage('Please provide a valid email address to proceed');
    }
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
