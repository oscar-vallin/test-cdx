import React, { useEffect, useState } from 'react';
// components
import { CardDashboard } from '../../containers/cards/CardDashboard';
import { TableDashboard } from '../../containers/tables/TableDashboard';

import { Row, Column, Container } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Spinner } from '../../components/spinners/Spinner';
import { Text } from '../../components/typography/Text';
import { PageHeader } from '../../containers/headers/PageHeader';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { StyledRow, StyledRowDate, StyledColumn, StyledButton, StyledSpinner } from './DashboardPage.styles';
import { useDashboardService } from './DashboardPage.service';

import { TABLE_NAMES } from '../../data/constants/TableConstants';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

// TODO: Change for Session organization ID.
const ORG_SID = 1;

const _DashboardPage = () => {
  const service = useDashboardService(ORG_SID);
  const { isLoadingData, datesOptions, dataCounters } = service;
  const { setDateId, dateId } = service;
  const history = useHistory();
  const location = useLocation();
  const [urlParams, setUrlParams] = useState(queryString.parse(location.search));

  useEffect(() => {
    if (urlParams?.date) {
      setDateId(urlParams.date);
    }

    return () => {
      return null;
    };
  }, []);

  useEffect(() => {
    if (location.search) {
      queryString.parse(location.search);
    }
  }, [location]);

  const handleChangeDate = (date) => {
    setDateId(date);
    history.push(`?date=${date}`);
  };

  // Render Buttons Bar
  const renderDateButtons = () => {
    if (!datesOptions) return null;

    return datesOptions.map((option) => (
      <Spacing margin={{ left: 'normal' }}>
        <StyledButton
          key={`Button-${option.id}`}
          variant={option.selected ? 'primary' : 'secondary'}
          selected={option.selected}
          onClick={() => handleChangeDate(option.id)}
        >
          {option.name}
        </StyledButton> 
      </Spacing>
    ));
  };

  return (
    <LayoutDashboard id="PageDashboard">
      <React.Suspense fallback={
        <Spacing margin={{ top: 'double' }}>
          <Spinner size="lg" label="Fetching dashboard data" />
        </Spacing>
      }>
        <PageHeader spacing="0">
          <Container>
            <Spacing margin={{ top: 'double' }}>
              <Row center>
                <Column lg="6" direction="row">
                  <Text variant="bold">Dashboard</Text>
                  <Text>&nbsp; — Summary</Text>
                </Column>
                <Column lg="6" direction="row" right>
                  {renderDateButtons()}
                </Column>
              </Row>
            </Spacing>
          </Container>
        </PageHeader>
        
        <Container>
          <StyledRow>
            <Column lg="6">
              <CardDashboard
                title="Transmissions"
                subtitle="Billing Units."
                value={dataCounters?.transmissionCount ?? 0}
                total={dataCounters?.billingUnitCount ?? 0}
                color="#219653"
                noDataLabel="No Transmissions"
                loading={isLoadingData}
              />
            </Column>

            <Column lg="6">
              <CardDashboard
                title="Failed Files"
                subtitle="Billing Units."
                value={dataCounters?.processErrorCount ?? 0}
                total={dataCounters?.billingUnitCount ?? 0}
                color="#A80000"
                noDataLabel="No Failed"
                loading={isLoadingData}
              />
            </Column>
          </StyledRow>

          <Row>
            <Column lg="6">
              <TableDashboard
                tableId={TABLE_NAMES.DASHBOARD_TRANSMISSIONS_VENDOR}
                data={dataCounters?.vendorTransmissions}
                altData={dataCounters?.vendorTransmissionsBySpec}
                date={dateId}
              />
            </Column>
            <Column lg="6">
              <TableDashboard
                tableId={TABLE_NAMES.DASHBOARD_ERRORS_VENDOR}
                data={dataCounters?.vendorProcessErrors}
                date={dateId}
              />
            </Column>
          </Row>

          <Row>
            <Column lg="6">
              <TableDashboard
                tableId={TABLE_NAMES.DASHBOARD_TRANSMISSIONS_FILES}
                data={dataCounters?.fileTransmissions}
                date={dateId}
              />
            </Column>
            <Column lg="6">
              <TableDashboard
                tableId={TABLE_NAMES.DASHBOARD_ERRORS_FILES}
                data={dataCounters?.fileProcessErrors}
                date={dateId}
              />
            </Column>
          </Row>
        </Container>
      </React.Suspense>
    </LayoutDashboard>
  );
};

const DashboardPage = React.memo(_DashboardPage);

export { DashboardPage };
