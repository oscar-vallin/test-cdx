import { useState, useEffect } from 'react';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { formatField } from '../../../helpers/tableHelpers';

//
export const useTable = (data, tableName, date) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);

  const structure = getTableStructure(tableName);

  // * Component Did Mount.
  useEffect(() => {}, []);

  useEffect(() => {
    const doEffect = () => {
      const _columns = [
        {
          key: 'vendor',
          label: null,
          id: 'vendor',
          style: 'link',
          child: { key: 'specs', label: 'Received On', id: 'secondaryDescr', style: 'text' },
        },
        { key: 'total', label: 'Total', id: 'total', style: 'total' },
      ];
      const _items = data.map((item) => {
        const countAndTotal = `${item.count}/${item.total}`;

        return [
          formatField(
            item.name,
            'vendor',
            `file-status/filter/${item.name}*${date}`,
            '',
            formatField(item.secondaryDescr, 'specs', item.secondaryDescr)
          ),
          formatField(countAndTotal, 'total', countAndTotal),
        ];
      });

      setColumns(_columns);
      setItems(_items);
    };

    if (data) {
      return doEffect();
    }

    setLoading(false);
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
      loading,
    },
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
