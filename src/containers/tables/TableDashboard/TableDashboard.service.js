import { useState, useEffect } from 'react';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { formatField } from '../../../helpers/tableHelpers';

//
export const useTable = (data, tableName) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const structure = getTableStructure(tableName);

  // console.log('TableDashboard, useTable, data => ', data);

  // * Component Did Mount.
  useEffect(() => {}, []);

  useEffect(() => {
    const doEffect = () => {
      // console.log('Dashboard.service, data:', data);
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

      const _items = data.map(({ name, secondaryDescr, count, total }) => {
        const countAndTotal = `${count}/${total}`;

        return [
          formatField(name, 'vendor', name, null, formatField(secondaryDescr, 'specs', secondaryDescr)),
          formatField(countAndTotal, 'total', countAndTotal),
        ];
      });

      // console.log('data ==> Columns: ', _columns);
      // console.log('data ==> Items: ', _items);

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
