import React from 'react';
import { useHistory } from 'react-router-dom';
import { useInputValue } from '../../../hooks/useInputValue';
import { ROUTE_DASHBOARD } from '../../../data/constants/RouteConstants';

// useEmailField
export const useLogin = () => {
  const email = useInputValue('Email', 'Your email Address', '', 'email');
  const password = useInputValue('Password', 'Password', '', 'password');
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
    setIsProcessing(true);

    setTimeout(() => {
      const validation = password.value === 'test';

      if (!validation) {
        setErrorMessage('Invalid password');
        setIsProcessing(false);
        return;
      }

      // Route to Dashboard
      routeDashboard();
    }, 1000);
  };

  return { email, password, isProcessing, isEmailValid, validationError, emailValidation, resetEmail, submitLogin };
};
