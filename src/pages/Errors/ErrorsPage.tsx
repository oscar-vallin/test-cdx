import React, { useState, useEffect } from 'react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';

import { WorkPacketTable } from 'src/containers/tables/WorkPacketTable';
import { WorkPacketColumn } from 'src/containers/tables/WorkPacketColumns';
import { NullHandling, SortDirection, useWpProcessErrorsLazyQuery, WorkPacketStatus } from 'src/data/services/graphql';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { useFileStatusDetailsPanel } from 'src/pages/FileStatusDetails/useFileStatusDetailsPanel'
import { FileStatusDetailsPage } from 'src/pages/FileStatusDetails';

const _ErrorsPage = () => {
  const [tableMeta, setTableMeta] = useState({ count: 0, loading: true });
  const [pageTitle, setPageTitle] = useState('')
  const fileStatusDetailsPanel = useFileStatusDetailsPanel();

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const fsOrgSid = urlParams.get('fsOrgSid');
    const tab = urlParams.get('tab');
    const workOrderId = urlParams.get('workOrderId');
    const hash = tab ? `#${tab}` : null; 
    if(hash && workOrderId && fsOrgSid){
      fileStatusDetailsPanel?.showPanel(workOrderId, fsOrgSid, hash);
    }
  },[])

  const tableFilters = useTableFilters('Extract Name, Status, Vendor, etc.', [
    {
      property: 'timestamp',
      direction: SortDirection.Desc,
      nullHandling: NullHandling.NullsFirst,
      ignoreCase: true,
    },
  ]);

  const handleSetPageTitle=(title: string)=>{
    setPageTitle(title)
  }

  const mapData = (data) => {
    const items: WorkPacketStatus[] = [];
    data?.wpProcessErrors?.nodes?.forEach((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  return (
    <LayoutDashboard id="PageErrors" menuOptionSelected={ROUTES.ROUTE_ERRORS.API_ID}>
      <PageHeader id="__ErrorsPageHeader">
        <Container>
          <Row>
            <Column sm="6" direction="row">
              <PageTitle id="__Errors_Title" title={pageTitle} subTitle="Advanced search" icon="FilterSolid" />
            </Column>
            <Column sm="6" right>
              <Text size="large" right>
                {!tableMeta.loading && tableMeta.count !== null && tableMeta.count > 0
                  ? `${tableMeta.count} results found`
                  : 'No results found'}
              </Text>
            </Column>
          </Row>
        </Container>
      </PageHeader>

      <WorkPacketTable
        id="TableFileStatus"
        useFileStatusDetailsPanel={fileStatusDetailsPanel}
        setContextualTitle={handleSetPageTitle}
        cols={[
          WorkPacketColumn.START_TIME,
          WorkPacketColumn.INBOUND_FILENAME,
          WorkPacketColumn.STEP,
          WorkPacketColumn.PLAN_SPONSOR,
          WorkPacketColumn.VENDOR,
          WorkPacketColumn.MESSAGE,
        ]}
        lazyQuery={useWpProcessErrorsLazyQuery}
        getItems={mapData}
        tableFilters={tableFilters}
        onItemsListChange={(data, loading) => {
          const total = data?.wpProcessErrors?.paginationInfo?.totalElements ?? 0;
          setTableMeta({ count: total, loading });
        }}
      />
      <FileStatusDetailsPage
        useFileStatusDetailsPanel={fileStatusDetailsPanel}
      ></FileStatusDetailsPage>
    </LayoutDashboard>
  );
};

const ErrorsPage = React.memo(_ErrorsPage);

export { ErrorsPage };
