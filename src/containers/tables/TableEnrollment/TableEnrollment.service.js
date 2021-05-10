import { useState, useEffect } from 'react';
import { useWorkPacketStatusDetailsQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';

export const useTable = (argOrgSid, argWorkerId) => {
  const [_loading, setLoading] = useState(true);
  const [tableItems, setTableItems] = useState();
  const [tableGroups, setTableGroups] = useState();
  const [excludedCounter, setExcludedCounter] = useState(0);
  const [includedCounter, setIncludedCounter] = useState(0);
  const structure = getTableStructure(TABLE_NAMES.FILE_STATUS_DETAIL_ENROLLMENT);

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
      buildGroups();
    };

    if (data) {
      doEffect();
    }
  }, [data]);

  // Build Items.
  const buildItems = (_data) => {
    if (_data) {
      const inTotals = _data.workPacketStatusDetails.enrollmentStats.insuredStat;
      const inRecords = _data.workPacketStatusDetails.enrollmentStats.planInsuredStat;
      const exTotals = _data.workPacketStatusDetails.enrollmentStats.excludedInsuredStat;
      const exRecords = _data.workPacketStatusDetails.enrollmentStats.excludedPlanInsuredStat;

      setIncludedCounter(
        inTotals?.subscribers?.active?.value ||
          inTotals?.subscribers?.ended?.value ||
          inTotals?.dependents?.active?.value ||
          inTotals?.dependents?.ended?.value
      );

      setExcludedCounter(
        exTotals?.subscribers?.active?.value ||
          exTotals?.subscribers?.ended?.value ||
          exTotals?.dependents?.active?.value ||
          exTotals?.dependents?.ended?.value
      );

      const getRecords = (argGroupId, argLabel, argFields) => {
        return {
          planCode: argLabel,
          subsActive: argFields?.subscribers?.active?.value ?? '',
          subsEnded: argFields?.subscribers?.ended?.value ?? '',
          depsActive: argFields?.dependents?.active?.value ?? '',
          depsEnded: argFields?.dependents?.ended?.value ?? '',
          groupId: argGroupId,
        };
      };

      const arrayItems = [
        [
          {
            planCode: '',
            subsActive: 'Suscribers',
            subsEnded: '',
            depsActive: 'Dependents',
            depsEnded: '',
          },
          {
            planCode: 'Plan Code',
            subsActive: 'Active',
            subsEnded: 'Ended',
            depsActive: 'Active',
            depsEnded: 'Ended',
          },
        ],
        [
          getRecords(1, 'Any Plan', inTotals),
          getRecords(1, 'Dependent Life', inRecords[0]),
          getRecords(1, 'Spousal life', inRecords[1]),
          getRecords(1, 'Suppl. Employee Life Nicotine User', inRecords[2]),
          getRecords(1, 'Suppl. Employee Life Non-Nicotine User', inRecords[3]),
        ],
        [
          getRecords(2, 'All Plans', exTotals),
          getRecords(2, 'Buy-up STD', exRecords[0]),
          getRecords(2, 'Core STD', exRecords[1]),
          getRecords(2, 'LTD', exRecords[2]),
          getRecords(2, 'STD', exRecords[3]),
        ],
      ];

      setTableItems(arrayItems);
    }
  };

  const buildGroups = () => {
    setTableGroups([
      [{ id: 1, name: 'Included Subscribers / Enrollments', startIndex: 0, count: 5, level: 0 }],
      [{ id: 2, name: 'Excluded Subscribers / Enrollments', startIndex: 0, count: 5, level: 0 }],
    ]);

    return [
      { id: 1, name: 'Included Subscribers / Enrollments', startIndex: 0, count: 5, level: 0 },
      { id: 2, name: 'Excluded Subscribers / Enrollments', startIndex: 5, count: 5, level: 0 },
    ];
  };

  return {
    tableProps: {
      structure,
      loading: _loading,
    },
    tableItems,
    tableGroups,
    excludedCounter,
    includedCounter,
    error,
  };
};
