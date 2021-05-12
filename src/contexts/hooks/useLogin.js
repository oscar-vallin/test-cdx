import { useState, useEffect } from 'react';
import { useBeginLoginLazyQuery } from '../../data/services/graphql';
import { useCurrentUser } from './useCurrentUser';

export const useLoginBegin = (_username, _password) => {
  const [isProcessing, setProcessing] = useState(false);
  const [username, setUsername] = useState(_username);
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
        setErrorMessage('Wrong Email Username');
        setValidEmail();
      }
    }

    setProcessing(false);
  }, [apiData, apiError, apiLoading]);

  //
  // *
  //

  const editUser = () => {
    setValidEmail(false);
  };
  const apiBeginLogin = async (__username) => {
    clearState();

    const validationResult = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(__username);
    if (!validationResult) {
      setErrorMessage('Invalid Email');
      setValidEmail(false);
      return;
    }

    setUsername(__username);

    const resp = await _apiBeginLogin();
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
    errorMessage,
    apiBeginLogin,
    setUsername,
  };
};
