import React, { useEffect, useState } from 'react';
import { RouteType } from 'src/data/constants/RouteConstants';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle, Text } from 'src/components/typography';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { WorkPacketTable } from 'src/containers/tables/WorkPacketTable';
import { SortOrderInput } from 'src/data/services/graphql';
import { WorkPacketColumn } from 'src/containers/tables/WorkPacketColumns';
import { TableFiltersType, useTableFilters } from 'src/hooks/useTableFilters';
import { useFileStatusDetailsPanel } from 'src/pages/FileStatusDetails/useFileStatusDetailsPanel';
import { FileStatusDetailsPanel } from 'src/pages/FileStatusDetails';

type WorkPacketListPageType = {
  id: string;
  pageRoute: RouteType;
  columns: WorkPacketColumn[];
  defaultSort: SortOrderInput[];
  pageDataQuery: any;
  getItems: (any) => any[];
  getTotal: (any) => number;
  pollingQuery?: any;
  renderTotalRecords?: (totalRecords: number, tableFilters: TableFiltersType) => JSX.Element;
};

export const WorkPacketListPage = ({
  id,
  pageRoute,
  columns,
  defaultSort,
  pageDataQuery,
  getItems,
  getTotal,
  pollingQuery,
  renderTotalRecords,
}: WorkPacketListPageType) => {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
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
  }, [fileStatusDetailsPanel]);

  const tableFilters = useTableFilters('Extract Name, Status, Vendor, etc.', defaultSort);

  const handleSetPageTitle = (title: string) => {
    setPageTitle(title);
  };

  const renderUpperRight = () => {
    if (renderTotalRecords) {
      return <span id="__PageTotal">{renderTotalRecords(totalRecords, tableFilters)}</span>;
    }
    return null;
  };

  const renderDetailsPanel = () => {
    if (fileStatusDetailsPanel.fsOrgSid && fileStatusDetailsPanel.workOrderId) {
      return <FileStatusDetailsPanel useFileStatusDetailsPanel={fileStatusDetailsPanel} />;
    }
    return null;
  };

  return (
    <LayoutDashboard id={`__Page_${id}`} menuOptionSelected={pageRoute.API_ID}>
      <PageHeader id={`__${id}Header`}>
        <Container>
          <Row>
            <Column sm="6" direction="row">
              <PageTitle
                id={`__${id}_Title`}
                title={pageTitle}
                subTitle="Advanced search"
                icon="FilterSolid"
                loading={loading}
              />
            </Column>
            <Column sm="6" right>
              <Text size="large" right>
                {renderUpperRight()}
              </Text>
            </Column>
          </Row>
        </Container>
      </PageHeader>

      <WorkPacketTable
        useFileStatusDetailsPanel={fileStatusDetailsPanel}
        id={`__Table${id}`}
        setContextualTitle={handleSetPageTitle}
        routeId={pageRoute.ID}
        cols={columns}
        lazyQuery={pageDataQuery}
        pollingQuery={pollingQuery}
        getItems={getItems}
        tableFilters={tableFilters}
        onLoading={setLoading}
        onItemsListChange={(data) => {
          const total = getTotal(data);
          setTotalRecords(total);
        }}
      />
      {renderDetailsPanel()}
    </LayoutDashboard>
  );
};
