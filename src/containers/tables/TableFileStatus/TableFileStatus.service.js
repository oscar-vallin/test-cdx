import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { formatField } from '../../../helpers/tableHelpers';
import { getStepStatusLabel } from '../../../data/constants/FileStatusConstants';
import { FileProgress } from '../../bars/FileProgress';
import { useInputValue } from '../../../hooks/useInputValue';

//
export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.ERRORS);

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
    const doEffect = () => {
      // console.log('TableErrors.service, data:', data);
      const _columns = [
        { key: 'datetime', label: 'Received On', id: 'datetime', style: 'link' },
        { key: 'vendor', label: 'Vendor', id: 'vendor', style: 'text' },
        { key: 'planSponsor', label: 'Sponsor', id: 'planSponsor', style: 'text' },
        { key: 'extractName', label: 'Extract Name', id: 'extractName', style: 'text' },
        { key: 'overall', label: 'Overall', id: 'overall', style: 'text' },
        { key: 'progress', label: 'Progress', id: 'progress', style: 'node' },
      ];

      const _items = data.workPacketStatuses.map(
        ({ workOrderId, timestamp, vendorId, planSponsorId, inboundFilename, step, stepStatus }) => {
          const datetime = format(new Date(timestamp), 'MM/dd/yyyy hh:mm a');
          // console.log('Xxxxx STepStatus: ', stepStatus);
          const stepStatusLabel = getStepStatusLabel(stepStatus);

          return [
            formatField(datetime, 'datetime', datetime, workOrderId),
            formatField(vendorId, 'vendor', vendorId),
            formatField(planSponsorId, 'planSponsor', planSponsorId),
            formatField(inboundFilename, 'extractName', inboundFilename),
            formatField(stepStatusLabel, 'overall', stepStatusLabel),
            formatField(
              <>
                <FileProgress step={step} stepStatus={stepStatus} />
              </>,
              'progress',
              stepStatusLabel,
              step
            ),
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

const useInput = (placeholder) => {
  // const [value, setValue] = useState('');
  // const onChange = (e) => {
  //   console.log('useInput, onChange, e: ', e);
  //   console.log('useInput, onChange, e.target: ', e.target);
  //   console.log('useInput, onChange, value: ', value);
  //   setValue(value + e.nativeEvent.data);
  // };
  // return {
  //   value,
  //   onChange,
  //   placeholder,
  // };
};

//
export const useInputs = () => {
  const startDate = useInput('Start Date...');
  const endDate = useInput('End Date...');
  // const localInput = useInput('Vendor, status, ...');
  const localInput = useInputValue('', 'Vendor ...', '', '');

  return {
    localInput,
    startDate,
    endDate,
  };
};
