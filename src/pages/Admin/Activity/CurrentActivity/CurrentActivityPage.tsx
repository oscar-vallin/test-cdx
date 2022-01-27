import React, { ReactElement } from 'react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Row, Column, Container } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { TablesCurrentActivity } from 'src/containers/tables/TableCurrentActivity';
import { ROUTE_ACTIVITY_CURRENT } from 'src/data/constants/RouteConstants';
import { PageHeader } from 'src/containers/headers/PageHeader';

const defaultProps = {
  id: '',
};

type CurrentActivityPageProps = {
  id?: string;
} & typeof defaultProps;

export const CurrentActivityPage = ({ id }: CurrentActivityPageProps): ReactElement => {
  return (
    <LayoutDashboard id={id} menuOptionSelected={ROUTE_ACTIVITY_CURRENT.API_ID}>
      <PageHeader id="__CurrentActivityHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Current_Activity_Text" title="Current Activity" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <TablesCurrentActivity id="TableCurrentActivity" />
    </LayoutDashboard>
  );
};

CurrentActivityPage.defaultProps = defaultProps;
