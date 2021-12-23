import React, { ReactElement, useState } from 'react';
import { Icon } from 'office-ui-fabric-react';
import { ROUTES } from '../../data/constants/RouteConstants';
import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { Column, Container, Row } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { PageTitle, Text } from '../../components/typography';
import { PageHeader } from '../../containers/headers/PageHeader';
import { WorkPacketTable } from '../../containers/tables/WorkPacketTable';
import { WorkPacketColumns } from '../../containers/tables/WorkPacketColumns';
import { NullHandling, SortDirection, useWpTransmissionsLazyQuery } from '../../data/services/graphql';
import { tableFiltersToQueryParams, useTableFilters } from '../../hooks/useTableFilters';
import { DownloadLink } from '../../containers/tables/WorkPacketTable.styles';
import { useOrgSid } from '../../hooks/useOrgSid';

const _TransmissionsPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: 0, loading: true });
  const { orgSid } = useOrgSid();
  const tableFilters = useTableFilters('Extract Name, Status, Vendor, etc.', [
    {
      property: 'deliveredOn',
      direction: SortDirection.Desc,
      nullHandling: NullHandling.NullsFirst,
      ignoreCase: true,
    },
  ]);

  const mapData = (data) => {
    const items: object[] = [];
    data?.wpTransmissions?.nodes?.map((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  const renderTotalRecords = (): ReactElement => {
    if (!tableMeta.loading && tableMeta.count !== null) {
      return <span>{tableMeta.count > 0 ? `${tableMeta.count} results found` : 'No results were found'}</span>;
    }

    return <span />;
  };

  const renderDownloadLink = (): ReactElement => {
    const graphQLUrl = process.env.REACT_APP_API_SERVER;
    const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

    if (!tableMeta.loading && tableMeta.count > 0) {
      const filterString = tableFiltersToQueryParams(tableFilters);
      return (
        <DownloadLink
          target="_new"
          href={`${serverUrl}excel/transmissions?orgSid=${orgSid}${filterString}`}
          title="Download results as Excel"
        >
          <Icon iconName="ExcelDocument" />
        </DownloadLink>
      );
    }

    return <span />;
  };

  return (
    <LayoutDashboard id="PageTransmissions" menuOptionSelected={ROUTES.ROUTE_TRANSMISSIONS.API_ID}>
      <PageHeader spacing="0">
        <Container>
          <Spacing margin={{ top: 'double' }}>
            <Row>
              <Column lg="6" direction="row">
                <PageTitle
                  id="__Transmissions_Title"
                  title="Transmissions"
                  subTitle="Advanced search"
                  icon="FilterSolid"
                />
              </Column>
              <Column lg="6" right>
                <Text right>
                  {renderDownloadLink()}
                  {renderTotalRecords()}
                </Text>
              </Column>
            </Row>
          </Spacing>
        </Container>
      </PageHeader>

      <WorkPacketTable
        id="TableTransmissions"
        cols={[
          WorkPacketColumns.DATETIME,
          WorkPacketColumns.PLAN_SPONSOR,
          WorkPacketColumns.VENDOR,
          WorkPacketColumns.SPEC_ID,
          WorkPacketColumns.IMPLEMENTATION,
          WorkPacketColumns.INBOUND_FILENAME,
          WorkPacketColumns.OUTBOUND_FILENAME,
          WorkPacketColumns.OUTBOUND_FILESIZE,
          WorkPacketColumns.BILLING_COUNT,
          WorkPacketColumns.TOTAL_RECORDS,
          WorkPacketColumns.EXTRACT_TYPE,
          WorkPacketColumns.EXTRACT_VERSION,
        ]}
        lazyQuery={useWpTransmissionsLazyQuery}
        getItems={mapData}
        tableFilters={tableFilters}
        onItemsListChange={(data, loading) => {
          const total = data?.wpTransmissions?.paginationInfo?.totalElements ?? 0;
          setTableMeta({ count: total, loading });
        }}
      />
    </LayoutDashboard>
  );
};

const TransmissionsPage = React.memo(_TransmissionsPage);

export { TransmissionsPage };
