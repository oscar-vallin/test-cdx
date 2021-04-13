import React from 'react';

import { LayoutLogin } from '../../layouts/LayoutLogin';
import { FormLogin } from '../../containers/forms/FormLogin';
import { useCurrentUser } from '../../contexts/hooks/useCurrentUser';

const _LoginPage = () => {
  return (
    <LayoutLogin id="PageLogin">
      <FormLogin id="FormLogin" onLogin={() => {}} />
    </LayoutLogin>
  );
};

const LoginPage = React.memo(_LoginPage);

export { LoginPage };
