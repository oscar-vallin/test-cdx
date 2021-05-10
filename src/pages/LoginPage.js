import React from 'react';

import { LayoutLogin } from '../layouts/LayoutLogin';
import { FormLogin } from '../containers/forms/FormLogin';

const LoginPage = () => {
  return (
    <LayoutLogin id="PageLogin">
      <FormLogin id="FormLogin" />
    </LayoutLogin>
  );
};

export { LoginPage };
