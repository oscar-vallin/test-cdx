import { ReactElement } from 'react';
import { Row, Column } from 'src/components/layouts';
import { Card } from 'src/components/cards/Card';
import { Text } from 'src/components/typography/Text';

import { StyledErrorIcon } from './DashboardErrorBoundary.styles';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';

const DashboardErrorBoundary = (): ReactElement => {
  return (
    <LayoutDashboard id="__DashboardErrorBoundaryId">
      <Card elevation="smallest">
        <Row>
          <Column lg="12" direction="row">
            <StyledErrorIcon iconName="ErrorBadge" />
            <Text variant="bold">An error occurred</Text>
            <Text>&nbsp; — The desired action could not be performed. Please try again.</Text>
          </Column>
        </Row>
      </Card>
    </LayoutDashboard>
  );
};

export default DashboardErrorBoundary;
