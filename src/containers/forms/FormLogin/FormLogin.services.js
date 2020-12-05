import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useInputValue } from '../../../hooks/useInputValue';
import { ROUTE_DASHBOARD } from '../../../data/constants/RouteConstants';
import { usePasswordLoginMutation } from '../../../data/services/graphql';

// useEmailField
export const useLogin = () => {
  const email = useInputValue('Email', 'Your email Address', '', 'email');
  const password = useInputValue('Password', 'Password', '', 'password');
  const [passwordLoginMutation, { data, loading, error }] = usePasswordLoginMutation({
    variables: {
      userId: email.value,
      password: password.value,
    },
  });

  const history = useHistory();

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [validationError, setValidationError] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false);

  const resetEmail = () => {
    setIsEmailValid(false);
  };

  const routeDashboard = () => {
    history.push(ROUTE_DASHBOARD.URL);
  };

  const setErrorMessage = (errorMessage) => {
    setValidationError(errorMessage);

    setTimeout(() => {
      setValidationError('');
    }, 3000);
  };

  const emailValidation = () => {
    setIsProcessing(true);
    setValidationError();

    setTimeout(() => {
      // eslint-disable-next-line
      const validationResult = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email.value);

      if (!validationResult) {
        setErrorMessage('Invalid e-mail');
      }

      setIsEmailValid(validationResult);
      setIsProcessing(false);
    }, 1000);
  };

  const submitLogin = () => {
    setValidationError();
    console.log('SubmitLogin');

    console.log('Email.value: ', email.value);
    console.log('password.value: ', password.value);
    passwordLoginMutation();
  };

  useEffect(() => {
    console.log('Data:', data);
    console.log('Error: ', error);

    if (data) {
      if ((data?.passwordLogin?.step ?? '') === 'COMPLETE') {
        routeDashboard();
      }
    }
  }, [data, error]);

  useEffect(() => {
    console.log('loading:', loading);
    setIsProcessing(loading);
  }, [loading]);

  return { email, password, isProcessing, isEmailValid, validationError, emailValidation, resetEmail, submitLogin };
};
