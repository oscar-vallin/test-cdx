import React, { useState } from 'react';
import { Text } from '../../components/typography/Text';
import { Container } from './NotFound.styles';

const PageNotFound = () => {
  return (
    <Container id="NotFoundContainer">
      <Text>NOT FOUND =(</Text>
    </Container>
  );
};

const NotFoundPage = React.memo(PageNotFound);

export { NotFoundPage };
