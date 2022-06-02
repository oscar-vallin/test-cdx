import React, { useEffect } from 'react';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { ROUTE_XCHANGE_LIST } from 'src/data/constants/RouteConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useXchangeProfileLazyQuery } from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';

const XChangePage = () => {
    const { orgSid } = useOrgSid();

    const [xchangeProfile, { data: dataXchange, loading: loadingXchange, error: errorXchange } ] = useQueryHandler(useXchangeProfileLazyQuery);

  const fetchData = () => {
    xchangeProfile({
      variables: {
        orgSid,
      },
    });
  };

    useEffect(() => {
        fetchData();
    }, [useOrgSid]);

    useEffect(() => {
        console.log(dataXchange);
    }, [dataXchange]);

    return (
        <LayoutDashboard id='PageXChangePage' menuOptionSelected={ROUTE_XCHANGE_LIST.API_ID}>
          <PageHeader id="__ActiveUsersHeader">
                <Container>
                <Row>
                    <Column lg="6" direction="row">
                    <PageTitle id="__Page_Title" title="Xchange Profile" />
                    </Column>
                </Row>
                </Container>
            </PageHeader>
        </LayoutDashboard>
    )
};

export { XChangePage };
