import React from 'react';
import { PrimaryButton } from '@fluentui/react';
import { Container, Button, Result } from './Login.styles';
import { useFileGetQuery, useLoginStepQuery } from '../../services/graphql';
import { SubData } from '../../components/SubData';

export const LoginPage = () => {
  const [userId, setUserId] = React.useState('');
  const [fileId, setFileId] = React.useState('1');

  const fileGetResult = useFileGetQuery({
    variables: {
      id: fileId,
    },
  });

  const { data, loading, error } = useLoginStepQuery({
    variables: {
      userId,
    },
  });

  const handleLogin = () => {
    console.log('Click');
    setUserId('2');
  };

  console.log({ fileData: fileGetResult.data });

  console.log({ getFile: fileGetResult.data?.fileGet?.status ?? 'Not Loaded' });

  return (
    <Container>
      <PrimaryButton text="Login" onClick={handleLogin} />
      {loading && <Result>Loading...</Result>}
      {error && <Result>Error, Try again.</Result>}
      {data?.beginLogin && <Result>{data.beginLogin.userId}</Result>}
      <SubData value={fileGetResult.data?.fileGet?.status ?? 'Not Loaded'} />
    </Container>
  );
};
