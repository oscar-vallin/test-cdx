import { format } from 'date-fns';
import { formatField } from '../../../helpers/tableHelpers';
import { getStepStatusLabel } from '../FileStatusConstants';

export const errorColumns = [
  { key: 'datetime', label: 'Received On', id: 'datetime', style: 'text' },
  { key: 'clientFile', label: 'Client File', id: 'clientFile', style: 'link' },
  { key: 'workStep', label: 'Work Step', id: 'workStep', style: 'text' },
  { key: 'planSponsor', label: 'Plan Sponsor', id: 'planSponsor', style: 'text' },
  { key: 'vendor', label: 'Vendor', id: 'vendor', style: 'text' },
  { key: 'message', label: 'Message', id: 'message', style: 'text' },
];

export const getErrorsItems = (data) =>
  data?.workPacketStatuses?.map((item) => {
    const datetime = format(new Date(item.timestamp), 'MM/dd/yyyy hh:mm a');
    const message = hasErrors ? 'Error' : '';
    const stepStatusLabel = getStepStatusLabel(item.stepStatus);

    return [
      formatField(datetime, 'datetime', datetime),
      formatField(item.inboundFilename, 'clientFile', item.clientFileArchivePath, '(Details)'),
      formatField(stepStatusLabel, 'workStep', stepStatusLabel),
      formatField(item.planSponsorId, 'planSponsor', item.planSponsorId),
      formatField(item.vendorId, 'vendor', item.vendorId),
      formatField(message, 'message', message),
    ];
  });
