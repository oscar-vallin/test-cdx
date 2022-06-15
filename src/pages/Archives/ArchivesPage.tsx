import React, { memo, useState, useEffect } from 'react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { WorkPacketTable } from 'src/containers/tables/WorkPacketTable';
import { WorkPacketColumn } from 'src/containers/tables/WorkPacketColumns';
import {
  NullHandling,
  SortDirection,
  useWorkPacketStatusesLazyQuery,
  useWorkPacketStatusesPollQuery,
  WorkPacketStatus,
} from 'src/data/services/graphql';
import { useTableFilters } from 'src/hooks/useTableFilters';
import { useFileStatusDetailsPanel } from 'src/pages/FileStatusDetails/useFileStatusDetailsPanel';
import { FileStatusDetailsPanel } from '../FileStatusDetails';

const _ArchivePage = () => {
  const [tableMeta, setTableMeta] = useState({ count: 0, loading: true });
  const [pageTitle, setPageTitle] = useState('');
  const fileStatusDetailsPanel = useFileStatusDetailsPanel();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fsOrgSid = urlParams.get('fsOrgSid');
    const tab = urlParams.get('tab');
    const workOrderId = urlParams.get('workOrderId');
    const hash = tab ? `#${tab}` : null;
    if (hash && workOrderId && fsOrgSid) {
      fileStatusDetailsPanel?.showPanel(workOrderId, fsOrgSid, hash);
    }
  }, []);

  const tableFilters = useTableFilters('Extract Name, Status, Vendor, etc.', [
    {
      property: 'timestamp',
      direction: SortDirection.Desc,
      nullHandling: NullHandling.NullsFirst,
      ignoreCase: true,
    },
  ]);

  const handleSetPageTitle = (title: string) => {
    setPageTitle(title);
  };

  const mapData = (data) => {
    const items: WorkPacketStatus[] = [];
    data?.workPacketStatuses?.nodes?.forEach((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  const renderDetailsPanel = () => {
    if (fileStatusDetailsPanel.fsOrgSid && fileStatusDetailsPanel.workOrderId) {
      return <FileStatusDetailsPanel useFileStatusDetailsPanel={fileStatusDetailsPanel} />;
    }
    return null;
  }

  return (
    <LayoutDashboard id="PageArchive" menuOptionSelected={ROUTES.ROUTE_ARCHIVES.API_ID}>
      <PageHeader id="__ArchivesHeader">
        <Container>
          <Row>
            <Column sm="6" direction="row">
              <PageTitle id="__Archives_Title" title={pageTitle} subTitle="Advanced search" icon="FilterSolid" />
            </Column>
            <Column sm="6" right>
              <Text size="large" right>
                {!tableMeta.loading && tableMeta.count !== null && (
                  <span>{tableMeta.count > 0 ? `${tableMeta.count} results found` : 'No results found'}</span>
                )}
              </Text>
            </Column>
          </Row>
        </Container>
      </PageHeader>

      {/* <TableArchive onItemsListChange={setTableMeta} /> */}
      <WorkPacketTable
        id="TableArchive"
        useFileStatusDetailsPanel={fileStatusDetailsPanel}
        setContextualTitle={handleSetPageTitle}
        routeId={ROUTES.ROUTE_ARCHIVES.ID}
        cols={[
          WorkPacketColumn.TIMESTAMP,
          WorkPacketColumn.VENDOR,
          WorkPacketColumn.ORG_ID,
          WorkPacketColumn.CLIENT_FILE,
          WorkPacketColumn.VENDOR_FILE,
        ]}
        lazyQuery={useWorkPacketStatusesLazyQuery}
        pollingQuery={useWorkPacketStatusesPollQuery}
        getItems={mapData}
        tableFilters={tableFilters}
        onItemsListChange={(data, loading) => {
          const total = data?.workPacketStatuses?.paginationInfo?.totalElements ?? 0;
          setTableMeta({ count: total, loading });
        }}
      />
      {renderDetailsPanel()}
    </LayoutDashboard>
  );
};

const ArchivePage = memo(_ArchivePage);

export { ArchivePage };
