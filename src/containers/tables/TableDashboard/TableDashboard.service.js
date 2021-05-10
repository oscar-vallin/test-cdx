import { useState, useEffect } from 'react';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { formatField } from '../../../helpers/tableHelpers';

//
export const useTable = (data, tableName, date) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  // const [urlDate, setUrlDate] = useState('');
  const structure = getTableStructure(tableName);

  // console.log('TableDashboard, useTable, data => ', data);
  // * Component Did Mount.
  useEffect(() => {}, []);

  // useEffect(() => {
  //   setUrlDate(date);
  // }, [urlDate]);

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
      const _items = data.map((item) => {
        const countAndTotal = `${item.count}/${item.total}`;
        console.log('Item: ', item);

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
