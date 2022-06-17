import React, { useEffect, useState } from 'react';
// components
import { useHistory, useLocation } from 'react-router-dom';
import { endOfMonth, endOfYesterday, startOfDay, startOfMonth, startOfYesterday, subMonths } from 'date-fns';
import { SpinnerSize } from '@fluentui/react';
import { CardDashboard } from 'src/containers/cards/CardDashboard';

import { Column, Container, Row } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Spinner } from 'src/components/spinners/Spinner';
import { PageHeader } from 'src/containers/headers/PageHeader';

import { LayoutDashboard } from 'src/layouts/LayoutDashboard';

import { useOrgSid } from 'src/hooks/useOrgSid';
import { PageTitle } from 'src/components/typography';
import { ROUTE_DASHBOARD } from 'src/data/constants/RouteConstants';
import { InputDateRange } from 'src/components/inputs/InputDateRange';
import { useDateValue, useEndDateValue } from 'src/hooks/useDateValue';
import { yyyyMMdd } from 'src/utils/CDXUtils';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import {
  DashboardPeriodCounts,
  useDashboardPeriodCountsLazyQuery,
  useDashboardPeriodsLazyQuery,
} from 'src/data/services/graphql';
import { DashboardErrorsTable } from 'src/pages/Dashboard/DashboardErrorsTable';
import { TransmissionsByVendorTable } from 'src/pages/Dashboard/TransmissionsByVendorTable';
import { DashboardTransmissionsTable } from 'src/pages/Dashboard/DashboardTransmissionsTable';
import { DateRangeButton, StyledRow } from './DashboardPage.styles';

const DATE_OPTION_NAME = {
  today: 'today',
  yesterday: 'yesterday',
  thisMonth: 'thisMonth',
  lastMonth: 'lastMonth',
  custom: 'custom',
};

const DashboardPage = () => {
  const { orgSid, startDate, endDate } = useOrgSid();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const dateParam = urlParams.get('date');

  const [dateRangeType, setDateRangeType] = useState(
    (startDate != null ? DATE_OPTION_NAME.custom : dateParam) ?? DATE_OPTION_NAME.today
  );
  const history = useHistory();
  const fromDate = useDateValue('', startDate ? new Date(`${startDate}T00:00:00.000`) : new Date());
  const toDate = useEndDateValue('', endDate ? new Date(`${endDate}T23:59:59.999`) : new Date());

  const [dashboardPeriodCounts, setDashboardPeriodCounts] = useState<DashboardPeriodCounts | null>();

  const handleError = ErrorHandler();

  const [
    callDashboardPeriods,
    { data: dataDashboardPeriods, loading: loadingDashboardPeriods, error: errorDashboardPeriods },
  ] = useDashboardPeriodsLazyQuery();

  const [
    callCustomDashboardPeriod,
    { data: dataCustomDashboardPeriod, loading: loadingCustomDashboardPeriod, error: errorCustomDashboardPeriod },
  ] = useDashboardPeriodCountsLazyQuery();

  useEffect(() => {
    handleError(errorDashboardPeriods);
  }, [errorDashboardPeriods, handleError]);
  useEffect(() => {
    handleError(errorCustomDashboardPeriod);
  }, [errorCustomDashboardPeriod, handleError]);

  useEffect(() => {
    if (!loadingDashboardPeriods && dataDashboardPeriods) {
      switch (dateRangeType) {
        case DATE_OPTION_NAME.today:
          setDashboardPeriodCounts(dataDashboardPeriods.dashboardPeriods?.dailyCounts);
          break;
        case DATE_OPTION_NAME.yesterday:
          setDashboardPeriodCounts(dataDashboardPeriods.dashboardPeriods?.yesterdayCounts);
          break;
        case DATE_OPTION_NAME.thisMonth:
          setDashboardPeriodCounts(dataDashboardPeriods.dashboardPeriods?.monthlyCounts);
          break;
        case DATE_OPTION_NAME.lastMonth:
          setDashboardPeriodCounts(dataDashboardPeriods.dashboardPeriods?.lastMonthlyCounts);
          break;
        default:
          break;
      }
    }
  }, [dataDashboardPeriods, loadingDashboardPeriods, dateRangeType]);

  useEffect(() => {
    if (!loadingCustomDashboardPeriod && dataCustomDashboardPeriod) {
      setDashboardPeriodCounts(dataCustomDashboardPeriod.dashboardPeriodCounts);
    }
  }, [dataCustomDashboardPeriod, loadingCustomDashboardPeriod]);

  const handleChangeDate: any = (dateType: string) => {
    setDateRangeType(dateType);

    const _newDate = new Date();

    switch (dateType) {
      case DATE_OPTION_NAME.today:
        fromDate.setValue(startOfDay(_newDate));
        toDate.setValue(startOfDay(_newDate));
        break;
      case DATE_OPTION_NAME.yesterday:
        fromDate.setValue(startOfYesterday());
        toDate.setValue(endOfYesterday());
        break;
      case DATE_OPTION_NAME.thisMonth:
        fromDate.setValue(startOfMonth(_newDate));
        toDate.setValue(endOfMonth(_newDate));
        break;
      case DATE_OPTION_NAME.lastMonth:
        fromDate.setValue(startOfMonth(subMonths(_newDate, 1)));
        toDate.setValue(endOfMonth(subMonths(_newDate, 1)));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (dateRangeType === DATE_OPTION_NAME.custom) {
      history.push(`?startDate=${yyyyMMdd(fromDate.value)}&endDate=${yyyyMMdd(toDate.value)}&orgSid=${orgSid}`);
    } else {
      history.push(`?date=${dateRangeType}&orgSid=${orgSid}`);
    }
  }, [dateRangeType, fromDate.value, toDate.value]);

  useEffect(() => {
    if (dateRangeType === 'custom' && fromDate.value && toDate.value) {
      callCustomDashboardPeriod({
        variables: {
          orgSid,
          dateRange: {
            rangeStart: fromDate.value,
            rangeEnd: toDate.value,
          },
        },
      });
    } else {
      callDashboardPeriods({
        variables: {
          orgSid,
        },
      });
    }
  }, [fromDate.value, toDate.value, dateRangeType]);

  // Render Buttons Bar
  const renderDateButtons = () => {
    const dateOptions = [
      {
        id: DATE_OPTION_NAME.today,
        selected: dateRangeType === DATE_OPTION_NAME.today,
        label: 'Today',
      },
      {
        id: DATE_OPTION_NAME.yesterday,
        selected: dateRangeType === DATE_OPTION_NAME.yesterday,
        label: 'Yesterday',
      },
      {
        id: DATE_OPTION_NAME.thisMonth,
        selected: dateRangeType === DATE_OPTION_NAME.thisMonth,
        label: 'Month',
      },
      {
        id: DATE_OPTION_NAME.lastMonth,
        selected: dateRangeType === DATE_OPTION_NAME.lastMonth,
        label: 'Last Month',
      },
      {
        id: DATE_OPTION_NAME.custom,
        selected: dateRangeType === DATE_OPTION_NAME.custom,
        label: 'Custom',
      },
    ];
    return dateOptions.map((option, index) => (
      <Spacing margin={{ left: 'normal' }} key={index}>
        <DateRangeButton
          id={`__Button-${option.id}`}
          key={`Button-${option.id}`}
          variant={option.selected ? 'primary' : 'secondary'}
          selected={option.selected}
          onClick={() => handleChangeDate(option.id)}
        >
          {option.label}
        </DateRangeButton>
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
    if (dashboardPeriodCounts?.showCountsByFile !== true) {
      return null;
    }

    return (
      <Row>
        <Column lg="6">
          <DashboardTransmissionsTable
            id="__Table_Transmissions_Files"
            title="Transmissions / BUs by File"
            orgSid={orgSid}
            startDate={fromDate.value}
            endDate={toDate.value}
            items={dashboardPeriodCounts.fileTransmissions ?? []}
          />
        </Column>
        <Column lg="6">
          <DashboardErrorsTable
            id="__Table_Errors_Files"
            title="Failed Files by File"
            orgSid={orgSid}
            startDate={fromDate.value}
            endDate={toDate.value}
            items={dashboardPeriodCounts.fileProcessErrors ?? []}
          />
        </Column>
      </Row>
    );
  };

  const renderCountsByPlanSponsor = () => {
    if (dashboardPeriodCounts?.showCountsByPlanSponsor !== true) {
      return null;
    }

    return (
      <Row>
        <Column lg="6">
          <DashboardTransmissionsTable
            id="__Table_Transmissions_PlanSponsor"
            title="Transmissions / BUs by Plan Sponsor"
            orgSid={orgSid}
            startDate={fromDate.value}
            endDate={toDate.value}
            items={dashboardPeriodCounts.planSponsorTransmissions ?? []}
          />
        </Column>
        <Column lg="6">
          <DashboardErrorsTable
            id="__Table_Errors_PlanSponsor"
            title="Failed Files by Plan Sponsor"
            orgSid={orgSid}
            startDate={fromDate.value}
            endDate={toDate.value}
            items={dashboardPeriodCounts.planSponsorProcessErrors ?? []}
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

            {dateRangeType === DATE_OPTION_NAME.custom && (
              <Row>
                <Column lg="6" />
                <Column lg="6">
                  <InputDateRange startDate={fromDate} endDate={toDate} showLabels={false} />
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
                value={dashboardPeriodCounts?.transmissionCount ?? 0}
                total={dashboardPeriodCounts?.billingUnitCount ?? 0}
                color="#219653"
                noDataLabel="No Transmissions"
                loading={loadingDashboardPeriods || loadingCustomDashboardPeriod}
              />
            </Column>

            <Column lg="6">
              <CardDashboard
                id="__Failed__Files__Billing_Units"
                title="Failed Files"
                subtitle="Billing Units."
                value={dashboardPeriodCounts?.processErrorCount ?? 0}
                total={dashboardPeriodCounts?.billingUnitCount ?? 0}
                color="#A80000"
                noDataLabel="No Failed"
                loading={loadingDashboardPeriods || loadingCustomDashboardPeriod}
              />
            </Column>
          </StyledRow>

          <Row>
            <Column lg="6">
              <TransmissionsByVendorTable
                id="__Table_Transmissions_Vendor"
                title="Transmissions / BUs by Vendor"
                orgSid={orgSid}
                startDate={fromDate.value}
                endDate={toDate.value}
                items={dashboardPeriodCounts?.vendorTransmissions ?? []}
                itemsBySpec={dashboardPeriodCounts?.vendorTransmissionsBySpec ?? []}
              />
            </Column>
            <Column lg="6">
              <DashboardErrorsTable
                id="__Table_Errors_Vendor"
                title="Failed Files by Vendor"
                orgSid={orgSid}
                startDate={fromDate.value}
                endDate={toDate.value}
                items={dashboardPeriodCounts?.vendorProcessErrors ?? []}
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
