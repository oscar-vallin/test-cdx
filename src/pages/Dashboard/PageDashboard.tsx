import React from 'react';

import { LayoutHome } from '../../layouts/Home';
import { Text } from '../../components/typography/Text';
import { Container } from './PageDashboard.styles';

const DashboardPage = () => {
  return (
    <LayoutHome id="PageLogin">
      <Container id="LoginForm">
        <Text>DashBoard</Text>
      </Container>
    </LayoutHome>
  );
};

const PageDashboard = React.memo(DashboardPage);

export { PageDashboard };
