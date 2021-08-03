import React from 'react';
import { Row, Column, Container } from '../../../components/layouts';
import { Card } from '../../../components/cards/Card';
import { Spacing } from '../../../components/spacings/Spacing';
import { Text } from '../../../components/typography/Text';
import { PageHeader } from '../../headers/PageHeader';
import { LayoutDashboard } from '../../../layouts/LayoutDashboard';

import { StyledErrorIcon, StyledDiv } from './GenericErrorBoundary.styles';

const GenericErrorBoundary = () => {
  return (
    <LayoutDashboard>
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
    </LayoutDashboard>
  );
};

export default GenericErrorBoundary;
