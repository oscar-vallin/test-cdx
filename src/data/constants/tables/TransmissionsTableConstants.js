import { format } from 'date-fns';
import { formatField } from '../../../helpers/tableHelpers';

export const columns = [
  { key: 'datetime', label: 'Delivered On', style: 'text' },
  // { key: 'planSponsor', label: 'Plan Sponsor', style: 'text' },
  // { key: 'vendorId', label: 'Vendor', style: 'text' },
  // { key: 'specId', label: 'Spec', style: 'text' },
  // { key: 'implementation', label: 'Implementation', style: 'text' },
  // { key: 'inboundFilename', label: 'Client File', style: 'link' },
  // { key: 'outboundFilename', label: 'Vendor File', style: 'link' },
  // { key: 'outboundFilesize', label: 'Outbound File Size', style: 'text' },
  // { key: 'billingCount', label: 'Billing Unit Count', style: 'text' },
  // { key: 'totalRecords', label: 'Total Records', style: 'text' },
  // { key: 'extractType', label: 'Feed', style: 'text' },
  // { key: 'extractVersion', label: 'Version', style: 'text' },
];

export const getItems = (data) =>
  data?.workPacketStatuses?.map((item) => {
    const datetime = format(new Date(item.deliveredOn), 'MM/dd/yyyy hh:mm a');

    return [
      formatField(datetime, 'datetime', datetime),
      // formatField(item.planSponsorId, 'planSponsor', item.planSponsorId),
      // formatField(item.vendorId, 'vendorId', item.vendorId),
      // formatField(item.specId, 'specId', item.specId),
      // formatField(item.implementation, 'implementation', item.implementation),
      // formatField(item.inboundFilename, 'inboundFilename', item.inboundFilename),
      // formatField(item.outboundFilename, 'outboundFilename', item.outboundFilename),
      // formatField(item.outboundFilesize, 'outboundFilesize', item.outboundFilesize),
      // formatField(item.billingCount, 'billingCount', item.billingCount),
      // formatField(item.totalRecords, 'totalRecords', item.totalRecords),
      // formatField(item.extractType, 'extractType', item.extractType),
      // formatField(item.extractVersion, 'extractVersion', item.extractVersion),
    ];
  });
