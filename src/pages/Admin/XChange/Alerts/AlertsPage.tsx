import React from 'react';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { ROUTE_XCHANGE_ALERTS } from 'src/data/constants/RouteConstants';

const AlertsPage = () => {
  return (
    <LayoutDashboard id="AlertsPage" menuOptionSelected={ROUTE_XCHANGE_ALERTS.API_ID}>
      <PageHeader id="__AlertsHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title_Xchange" title="Alerts" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
    </LayoutDashboard>
  );
};

export { AlertsPage };
