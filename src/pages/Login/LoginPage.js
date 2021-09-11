import React, { useEffect, useState, memo } from 'react';
import { LayoutLogin } from '../../layouts/LayoutLogin';
import { FormLogin } from '../../containers/forms/FormLogin';
import { useNotification } from '../../contexts/hooks/useNotification';

const _LoginPage = () => {
  // const [isLogout, setLogout] = useState();
  // const Toast = useNotification();

  // useEffect(() => {
  //   if (isLogout) {
  //     Toast.error({ text: isLogout });
  //   }
  // }, [isLogout]);

  // useEffect(() => {
  //   const logout = localStorage.getItem('LOGOUT');

  //   if (logout != null) {
  //     localStorage.removeItem('ADMIN_NAV');

  //     setTimeout(() => localStorage.removeItem('LOGOUT'), 200);
  //   }

  //   setLogout(logout);
  // }, []);

  return (
    <LayoutLogin id="PageLogin">
      <FormLogin />
    </LayoutLogin>
  );
};

const LoginPage = memo(_LoginPage);

export { LoginPage };
