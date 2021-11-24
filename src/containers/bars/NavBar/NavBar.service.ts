import { useState } from 'react';
import { useInputValue } from '../../../hooks/useInputValue';

// useEmailField
export const useLogin = () => {
  const email = useInputValue('Email', '', '', 'email');
  const password = useInputValue('Password', '', '', 'password');

  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const resetEmail = () => {
    setIsEmailValid(false);
  };

  const emailValidation = () => {
    setIsProcessing(true);
    setValidationError('Email Error');

    setTimeout(() => {
      // eslint-disable-next-line
      const validationResult = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email.value);

      if (!validationResult) {
        setValidationError('Invalid e-mail');
      }

      setIsEmailValid(validationResult);
      setIsProcessing(false);
    }, 1000);
  };

  const submitLogin = () => {
    setValidationError('');
    setIsProcessing(true);

    setTimeout(() => {
      const validation = password.value === 'test';

      if (!validation) {
        setValidationError('Invalid password');
      }

      setIsProcessing(false);
    }, 1000);
  };

  return { email, password, isProcessing, isEmailValid, validationError, emailValidation, resetEmail, submitLogin };
};
