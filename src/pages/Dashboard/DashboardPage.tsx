import React, { useEffect } from 'react';
// components
import { useHistory, useLocation } from 'react-router-dom';
import { SpinnerSize } from '@fluentui/react';
import { CardDashboard } from 'src/containers/cards/CardDashboard';
import { TableDashboard } from 'src/containers/tables/TableDashboard';

import { Column, Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Spinner } from 'src/components/spinners/Spinner';
import { PageHeader } from 'src/containers/headers/PageHeader';

import { LayoutDashboard } from 'src/layouts/LayoutDashboard';

import { TABLE_NAMES } from 'src/data/constants/TableConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { PageTitle } from 'src/components/typography';
import { useDashboardService } from './DashboardPage.service';
import { StyledButton, StyledRow } from './DashboardPage.styles';
import { ROUTE_DASHBOARD } from 'src/data/constants/RouteConstants';
import { InputDateRange } from 'src/components/inputs/InputDateRange';
import { useDateValue, useEndDateValue } from 'src/hooks/useDateValue';
import { yyyyMMdd } from 'src/utils/CDXUtils';

const DashboardPage = () => {
  const { orgSid, startDate, endDate } = useOrgSid();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const dateParam = urlParams.get('date');
  const service = useDashboardService(orgSid, startDate ? 'custom' : dateParam);
  const { isLoadingData, datesOptions, dataCounters, getPeriodCounts }: any = service;
  const { setDateId, dateId } = service;
  const history = useHistory();
  const fromDate = useDateValue('', startDate ? new Date(`${startDate}T00:00:00.000`) : new Date());
  const toDate = useEndDateValue('', endDate ? new Date(`${endDate}T23:59:59.999`) : new Date());

  const handleChangeDate: any = (dateType: string, startDate?: Date, endDate?: Date) => {
    setDateId(dateType);

    if (dateType !== 'custom') {
      history.push(`?date=${dateType}&orgSid=${orgSid}`);
    } else if (startDate && endDate) {
      history.push(
        `?startDate=${yyyyMMdd(startDate)}&endDate=${yyyyMMdd(endDate)}&orgSid=${orgSid}`
      );
    } else {
      history.push(
        `?startDate=${yyyyMMdd(fromDate.value)}&endDate=${yyyyMMdd(toDate.value)}&orgSid=${orgSid}`
      );
    }
  };

  useEffect(() => {
    history.push(
      `?startDate=${yyyyMMdd(fromDate.value)}&endDate=${yyyyMMdd(toDate.value)}&orgSid=${orgSid}`
    );
  }, [fromDate.value, toDate.value]);

  useEffect(() => {
    if (dateId === 'custom') {
      getPeriodCounts(fromDate.value, toDate.value);
    }
  }, [fromDate.value, toDate.value, dateId]);

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

  const renderCountsByFile = () => {
    if (dataCounters?.showCountsByFile !== true) {
      return <span />;
    }

    return (
      <Row>
        <Column lg="6">
          <TableDashboard
            id="__Table_Transmissions_Files"
            tableId={TABLE_NAMES.DASHBOARD_TRANSMISSIONS_FILES}
            data={dataCounters?.fileTransmissions}
            altData={[]}
            date={dateId}
            loading={isLoadingData}
            title="Transmissions / BUs by File"
            emptyMessage="None"
          />
        </Column>
        <Column lg="6">
          <TableDashboard
            id="__Table_Errors_Files"
            tableId={TABLE_NAMES.DASHBOARD_ERRORS_FILES}
            data={dataCounters?.fileProcessErrors}
            altData={[]}
            date={dateId}
            loading={isLoadingData}
            title="Failed Files by File"
            emptyMessage="None"
          />
        </Column>
      </Row>
    );
  };

  const renderCountsByPlanSponsor = () => {
    if (dataCounters?.showCountsByPlanSponsor !== true) {
      return <span />;
    }

    return (
      <Row>
        <Column lg="6">
          <TableDashboard
            id="__Table_Transmissions_PlanSponsor"
            tableId={TABLE_NAMES.DASHBOARD_TRANSMISSIONS_PLANSPONSOR}
            data={dataCounters?.planSponsorTransmissions}
            altData={[]}
            date={dateId}
            loading={isLoadingData}
            title="Transmissions / BUs by Plan Sponsor"
            emptyMessage="None"
          />
        </Column>
        <Column lg="6">
          <TableDashboard
            id="__Table_Errors_PlanSponsor"
            tableId={TABLE_NAMES.DASHBOARD_ERRORS_PLANSPONSOR}
            data={dataCounters?.planSponsorProcessErrors}
            altData={[]}
            date={dateId}
            loading={isLoadingData}
            title="Failed Files by Plan Sponsor"
            emptyMessage="None"
          />
        </Column>
      </Row>
    );
  };

  return (
    <LayoutDashboard id="PageDashboard" menuOptionSelected={ROUTE_DASHBOARD.API_ID}>
      <React.Suspense fallback={pageFallBack()}>
        <PageHeader spacing="0">
          <Container>
            <Row center>
              <Column lg="6" direction="row">
                <PageTitle id="__Page_Title" title="Dashboard" subTitle="Summary" />
              </Column>
              <Column lg="6" direction="row" right>
                {renderDateButtons()}
              </Column>
            </Row>

            <br />

            {dateId === 'custom' && (
              <Row>
                <Column lg="6" />
                <Column lg="6">
                  <InputDateRange startDate={fromDate} endDate={toDate} showLabels={false}/>
                </Column>
              </Row>
            )}
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
                emptyMessage="None"
              />
            </Column>
            <Column lg="6">
              <TableDashboard
                id="__Table_Errors_Vendor"
                tableId={TABLE_NAMES.DASHBOARD_ERRORS_VENDOR}
                data={dataCounters?.vendorProcessErrors}
                altData={[]}
                date={dateId}
                loading={isLoadingData}
                title="Failed Files by Vendor"
                emptyMessage="None"
              />
            </Column>
          </Row>

          {renderCountsByFile()}

          {renderCountsByPlanSponsor()}
        </Container>
      </React.Suspense>
    </LayoutDashboard>
  );
};

export { DashboardPage };
