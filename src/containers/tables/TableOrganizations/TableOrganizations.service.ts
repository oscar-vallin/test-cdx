import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';

//
export const useTable = (data) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState<any[] | undefined>([]);
  const structure = getTableStructure(TABLE_NAMES.ERRORS);

  // const [data, setData] = useState();
  const [loading, setFakeLoading] = useState(true);
  const [error] = useState();

  //
  const formatField = (value, type, columnId, text) => {
    return {
      id: columnId,
      value,
      type,
      columnId,
      text,
    };
  };

  // * Component Did Mount.
  useEffect(() => {
    setLoading(false);
    setFakeLoading(false);
  }, []);

  useEffect(() => {
    const doEffect = () => {
      const _columns = [
        { key: 'datetime', label: 'Received On', id: 'datetime', style: 'text' },
        { key: 'clientFile', label: 'Client File', id: 'clientFile', style: 'link' },
        { key: 'workStep', label: 'Work Step', id: 'workStep', style: 'text' },
        { key: 'planSponsor', label: 'Plan Sponsor', id: 'planSponsor', style: 'text' },
        { key: 'vendor', label: 'Vendor', id: 'vendor', style: 'text' },
        { key: 'message', label: 'Message', id: 'message', style: 'text' },
      ];

      const _items = data.map(({ timestamp, fileName, file, workStep, plan, vendor, message }) => {
        const datetime = format(new Date(timestamp), 'MM/dd/yyyy hh:mm a');

        return [
          formatField(datetime, 'text', 'datetime', datetime),
          formatField(fileName, 'link', 'clientFile', file),
          formatField(workStep, 'text', 'workStep', workStep),
          formatField(plan, 'text', 'planSponsor', plan),
          formatField(vendor, 'text', 'vendor', vendor),
          formatField(message, 'text', 'message', message),
        ];
      });

      setColumns(_columns);
      setItems(_items);
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