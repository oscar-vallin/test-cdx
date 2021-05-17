import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useUpdateFileStatus } from './hooks/useUpdateFileStatus';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { formatField } from '../../../helpers/tableHelpers';
import { getStepStatusLabel } from '../../../data/constants/FileStatusConstants';
import { FileProgress } from '../../bars/FileProgress';
import { HighlightCounter } from '../../../components/badges/HighlightCounter';
import { is } from 'date-fns/locale';

//
export const useTable = (argOrgSid, argDateRange, argFilter, isToday, filter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.FILE_STATUS);

  const { authLogout } = useAuthContext();
  const history = useHistory();

  const { fileStatusQuery, apiData, loadingFs, _error } = useUpdateFileStatus();

  const [refresh, setRefresh] = useState(true);

  // * Component Did Mount.
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isToday && filter === '') {
      if (refresh) {
        fileStatusQuery();
      }
      setRefresh(false);
      setTimeout(() => setRefresh(true), 30000);
    }
  }, [refresh]);

  useEffect(() => {
    if (_error) {
      console.log('ORROR: ', _error);

      authLogout('expired');
      history.push('/');
    }
  }, [_error]);

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

      const _items = apiData.workPacketStatuses.map(
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

    if (apiData) {
      return doEffect();
    }
  }, [apiData, refresh]);

  // * Loading Data
  useEffect(() => {
    setLoading(loadingFs);
  }, [loadingFs]);

  return {
    tableProps: {
      items,
      columns,
      structure,
      loading: _loading,
    },
    _error,
  };
};

const useInput = (placeholder) => {};
