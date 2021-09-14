import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { useUpdateFileStatus } from './hooks/useUpdateFileStatus';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { formatField, isCDXToday } from '../../../helpers/tableHelpers';
import { getStepStatusLabel } from '../../../data/constants/FileStatusConstants';
import { FileProgress } from '../../bars/FileProgress';
import { HighlightCounter } from '../../../components/badges/HighlightCounter';
import { useRefresh } from '../../../hooks/useRefresh';

//
export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.FILE_STATUS);

  const history = useHistory();

  const { fileStatusQuery, apiData, loadingFs, _error } = useUpdateFileStatus();
  const { enableRefresh, disableRefresh } = useRefresh(TABLE_NAMES.FILE_STATUS, fileStatusQuery);

  const columns = [
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

  // * Component Did Mount.
  useEffect(() => {
    setLoading(false);
    fileStatusQuery();

    return function unmount() {
      disableRefresh();
    };
  }, []);

  //
  useEffect(() => {
    const _condition = isCDXToday(argDateRange.rangeStart, argDateRange.rangeEnd);
    enableRefresh(_condition && argFilter === '');
  }, [argFilter]);

  useEffect(() => {
    if (_error) {
      // authLogout('expired');
      // history.push('/');
    }
  }, [_error]);

  useEffect(() => {
    const doEffect = () => {
      const _items = apiData.workPacketStatuses.map((item) => {
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
                  <HighlightCounter type={item.recordHighlightType} href={`/file-status/${item.workOrderId}*#quality`}>
                    {item.recordHighlightCount}
                  </HighlightCounter>
                )}
              </>,
              'highlight'
            )
          ),
          formatField(item.vendorId, 'vendor', item.vendorId),
          formatField(item.planSponsorId, 'planSponsor', item.planSponsorId),
          formatField(item.inboundFilename, 'extractName', item.inboundFilename),
          formatField(stepStatusLabel, 'overall', stepStatusLabel),
          formatField(
            <FileProgress step={item.step} stepStatus={item.stepStatus} />,
            'progress',
            stepStatusLabel,
            item.step
          ),
        ];
      });

      setItems(_items);
    };

    if (apiData) {
      return doEffect();
    }
  }, [apiData]);

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
