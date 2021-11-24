import { useState, useEffect } from 'react';
import { useWorkPacketStatusDetailsQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';

export const useTable = (argOrgSid, argWorkerId) => {
  const [_loading, setLoading] = useState(true);
  const [tableItems, setTableItems] = useState<any[] | never>([]);
  const [tableTotals, setTableTotals] = useState<any[] | never>([]);

  const structure = getTableStructure(TABLE_NAMES.FILE_STATUS_DETAIL_VENDOR_COUNT);

  const { data, loading, error } = useWorkPacketStatusDetailsQuery({
    variables: {
      orgSid: argOrgSid,
      workOrderId: argWorkerId,
    },
  });

  // Build Items.
  const buildItems = (_data) => {
    if (_data) {
      const arrayItems = [
        { recordName: 'ISA', count: 1 },
        { recordName: 'GS', count: 1 },
        { recordName: 'ST', count: 1 },
        { recordName: 'BGN', count: 1 },
        { recordName: 'HDREF38', count: 1 },
        { recordName: 'Delimiters', count: 1 },
        { recordName: 'L1000AN1', count: 211 },
        { recordName: 'L1000BN1', count: 211 },
        { recordName: 'L2000REFDX', count: 211 },
        { recordName: 'L2000REFZZ', count: 211 },
        { recordName: 'L2000REFINS', count: 211 },
        { recordName: 'L2000REF0F', count: 211 },
        { recordName: 'REF2100N3', count: 211 },
        { recordName: 'REF2100N3', count: 211 },
        { recordName: 'REF2100N3', count: 211 },
      ];

      const arrayTotals = [{ recordName: 'Total Records', count: 2924 }];

      setTableItems(arrayItems);
      setTableTotals(arrayTotals);
    }
  };

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

  return {
    tableProps: {
      structure,
      loading: _loading,
      items: tableItems,
    },
    tableTotals: {
      structure,
      loading: _loading,
      items: tableTotals,
    },
    error,
  };
};
