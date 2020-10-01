import React from 'react';
import { Button } from '../../components/buttons/Button';
// import { InputText } from '../../components/inputs/InputText';
import { LayoutLogin } from '../../layouts/Login';
import { Text } from '../../components/typography/Text';
import { Container } from './PageLogin.styles';

const LoginPage = () => {
  return (
    <LayoutLogin id="PageLogin">
      <Container id="LoginForm">
        {/* <InputText /> */}
        <Button id="LoginButton">
          <Text>Login</Text>
        </Button>
      </Container>
    </LayoutLogin>
  );
};

const PageLogin = React.memo(LoginPage);

export { PageLogin };
