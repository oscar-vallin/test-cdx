import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { useAuthContext } from '../../../contexts/AuthContext';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { formatField } from '../../../helpers/tableHelpers';
import { getStepStatusLabel } from '../../../data/constants/FileStatusConstants';
import { FileProgress } from '../../bars/FileProgress';
import { HighlightCounter } from '../../../components/badges/HighlightCounter';

//
export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.FILE_STATUS);

  const { authLogout } = useAuthContext();
  const history = useHistory();

  const { data, loading, error } = useWorkPacketStatusesQuery({
    variables: {
      orgSid: argOrgSid,
      dateRange: argDateRange,
      filter: argFilter,
    },
  });

  // * Component Did Mount.
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (error) {
      authLogout(error.message);
      history.push('/');
    }
  }, [error]);

  useEffect(() => {
    const doEffect = () => {
      const _columns = [
        {
          key: 'datetime',
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

      const _items = data.workPacketStatuses.map(
        ({
          workOrderId,
          timestamp,
          vendorId,
          planSponsorId,
          inboundFilename,
          step,
          stepStatus,
          recordHighlightCount,
          recordHighlightType,
        }) => {
          const datetime = format(new Date(timestamp), 'MM/dd/yyyy hh:mm a');
          const stepStatusLabel = getStepStatusLabel(stepStatus);

          return [
            formatField(
              datetime,
              'datetime',
              `/file-status/${workOrderId}`,
              '',
              formatField(
                <>
                  {recordHighlightCount && (
                    <HighlightCounter type={recordHighlightType} href={`/file-status/${workOrderId}*`}>
                      {recordHighlightCount}
                    </HighlightCounter>
                  )}
                </>,
                'highlight'
              )
            ),
            formatField(vendorId, 'vendor', vendorId),
            formatField(planSponsorId, 'planSponsor', planSponsorId),
            formatField(inboundFilename, 'extractName', inboundFilename),
            formatField(stepStatusLabel, 'overall', stepStatusLabel),
            formatField(<FileProgress step={step} stepStatus={stepStatus} />, 'progress', stepStatusLabel, step),
          ];
        }
      );

      setColumns(_columns);
      setItems(_items);
    };

    if (data) {
      return doEffect();
    }
  }, [data]);

  // * Loading Data
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return {
    tableProps: {
      items,
      columns,
      structure,
      loading: _loading,
    },
    error,
  };
};

const useInput = (placeholder) => {};
