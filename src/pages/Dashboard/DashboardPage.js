import React, { useEffect, useState } from 'react';
// components
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { SpinnerSize } from '@fluentui/react';
import { CardDashboard } from '../../containers/cards/CardDashboard';
import { TableDashboard } from '../../containers/tables/TableDashboard';

import { Row, Column, Container } from '../../components/layouts';
import { Spacing } from '../../components/spacings/Spacing';
import { Spinner } from '../../components/spinners/Spinner';
import { Text } from '../../components/typography/Text';
import { PageHeader } from '../../containers/headers/PageHeader';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { StyledRow, StyledButton } from './DashboardPage.styles';
import { useDashboardService } from './DashboardPage.service';

import { TABLE_NAMES } from '../../data/constants/TableConstants';
import { useOrgSid } from '../../hooks/useOrgSid';

// TODO: Change for Session organization ID.
// const ORG_SID = 1;

const _DashboardPage = () => {
  const { orgSid } = useOrgSid();
  const location = useLocation();
  const [urlParams] = useState(queryString.parse(location.search));
  const service = useDashboardService(orgSid);
  const { isLoadingData, datesOptions, dataCounters } = service;
  const { setDateId, dateId } = service;
  const history = useHistory();

  useEffect(() => {
    if (urlParams?.date) {
      setDateId(urlParams.date);
    }

    return () => {
      return null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return datesOptions.map((option, index) => (
      <Spacing margin={{ left: 'normal' }} key={index}>
        <StyledButton
          id={`__Button-${option.id}`}
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

  const pageFallBack = () => {
    return (
      <Spacing margin={{ top: 'double' }}>
        <Spinner size={SpinnerSize.large} label="Fetching dashboard data" />
      </Spacing>
    );
  };

  return (
    <LayoutDashboard id="PageDashboard">
      <React.Suspense fallback={pageFallBack()}>
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
                id="__Transmissions__Billing_Units"
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
                id="__Failed__Files__Billing_Units"
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
                id="__Table_Transmissions_Vendor"
                tableId={TABLE_NAMES.DASHBOARD_TRANSMISSIONS_VENDOR}
                data={dataCounters?.vendorTransmissions}
                altData={dataCounters?.vendorTransmissionsBySpec}
                date={dateId}
                loading={isLoadingData}
                title="Transmissions / BUs by Vendor"
              />
            </Column>
            <Column lg="6">
              <TableDashboard
                id="__Table_Errors_Vendor"
                tableId={TABLE_NAMES.DASHBOARD_ERRORS_VENDOR}
                data={dataCounters?.vendorProcessErrors}
                date={dateId}
                loading={isLoadingData}
                title="Failed Files by Vendor"
              />
            </Column>
          </Row>

          <Row>
            <Column lg="6">
              <TableDashboard
                id="__Table_Transmissions_Files"
                tableId={TABLE_NAMES.DASHBOARD_TRANSMISSIONS_FILES}
                data={dataCounters?.fileTransmissions}
                date={dateId}
                loading={isLoadingData}
                title="Transmissions / BUs by File"
              />
            </Column>
            <Column lg="6">
              <TableDashboard
                id="__Table_Errors_Files"
                tableId={TABLE_NAMES.DASHBOARD_ERRORS_FILES}
                data={dataCounters?.fileProcessErrors}
                date={dateId}
                loading={isLoadingData}
                title="Failed Files by File"
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
