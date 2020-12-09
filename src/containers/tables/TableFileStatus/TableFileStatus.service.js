import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useInputValue } from '../../../hooks/useInputValue';

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
  const structure = getTableStructure(TABLE_NAMES.FILE_STATUS);

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
      console.log(data);
      const _items = buildItems(data);
      console.log('TableFileStatus.service, _items: ', _items);
      setItems(_items);
      return _items;
    };

    console.log('There is Data: ', data);
    if (data) {
      doEffect();
    }
  }, [data]);

  //
  const formatField = (value, type, columnId) => {
    return {
      value,
      type,
      columnId,
    };
  };

  // Build Items.
  const buildItems = (_data) => {
    if (_data) {
      const { workPacketStatuses } = _data;
      console.log('buildItems, _data', _data);

      return workPacketStatuses.map(({ timestamp, vendorId, planSponsorId, inboundFilename, step, stepStatus }) => {
        return {
          datetime: formatField(format(new Date(timestamp), 'MM/dd/yyyy hh:mm a'), 'DATETIME'),
          vendor: formatField(vendorId, '', 'vendor'),
          planSponsor: formatField(planSponsorId, ''),
          extractName: formatField(inboundFilename, ''),
          overall: formatField(STATUSES[stepStatus] ?? STATUSES.default, ''),
          progress: formatField({ step, stepStatus }, 'PROGRESS'),
        };
      });
    }
  };

  // * Loading Data
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return {
    tableProps: {
      items,
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
  const localFilter = useInputValue('Email', 'Your email Address', '', 'email');
  const startDate = useInput('Start Date...');
  const endDate = useInput('End Date...');

  return {
    localFilter,
    startDate,
    endDate,
  };
};
