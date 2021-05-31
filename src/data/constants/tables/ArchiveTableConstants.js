import { format } from 'date-fns';
import { formatField } from '../../../helpers/tableHelpers';

export const columns = [
  { key: 'datetime', label: 'Received On', id: 'datetime', style: 'text' },
  { key: 'vendor', label: 'Vendor', id: 'vendor', style: 'text' },
  { key: 'planSponsor', label: 'Plan Sponsor', id: 'planSponsor', style: 'text' },
  { key: 'clientFile', label: 'Client File', id: 'clientFile', style: 'link' },
  { key: 'vendorFile', label: 'Vendor File', id: 'vendorFile', style: 'link' },
];

export const getItems = (data) =>
  data?.workPacketStatuses?.map((item) => {
    const datetime = format(new Date(item.timestamp), 'MM/dd/yyyy hh:mm a');

    return [
      formatField(datetime, 'text', 'datetime', datetime),
      formatField(item.vendorId, 'text', 'vendor', item.vendorId),
      formatField(item.planSponsorId, 'text', 'planSponsor', item.planSponsorId),
      formatField(item.inboundFilename, 'link', 'clientFile', item.clientFileArchivePath),
      formatField(item.workOrderId, 'link', 'vendorFile', item.vendorFileArchivePath),
    ];
  });
