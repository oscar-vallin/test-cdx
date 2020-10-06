import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, ButtonText } from '../../components/buttons';
import { InputText } from '../../components/inputs/InputText/InputText.js';
import { LayoutLogin } from '../../layouts/Login';
import { Text } from '../../components/typography/Text';
import { Logo } from '../../components/typography/Logo';
import {
  Container,
  Row,
  RowInput,
  RowUsername,
  Username,
  RowForgot,
  RowBack,
  LinkText,
  RowButton,
  TextIcon,
  TextBack,
} from './PageLogin.styles';
import { useInputValue } from '../../hooks/useInputValue.js';
import { useLoginStepQuery } from '../../services/graphql';

const LoginPage = () => {
  const history = useHistory();

  const [stepPassword, setStepPassword] = React.useState(false);
  const username = useInputValue('', 'email', 'Username');
  const password = useInputValue('', 'password', 'Password');
  const [userId, setUserId] = React.useState('');

  const { data } = useLoginStepQuery({
    variables: {
      userId,
    },
  });

  const onClick = () => {
    console.log({ username });
    setStepPassword(true);
  };

  const onSubmit = () => {
    console.log({ username, password });
    setUserId(username.value);
  };

  React.useEffect(() => {
    console.log({ data });
    if (!!userId && data) {
      history.push('/dashboard');
    }
  }, [history, data, userId]);

  return (
    <LayoutLogin id="PageLogin">
      <Container id="LoginForm">
        {!!stepPassword && (
          <RowBack>
            <ButtonText id="BackButton" onClick={() => setStepPassword(false)}>
              <TextIcon>{'<'}</TextIcon>
              <TextBack>Back</TextBack>
            </ButtonText>
          </RowBack>
        )}
        <Row>
          <Logo>CDX</Logo>
        </Row>
        {!stepPassword && (
          <>
            <Row>
              <Text>Enter your email address.</Text>
            </Row>
            <RowInput>
              <InputText field={username} />
            </RowInput>
            <Row>
              <Button id="LoginButton" onClick={() => onClick()}>
                <Text>Next</Text>
              </Button>
            </Row>
          </>
        )}
        {!!stepPassword && (
          <>
            <RowUsername>
              <Username>{username.value}</Username>
              <Text>Enter your password.</Text>
            </RowUsername>
            <RowInput>
              <InputText field={password} />
            </RowInput>
            <RowForgot>
              <ButtonText id="LinkButtonText">
                <LinkText>Forgot your Password?</LinkText>
              </ButtonText>
            </RowForgot>
            <RowButton>
              <Button id="LoginButton" onClick={() => onSubmit()}>
                <Text>Login</Text>
              </Button>
            </RowButton>
          </>
        )}
      </Container>
    </LayoutLogin>
  );
};

const PageLogin = React.memo(LoginPage);

export { PageLogin };
