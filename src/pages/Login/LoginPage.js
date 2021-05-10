import React from 'react';
import Toast from 'react-toast-component';

import { LayoutLogin } from '../../layouts/LayoutLogin';
import { FormLogin } from '../../containers/forms/FormLogin';

const _LoginPage = () => {
  const [isOpen, setToast] = React.useState(true);
  const [isLogout, setLogout] = React.useState();

  React.useEffect(() => {
    const logout = localStorage.getItem('LOGOUT');

    console.log('token begin: ', logout);

    setLogout(logout);
  }, []);

  return (
    <LayoutLogin id="PageLogin">
      <FormLogin id="FormLogin" onLogin={() => {}} />
      {isLogout === 'logout' ? (
        <Toast
          isOpen={isOpen}
          hasAutoDismiss={true}
          hasCloseBtn
          closeCallback={() => setToast(false)}
          description="Your session has expired please login again."
          title="Session Out"
          duration={3000}
          classNames={['error']} // 'success', 'info', 'warning', 'error'
        />
      ) : null}
    </LayoutLogin>
  );
};

const LoginPage = React.memo(_LoginPage);

export { LoginPage };
