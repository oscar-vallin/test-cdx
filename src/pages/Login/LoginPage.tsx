import React from 'react';
import { LayoutLogin } from 'src/layouts/LayoutLogin';
import { FormLogin } from 'src/containers/forms/FormLogin';

const LoginPage = () => (
  <LayoutLogin id="PageLogin">
    <FormLogin id="__FormLogin" />
  </LayoutLogin>
);

export { LoginPage };
