import React from 'react';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { WorkPacketColumn } from 'src/containers/tables/WorkPacketColumns';
import {
  NullHandling,
  SortDirection,
  useWorkPacketStatusesLazyQuery,
  useWorkPacketStatusesPollQuery,
  WorkPacketStatus,
} from 'src/data/services/graphql';
import { WorkPacketListPage } from 'src/pages/WorkPacket/WorkPacketListPage';

export const ArchivePage = () => {
  const getItems = (data) => {
    const items: WorkPacketStatus[] = [];
    data?.workPacketStatuses?.nodes?.forEach((value) => {
      if (value) {
        items.push(value);
      }
    });
    return items;
  };

  const getTotal = (data) => data?.workPacketStatuses?.paginationInfo?.totalElements ?? 0;

  const renderTotalRecords = (totalRecords: number) => {
    if (totalRecords === 0) {
      return <span>No results found</span>;
    }

    return <span>{`${totalRecords} results found`}</span>;
  };

  return (
    <WorkPacketListPage
      id="Archives"
      pageRoute={ROUTES.ROUTE_ARCHIVES}
      columns={[
        WorkPacketColumn.TIMESTAMP,
        WorkPacketColumn.VENDOR,
        WorkPacketColumn.ORG_ID,
        WorkPacketColumn.CLIENT_FILE,
        WorkPacketColumn.VENDOR_FILE,
      ]}
      defaultSort={[
        {
          property: 'timestamp',
          direction: SortDirection.Desc,
          nullHandling: NullHandling.NullsFirst,
          ignoreCase: true,
        },
      ]}
      pageDataQuery={useWorkPacketStatusesLazyQuery}
      getItems={getItems}
      getTotal={getTotal}
      pollingQuery={useWorkPacketStatusesPollQuery}
      renderTotalRecords={renderTotalRecords}
    />
  );
};
