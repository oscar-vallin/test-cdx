import React from 'react';
import { LayoutLogin } from '../../layouts/LayoutLogin';
import { FormLogin } from '../../containers/forms/FormLogin';
import { Toast } from './../../components/toast';

const _LoginPage = () => {
  const [isLogout, setLogout] = React.useState();

  React.useEffect(() => {
    const logout = localStorage.getItem('LOGOUT');

    if (logout != null) {
      localStorage.removeItem('ADMIN_NAV');

      setTimeout(() => localStorage.removeItem('LOGOUT'), 200);
    }

    setLogout(logout);
  }, []);

  return (
    <LayoutLogin id="PageLogin">
      <FormLogin id="FormLogin" onLogin={() => {}} />
      {isLogout != undefined ? <Toast text={isLogout} duration={5000} /> : null}
    </LayoutLogin>
  );
};

const LoginPage = React.memo(_LoginPage);

export { LoginPage };
