import { memo } from 'react';
import { Text } from '../../components/typography/Text';
import { Container } from './NotFound.styles';

const PageNotFound = () => {
  return (
    <Container id="NotFoundContainer">
      <Text>NOT FOUND =(</Text>
    </Container>
  );
};

const NotFoundPage = memo(PageNotFound);

export { NotFoundPage };
