import React, { useState } from 'react';
import { Row, Column, Container } from '../../../components/layouts';
import { Card } from '../../../components/cards/Card';
import { Spacing } from '../../../components/spacings/Spacing';
import { Text } from '../../../components/typography/Text';
import { PageHeader } from '../../headers/PageHeader';

import { StyledErrorIcon, StyledDiv } from './DashboardErrorBoundary.styles';
import { LayoutAdmin } from '../../../layouts/LayoutAdmin';
import { LayoutDashboard } from '../../../layouts/LayoutDashboard';

const DashboardErrorBoundary = ({ type }) => {
  const isAdmin = type === 'ADMIN';
  const Layout = isAdmin ? LayoutAdmin : LayoutDashboard;

  return (
    <Layout>
      {!isAdmin ? (
        <PageHeader spacing="0">
          <Container>
            <Spacing margin={{ top: 'double' }}>
              <StyledDiv>
                <Card elevantion="smallest">
                  <Row>
                    <Column lg="12" direction="row">
                      <StyledErrorIcon iconName="ErrorBadge" />
                      <Text variant="bold">An error occurred</Text>
                      <Text>&nbsp; — The desired action could not be performed. Please try again.</Text>
                    </Column>
                  </Row>
                </Card>
              </StyledDiv>
            </Spacing>
          </Container>
        </PageHeader>
      ) : (
        <Card elevantion="smallest">
          <Row>
            <Column lg="12" direction="row">
              <StyledErrorIcon iconName="ErrorBadge" />
              <Text variant="bold">An error occurred</Text>
              <Text>&nbsp; — The desired action could not be performed. Please try again.</Text>
            </Column>
          </Row>
        </Card>
      )}
    </Layout>
  );
};

export default DashboardErrorBoundary;
