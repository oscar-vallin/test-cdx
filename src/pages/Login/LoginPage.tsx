import React, { memo } from 'react';
import { LayoutLogin } from '../../layouts/LayoutLogin';
import { FormLogin } from '../../containers/forms/FormLogin';

const _LoginPage = () => {
  return (
    <LayoutLogin id="PageLogin">
      <FormLogin id="__FormLogin" />
    </LayoutLogin>
  );
};

const LoginPage = memo(_LoginPage);

export { LoginPage };
