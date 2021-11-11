import { format } from 'date-fns';
import { formatField } from '../../../helpers/tableHelpers';

export const columns = [
  { key: 'datetime', label: 'Delivered On', style: 'text' },
  { key: 'planSponsor', label: 'Plan Sponsor', style: 'text' },
  { key: 'vendorId', label: 'Vendor', style: 'text' },
  { key: 'specId', label: 'Spec', style: 'text' },
  { key: 'implementation', label: 'Implementation', style: 'text' },
  { key: 'inboundFilename', label: 'Client File', style: 'link' },
  { key: 'outboundFilename', label: 'Vendor File', style: 'link' },
  { key: 'outboundFilesize', label: 'Outbound File Size', style: 'text' },
  { key: 'billingCount', label: 'Billing Unit Count', style: 'text' },
  { key: 'totalRecords', label: 'Total Records', style: 'text' },
  { key: 'extractType', label: 'Feed', style: 'text' },
  { key: 'extractVersion', label: 'Version', style: 'text' },
];

export const getItems = (data) =>
  data?.wpTransmissions?.nodes?.map((item) => {
    const datetime = format(new Date(item.deliveredOn), 'MM/dd/yyyy hh:mm a');

    return [
      formatField(datetime, 'datetime', datetime, '', null),
      formatField(item.planSponsorId, 'planSponsor', item.planSponsorId, '', null),
      formatField(item.vendorId, 'vendorId', item.vendorId, '', null),
      formatField(item.specId, 'specId', item.specId, '', null),
      formatField(item.implementation, 'implementation', item.implementation, '', null),
      formatField(item.inboundFilename, 'inboundFilename', item.inboundFilename, '', null),
      formatField(item.outboundFilename, 'outboundFilename', item.outboundFilename, '', null),
      formatField(item.outboundFilesize, 'outboundFilesize', item.outboundFilesize, '', null),
      formatField(item.billingCount, 'billingCount', item.billingCount, '', null),
      formatField(item.totalRecords, 'totalRecords', item.totalRecords, '', null),
      formatField(item.extractType, 'extractType', item.extractType, '', null),
      formatField(item.extractVersion, 'extractVersion', item.extractVersion, '', null),
    ];
  });
