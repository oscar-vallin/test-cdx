import { useState, useEffect } from 'react';
import { getTableStructure } from '../../../data/constants/TableConstants';
import { formatField } from '../../../helpers/tableHelpers';

//
export const useTable = (data, tableName, date, altData) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const [specs, setSpecs] = useState(false);
  const [dataItems, setDataItems] = useState(data);

  const structure = getTableStructure(tableName);

  // * Component Did Mount.

  const updateData = () => {
    if (specs && altData) setDataItems(altData);
    else setDataItems(data);
  };

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specs, data, altData]);

  useEffect(() => {
    const doEffect = () => {
      const _columns = [
        {
          key: 'vendor',
          label: null,
          id: 'vendor',
          style: 'vendor',
          child: { key: 'specs', label: 'Received On', id: 'secondaryDescr', style: 'text' },
        },
        { key: 'total', label: 'Total', id: 'total', style: 'total' },
      ];

      const _items = dataItems?.map((item) => {
        const countAndTotal = `${item.count}/${item.total}`;

        return [
          formatField(
            item.name,
            'vendor',
            `file-status/filter/${item.name}*${date}`,
            item.secondaryDescr,
            formatField(item.secondaryDescr, 'specs', item.secondaryDescr)
          ),
          formatField(countAndTotal, 'total', countAndTotal),
        ];
      });

      setColumns(_columns);
      setItems(_items);
    };

    if (data || altData) doEffect();

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItems]);

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
    specs,
    setSpecs,
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
