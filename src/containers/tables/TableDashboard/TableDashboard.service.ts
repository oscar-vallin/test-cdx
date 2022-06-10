import { useState, useEffect } from 'react';
import { formatField } from 'src/helpers/tableHelpers.service';

//
export const useTable = (data, loading, date, altData) => {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [specs, setSpecs] = useState(false);
  const [dataItems, setDataItems] = useState(data);

  // * Component Did Mount.

  const updateData = () => {
    if (specs && altData) setDataItems(altData);
    else setDataItems(data);
  };

  useEffect(() => {
    if (loading) {
      updateData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specs, data, altData, loading]);

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
            formatField(item.secondaryDescr, 'specs', item.secondaryDescr, '', null)
          ),
          formatField(countAndTotal, 'total', countAndTotal, '', null),
        ];
      });

      setColumns(_columns);
      setItems(_items);
    };

    if (data || altData) doEffect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataItems]);

  return {
    tableProps: {
      items,
      columns,
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
