import { format } from 'date-fns';
import { formatField } from '../../../helpers/tableHelpers';
import { getStepStatusLabel } from '../FileStatusConstants';
import { HighlightCounter } from '../../../components/badges/HighlightCounter';
import { FileProgress } from '../../../containers/bars/FileProgress';

export const fileStatusColumns = [
  {
    key: 'datetime',
    className: 'Datetime',
    minWidth: 140,
    maxWidth: 150,
    label: 'Received On',
    id: 'datetime',
    fieldName: 'datetime',
    style: 'link',
  },
  { key: 'vendor', minWidth: 80, maxWidth: 150, label: 'Vendor', id: 'vendor', style: 'text' },
  { key: 'planSponsor', minWidth: 100, maxWidth: 120, label: 'Sponsor', id: 'planSponsor', style: 'text' },
  { key: 'extractName', minWidth: 100, maxWidth: 300, label: 'Extract Name', id: 'extractName', style: 'text' },
  { key: 'overall', minWidth: 100, maxWidth: 150, label: 'Overall', id: 'overall', style: 'text' },
  { key: 'progress', minWidth: 100, maxWidth: 200, label: 'Progress', id: 'progress', style: 'node' },
];

export const getFileStatusItems = (data) =>
  data?.workPacketStatuses.nodes.map((item) => {
    const datetime = format(new Date(item.timestamp), 'MM/dd/yyyy hh:mm a');
    const stepStatusLabel = getStepStatusLabel(item.stepStatus);

    return [
      formatField(
        datetime,
        'datetime',
        `/file-status/${item.workOrderId}`,
        '',
        formatField(
          <>
            {item.recordHighlightCount && (
              <HighlightCounter
                id="__FileStatus_Highlight_Counter"
                type={item.recordHighlightType}
                href={`/file-status/${item.workOrderId}*#quality`}
              >
                {item.recordHighlightCount}
              </HighlightCounter>
            )}
          </>,
          'highlight',
          '',
          '',
          ''
        )
      ),
      formatField(item.vendorId, 'vendor', item.vendorId, '', ''),
      formatField(item.planSponsorId, 'planSponsor', item.planSponsorId, '', ''),
      formatField(item.inboundFilename, 'extractName', item.inboundFilename, '', ''),
      formatField(stepStatusLabel, 'overall', stepStatusLabel, '', ''),
      formatField(
        <FileProgress step={item.step} stepStatus={item.stepStatus} />,
        'progress',
        stepStatusLabel,
        item.step,
        ''
      ),
    ];
  });
