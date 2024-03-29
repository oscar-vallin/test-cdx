import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
  Text,
  Spinner,
  IColumn,
  DetailsListLayoutMode,
  SpinnerSize,
  SelectionMode,
  DetailsList,
} from '@fluentui/react';

import { useExternalOrgsLazyQuery, SortDirection, Organization } from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { ROUTE_EXTERNAL_ORGS } from 'src/data/constants/RouteConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { Row, Column, Container } from 'src/components/layouts';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { PageTitle } from 'src/components/typography';
import { Spacing } from 'src/components/spacings/Spacing';
import { PageBody } from 'src/components/layouts/Column';

const ExternalOrgsPage = () => {
  const { orgSid } = useOrgSid();
  const ActiveDomain = useActiveDomainUseCase();

  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [externalOrganizationQuery, { data, loading }] = useQueryHandler(useExternalOrgsLazyQuery);

  const fetchData = (pageNumber = 0) => {
    externalOrganizationQuery({
      pageableInput: {
        sort: [
          { property: 'name', direction: SortDirection.Asc },
          { property: 'orgId', direction: SortDirection.Asc },
        ],
        pageSize: 100,
        pageNumber,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [orgSid]);

  const changeActiveOrg = (org?: Organization) => {
    ActiveDomain.setCurrentOrg(org?.sid);
  };

  const onRenderOrgName = (item?: Organization, index = 0) => (
    <Link
      id={`__ActiveOrg__Name_Field_${index + 1}`}
      className={item?.orgId}
      to={`/admin/organizations/active-orgs?orgSid=${item?.sid}`}
      onClick={() => changeActiveOrg(item)}
    >
      {item?.name}
    </Link>
  );

  const onRenderItemColumn = (item?: Organization, index?: number, column?: IColumn) => {
    if (item && column) {
      const value = item[column.key];
      return <span title={value}>{value}</span>;
    }
    return '';
  };

  const columns: IColumn[] = [
    {
      name: 'Name',
      key: 'name',
      fieldName: 'name',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 600,
      flexGrow: 1,
      onRender: onRenderOrgName,
    },
    {
      name: 'Org ID',
      key: 'orgId',
      fieldName: 'orgId',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
      onRender: onRenderItemColumn,
    },
    {
      name: 'Org Type',
      key: 'orgTypeLabel',
      fieldName: 'orgTypeLabel',
      data: 'string',
      isPadded: true,
      minWidth: 150,
      maxWidth: 400,
      flexGrow: 1,
      onRender: onRenderItemColumn,
    },
  ];

  useEffect(() => {
    if (!loading && data) {
      setOrgs(data.externalOrgs.nodes);
    }
  }, [data, loading]);

  const renderBody = () => {
    if (loading) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading active orgs" />
        </Spacing>
      );
    }
    if (!orgs.length) {
      return null;
    }
    return (
      <DetailsList
        items={orgs}
        selectionMode={SelectionMode.none}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible
      />
    );
  };
  return (
    <LayoutDashboard id="PageActiveOrgs" menuOptionSelected={ROUTE_EXTERNAL_ORGS.API_ID}>
      <PageHeader id="__ExternalActiveOrgsHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title" title="Organization" />
            </Column>
          </Row>
          <Row>
            <Column lg="6" direction="row">
              {orgs.length > 0 ? (
                <Text>These are organizations you have been granted access to</Text>
              ) : (
                <Text>You have not been granted access to any Organizations</Text>
              )}
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody id="__ExternalOrgsBody">
        <Container>
          <Row>{renderBody()}</Row>
        </Container>
      </PageBody>
    </LayoutDashboard>
  );
};

export { ExternalOrgsPage };
