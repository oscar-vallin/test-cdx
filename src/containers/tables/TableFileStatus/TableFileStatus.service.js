import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useInputValue } from '../../../hooks/useInputValue';
import { formatField } from '../../../helpers/tableHelpers';
import { getStepStatusLabel } from '../../../data/constants/FileStatusConstants';
// import { STATUSES } from '../../../data/constants/'

const STATUSES = {
  0: 'Queued',
  1: 'Processing',
  2: 'Complete',
  3: 'Error',
  4: 'Submitted',
  5: 'Warning',
  6: 'Hold',
  7: 'Canceled',
  a: 'Quality Check Failed',
  b: 'No Records',
  c: 'Tech migration Check Failed',
  default: '',
};

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
      console.log('TableErrors.service, data:', data);
      const _columns = [
        { key: 'datetime', label: 'Received On', id: 'datetime', style: 'link' },
        { key: 'vendor', label: 'Vendor', id: 'vendor', style: 'text' },
        { key: 'planSponsor', label: 'Sponsor', id: 'planSponsor', style: 'text' },
        { key: 'extractName', label: 'Extract Name', id: 'extractName', style: 'text' },
        { key: 'overall', label: 'Overall', id: 'overall', style: 'text' },
        { key: 'progress', label: 'Progress', id: 'progress', style: 'text' },
      ];

      const _items = data.workPacketStatuses.map(
        ({ timestamp, vendorId, planSponsorId, inboundFilename, step, stepStatus }) => {
          const datetime = format(new Date(timestamp), 'MM/dd/yyyy hh:mm a');
          const stepStatusLabel = getStepStatusLabel(stepStatus);

          return [
            formatField(datetime, 'datetime', datetime),
            formatField(vendorId, 'vendor', vendorId),
            formatField(planSponsorId, 'planSponsor', planSponsorId),
            formatField(inboundFilename, 'extractName', inboundFilename),
            formatField(stepStatusLabel, 'overall', stepStatusLabel),
            formatField(stepStatusLabel, 'progress', stepStatusLabel, step),
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
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e);
  };

  return {
    value,
    onChange,
    placeholder,
  };
};

//
export const useInputs = () => {
  const startDate = useInput('Start Date...');
  const endDate = useInput('End Date...');

  return {
    startDate,
    endDate,
  };
};
