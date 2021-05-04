import React from 'react';
// components
import { CardDashboard } from '../../containers/cards/CardDashboard';
import { TableDashboard } from '../../containers/tables/TableDashboard';

import { LayoutDashboard } from '../../layouts/LayoutDashboard';
import { StyledRow, StyledRowDate, StyledColumn, StyledButton, StyledSpinner } from './DashboardPage.styles';
import { useDashboardService } from './DashboardPage.service';

import { TABLE_NAMES } from '../../data/constants/TableConstants';

// TODO: Change for Session organization ID.
const ORG_SID = 1;

const _DashboardPage = () => {
  const service = useDashboardService(ORG_SID);
  const { isLoadingData, datesOptions, dataCounters } = service;
  const { setDateId, dateId } = service;

  // Render Buttons Bar
  const renderDateButtons = () => {
    if (!datesOptions) return null;

    return datesOptions.map((option) => (
      <StyledColumn key={`ContainerButton-${option.id}`} noStyle>
        <StyledButton
          key={`Button-${option.id}`}
          variant={option.selected ? 'primary' : 'secondary'}
          selected={option.selected}
          onClick={() => setDateId(option.id)}
        >
          {option.name}
        </StyledButton>
      </StyledColumn>
    ));
  };

  return (
    <LayoutDashboard id="PageDashboard">
      <React.Suspense fallback={<StyledSpinner>Loading...</StyledSpinner>}>
        <StyledRowDate marginTop={15} sm={12} right>
          {renderDateButtons()}
        </StyledRowDate>
        <StyledRow marginTop={10} sm={12} around>
          <StyledColumn sm={5}>
            <CardDashboard
              title="Transmissions"
              subtitle="Billing Units."
              value={dataCounters?.transmissionCount ?? 0}
              total={dataCounters?.billingUnitCount ?? 0}
              color="#219653"
              noDataLabel="No Transmissions"
              loading={isLoadingData}
            />
          </StyledColumn>
          <StyledColumn sm={5}>
            <CardDashboard
              title="Failed Files"
              subtitle="Billing Units."
              value={dataCounters?.processErrorCount ?? 0}
              total={dataCounters?.billingUnitCount ?? 0}
              color="#A80000"
              noDataLabel="No Failed"
              loading={isLoadingData}
            />
          </StyledColumn>
        </StyledRow>
        <StyledRow marginBottom={30} marginTop={30} sm={12} around top>
          <StyledColumn sm={5}>
            <TableDashboard
              tableId={TABLE_NAMES.DASHBOARD_TRANSMISSIONS_VENDOR}
              data={dataCounters?.vendorTransmissions}
              altData={dataCounters?.vendorTransmissionsBySpec}
              date={dateId}
            />
          </StyledColumn>
          <StyledColumn sm={5}>
            <TableDashboard
              tableId={TABLE_NAMES.DASHBOARD_ERRORS_VENDOR}
              data={dataCounters?.vendorProcessErrors}
              date={dateId}
            />
          </StyledColumn>
        </StyledRow>
        <StyledRow marginBottom={30} marginTop={30} sm={12} around top>
          <StyledColumn sm={5}>
            <TableDashboard
              tableId={TABLE_NAMES.DASHBOARD_TRANSMISSIONS_FILES}
              data={dataCounters?.fileTransmissions}
              date={dateId}
            />
          </StyledColumn>
          <StyledColumn sm={5}>
            <TableDashboard
              tableId={TABLE_NAMES.DASHBOARD_ERRORS_FILES}
              data={dataCounters?.fileProcessErrors}
              date={dateId}
            />
          </StyledColumn>
        </StyledRow>
      </React.Suspense>
    </LayoutDashboard>
  );
};

const DashboardPage = React.memo(_DashboardPage);

export { DashboardPage };
