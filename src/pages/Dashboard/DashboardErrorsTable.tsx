import React from 'react';
import { DashboardPeriodCount } from 'src/data/services/graphql';
import { CellTotal } from 'src/pages/Dashboard/DashboardPage.styles';
import { DashboardTable } from './DashboardTable';

type DashboardErrorsTableType = {
  id: string;
  title: string;
  items?: DashboardPeriodCount[];
  orgSid: string;
  startDate: Date;
  endDate: Date;
};

export const DashboardErrorsTable = ({
  id, title, items, orgSid, startDate, endDate,
}: DashboardErrorsTableType) => {
  const renderTotal = (item: DashboardPeriodCount) => <CellTotal>{item.count}</CellTotal>;

  return (
    <DashboardTable
      id={id}
      title={title}
      linkTo="errors"
      orgSid={orgSid}
      startDate={startDate}
      endDate={endDate}
      items={items}
      renderTotal={renderTotal}
    />
  );
};
