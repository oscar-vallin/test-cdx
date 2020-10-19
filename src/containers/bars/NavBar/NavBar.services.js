import React, { useState } from "react";
import { useInputValue } from "../../../hooks/useInputValue";

// useEmailField
export const useLogin = () => {
  const email = useInputValue("Email", "");
  const password = useInputValue("Password", "");

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [validationError, setValidationError] = React.useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const resetEmail = () => {
    setIsEmailValid(false);
  };

  const emailValidation = () => {
    setIsProcessing(true);
    setValidationError();

    console.log(email.value);

    setTimeout(() => {
      // eslint-disable-next-line
      const validationResult = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email.value);

      if (!validationResult) {
        setValidationError("Invalid e-mail");
      }

      setIsEmailValid(validationResult);
      setIsProcessing(false);
    }, 1000);
  };

  const submitLogin = () => {
    setValidationError();
    setIsProcessing(true);

    setTimeout(() => {
      const validation = password.value === "test";

      if (!validation) {
        setValidationError("Invalid password");
      }

      setIsProcessing(false);
    }, 1000);
  };

  return { email, password, isProcessing, isEmailValid, validationError, emailValidation, resetEmail, submitLogin };
};
