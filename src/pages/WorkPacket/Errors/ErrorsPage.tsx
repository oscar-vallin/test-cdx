import React from 'react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { WorkPacketColumn } from 'src/containers/tables/WorkPacketColumns';
import { NullHandling, SortDirection, useWpProcessErrorsLazyQuery, WorkPacketStatus } from 'src/data/services/graphql';
import { TableMetaData, WorkPacketListPage } from 'src/pages/WorkPacket/WorkPacketListPage';

export const ErrorsPage = () => {
  const getItems = (data) => {
    const items: WorkPacketStatus[] = [];
    data?.wpProcessErrors?.nodes?.forEach((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  const getTotal = (data) => data?.wpProcessErrors?.paginationInfo?.totalElements ?? 0;

  const renderTotalRecords = (tableMeta: TableMetaData) => {
    if (tableMeta.loading || tableMeta.count === null || tableMeta.count === 0) {
      return <span>No results found</span>;
    }

    return <span>{`${tableMeta.count} results found`}</span>;
  };

  return (
    <WorkPacketListPage
      id="TransErrors"
      pageRoute={ROUTES.ROUTE_ERRORS}
      columns={[
        WorkPacketColumn.START_TIME,
        WorkPacketColumn.INBOUND_FILENAME,
        WorkPacketColumn.STEP,
        WorkPacketColumn.PLAN_SPONSOR,
        WorkPacketColumn.VENDOR,
        WorkPacketColumn.MESSAGE,
      ]}
      defaultSort={[
        {
          property: 'timestamp',
          direction: SortDirection.Desc,
          nullHandling: NullHandling.NullsFirst,
          ignoreCase: true,
        },
      ]}
      pageDataQuery={useWpProcessErrorsLazyQuery}
      getItems={getItems}
      getTotal={getTotal}
      renderTotalRecords={renderTotalRecords}
    />
  );
};
