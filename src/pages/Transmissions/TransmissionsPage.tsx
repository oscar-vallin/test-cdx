import React, { ReactElement, useState } from 'react';
import { Icon } from '@fluentui/react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { WorkPacketTable } from 'src/containers/tables/WorkPacketTable';
import { WorkPacketColumns } from 'src/containers/tables/WorkPacketColumns';
import { NullHandling, SortDirection, useWpTransmissionsLazyQuery, WpTransmission } from 'src/data/services/graphql';
import { tableFiltersToQueryParams, useTableFilters } from 'src/hooks/useTableFilters';
import { DownloadLink } from 'src/containers/tables/WorkPacketTable.styles';
import { useOrgSid } from 'src/hooks/useOrgSid';

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
    const items: WpTransmission[] = [];
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
      <PageHeader id="__TransmissionsHeader">
        <Container>
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
