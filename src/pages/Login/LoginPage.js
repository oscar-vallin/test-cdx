import React, { useEffect, useState, memo } from 'react';
import { LayoutLogin } from '../../layouts/LayoutLogin';
import { FormLogin } from '../../containers/forms/FormLogin';
import { Toast } from './../../components/toast';

const _LoginPage = () => {
  const [isLogout, setLogout] = useState();

  useEffect(() => {
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
      {isLogout && <Toast text={isLogout} duration={5000} />}
    </LayoutLogin>
  );
};

const LoginPage = memo(_LoginPage);

export { LoginPage };
