import React from 'react';

import { Layout } from '../../layouts/Layout';
import { Text } from '../../components/typography/Text';
import { Container } from './PageNotFound.styles';

const NotFoundPage = () => {
  return (
    <Layout id="PageNotFound">
      <Container id="NotFoundContainer">
        <Text>NOT FOUND =(</Text>
      </Container>
    </Layout>
  );
};

const PageNotFound = React.memo(NotFoundPage);

export { PageNotFound };
