import { useState, useEffect } from 'react';
import { useWorkPacketStatusDetailsQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';

export const useTable = (argOrgSid, argWorkerId) => {
  const [_loading, setLoading] = useState(true);
  const [tableItems, setTableItems] = useState([]);

  const structure = getTableStructure(TABLE_NAMES.FILE_STATUS_DETAIL_QUALITY_CHECKS);

  const { data, loading, error } = useWorkPacketStatusDetailsQuery({
    variables: {
      orgSid: argOrgSid,
      workOrderId: argWorkerId,
    },
  });

  // * Component Did Mount
  useEffect(() => {
    setLoading(false);
  }, []);

  // * Component Did Mount
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    const doEffect = () => {
      buildItems(data);
    };

    if (data) {
      doEffect();
    }
  }, [data]);

  // Build Items.
  const buildItems = (_data) => {
    if (_data) {
      const arrayItems = [
        {
          status: 'Error',
          employeeId: '50023822',
          employee: 'Eric Paine',
          dependent: '',
          message: 'Missing Field',
          field: 'L2REFSX.REF02',
          value: '',
          transformedValue: '',
        },
        {
          status: 'Error',
          employeeId: '50023822',
          employee: 'Eric Paine',
          dependent: '',
          message: 'Missing Field',
          field: 'L2REFSX.REF02',
          value: '',
          transformedValue: '',
        },
        {
          status: 'Error',
          employeeId: '50023822',
          employee: 'Eric Paine',
          dependent: 'Isish Loew',
          message: 'Missing Field',
          field: 'L2REFSX.REF02',
          value: '',
          transformedValue: '',
        },
        {
          status: 'Warning',
          employeeId: '50023822',
          employee: 'Eric Paine',
          dependent: 'Isish Loew',
          message: 'Missing Field',
          field: 'L2REFSX.REF02',
          value: '',
          transformedValue: '',
        },
        {
          status: 'Warning',
          employeeId: '50023822',
          employee: 'Eric Paine',
          dependent: '',
          message: 'Missing Field',
          field: 'L2REFSX.REF02',
          value: '',
          transformedValue: '',
        },
        {
          status: 'Warning',
          employeeId: '50023822',
          employee: 'Eric Paine',
          dependent: '',
          message: 'Missing Field',
          field: 'L2REFSX.REF02',
          value: '',
          transformedValue: '',
        },
      ];

      setTableItems(arrayItems);
    }
  };

  return {
    tableProps: {
      structure,
      loading: _loading,
      items: tableItems,
    },
    error,
  };
};
