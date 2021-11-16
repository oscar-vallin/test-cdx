import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useInputValue } from '../../../hooks/useInputValue';

export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.ARCHIVES);

  const { data, loading, error } = useWorkPacketStatusesQuery({
    variables: {
      orgSid: argOrgSid,
      dateRange: argDateRange,
      pageableInput: {
        pageNumber: 0,
        pageSize: 100,
      },
    },
  });

  // Build Items.
  const buildItems = (_data) => {
    if (_data) {
      const { workPacketStatuses } = _data;

      return workPacketStatuses.map(
        ({ timestamp, vendorId, planSponsorId, clientFileArchivePath, vendorFileArchivePath }) => {
          const arrayPathClient = clientFileArchivePath?.split('/');
          const arrayPathVendor = vendorFileArchivePath?.split('/') ?? '';

          return {
            datetime: format(new Date(timestamp), 'MM/dd/yyyy hh:mm a'),
            vendor: vendorId,
            planSponsor: planSponsorId,
            clientFile: arrayPathClient[arrayPathClient.length - 1],
            vendorFile: arrayPathVendor[arrayPathVendor.length - 1],
          };
        }
      );
    }

    return null;
  };

  // * Component Did Mount
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const doEffect = () => {
      const _items = buildItems(data);
      setItems(_items);
      return _items;
    };

    if (data) {
      doEffect();
    }
  }, [data]);

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
