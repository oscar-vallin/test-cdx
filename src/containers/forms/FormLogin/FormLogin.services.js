import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useInputValue } from '../../../hooks/useInputValue';
import { useAuthContext } from '../../../contexts/AuthContext';

// useEmailField
export const useLogin = () => {
  const email = useInputValue('Email', 'Your email Address', '', 'email');
  const password = useInputValue('Password', 'Password', '', 'password');
  const history = useHistory();

  const { authLogin, isAuthenticating, authError } = useAuthContext();

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [validationError, setValidationError] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false);

  //

  const resetEmail = () => {
    setIsEmailValid(false);
  };

  //
  const setErrorMessage = (errorMessage) => {
    setValidationError(errorMessage);

    setTimeout(() => {
      setValidationError('');
    }, 3000);
  };

  //

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

  //
  const submitLogin = () => {
    setValidationError();
    console.log('SubmitLogin');

    console.log('Email.value: ', email.value);
    console.log('password.value: ', password.value);

    authLogin(email.value, password.value, history);
  };

  //
  useEffect(() => {
    setIsProcessing(isAuthenticating);
  }, [isAuthenticating]);

  //
  useEffect(() => {
    if (authError && authError.message) setValidationError(authError.message);
  }, [authError]);

  //

  return { email, password, isProcessing, isEmailValid, validationError, emailValidation, resetEmail, submitLogin };
};
