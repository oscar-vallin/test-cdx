import { useState, useEffect } from 'react';
import { useBeginLoginLazyQuery } from '../../data/services/graphql';

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
    // console.log('useEffect, apiData:', apiData);
    // console.log('useEffect, apiLoading:', apiLoading);
    // console.log('useEffect, apiError:', apiError);

    if (apiLoading) {
      return false;
    }

    if (apiError) {
      setValidEmail(false);
    }

    if (data) {
      // console.log('Request Begin Login: ', username);
      // console.log('Response Begin Login: ', apiData);

      // console.log('data.beginLogin: ', apiData.beginLogin);
      // console.log('data.beginLogin.step: ', apiData.beginLogin.step);

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
  const apiBeginLogin = async (__username) => {
    clearState();

    // console.log('apiBeginLogin call', __username);

    const validationResult = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(__username);
    if (!validationResult) {
      setErrorMessage('Invalid Email');
      setValidEmail(false);
      return;
    }

    setUsername(__username);
    const resp = await _apiBeginLogin();

    // console.log('async response', resp);
  };

  const clearState = () => {
    setValidEmail(undefined);
    setErrorMessage(undefined);
    setApiData();
    setApiError();
    setProcessing();
  };

  return { isProcessing, username, isValidEmail, errorMessage, apiBeginLogin, setUsername };
};
