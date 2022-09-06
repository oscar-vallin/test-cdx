import { format } from 'date-fns';
import { formatField } from '../../../helpers/tableHelpers.service';

export const columns = [
  {
    key: 'datetime', label: 'Received On', id: 'datetime', style: 'text',
  },
  {
    key: 'vendor', label: 'Vendor', id: 'vendor', style: 'text',
  },
  {
    key: 'planSponsor', label: 'Plan Sponsor', id: 'planSponsor', style: 'text',
  },
  {
    key: 'clientFile', label: 'Client File', id: 'clientFile', style: 'link',
  },
  {
    key: 'vendorFile', label: 'Vendor File', id: 'vendorFile', style: 'link',
  },
];

export const getItems = (data) => data?.workPacketStatuses?.nodes?.map((item) => {
  const datetime = format(new Date(item.timestamp), 'MM/dd/yyyy hh:mm a');

  return [
    formatField(datetime, 'datetime', datetime, '', null),
    formatField(item.vendorId, 'vendor', item.vendorId, '', null),
    formatField(item.planSponsorId, 'planSponsor', item.planSponsorId, '', null),
    formatField(item.inboundFilename, 'clientFile', item.clientFileArchivePath, '', null),
    formatField(item.workOrderId, 'vendorFile', item.vendorFileArchivePath, '', null),
  ];
});
