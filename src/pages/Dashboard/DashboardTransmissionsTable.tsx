import React from 'react';
import { DashboardPeriodCount } from 'src/data/services/graphql';
import { CellTotal } from 'src/pages/Dashboard/DashboardPage.styles';
import { DashboardTable } from './DashboardTable';

type DashboardTransmissionsTableType = {
  id: string;
  title: string;
  items?: DashboardPeriodCount[];
  orgSid: string;
  startDate: Date;
  endDate: Date;
};

export const DashboardTransmissionsTable = ({id, title, items, orgSid, startDate, endDate}: DashboardTransmissionsTableType) => {

  const renderTotal = (item: DashboardPeriodCount) => (
    <CellTotal>{item.count}/{item.total}</CellTotal>
  );

  return (
    <DashboardTable
      id={id}
      title={title}
      linkTo="transmissions"
      orgSid={orgSid}
      startDate={startDate}
      endDate={endDate}
      items={items}
      renderTotal={renderTotal}
    />
  );
}