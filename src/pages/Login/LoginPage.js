import React from 'react';
import { LayoutLogin } from '../../layouts/LayoutLogin';
import { FormLogin } from '../../containers/forms/FormLogin';
import { Toast } from './../../components/toast';

const _LoginPage = () => {
  const [isLogout, setLogout] = React.useState();

  React.useEffect(() => {
    const logout = localStorage.getItem('LOGOUT');
    const login = localStorage.getItem('LOGIN');

    if (logout != null) {
      console.log('token begin: ', logout);
      setTimeout(() => localStorage.removeItem('LOGOUT'), 9000);
    }

    if (login != null) {
      console.log('token begin: ', login);
      localStorage.removeItem('LOGIN');
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
