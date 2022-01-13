import React from 'react';
import { LayoutLogin } from 'src/layouts/LayoutLogin';
import { FormLogin } from 'src/containers/forms/FormLogin';

const LoginPage = () => {
  return (
    <LayoutLogin id="PageLogin">
      <FormLogin id="__FormLogin" />
    </LayoutLogin>
  );
};

export { LoginPage };
