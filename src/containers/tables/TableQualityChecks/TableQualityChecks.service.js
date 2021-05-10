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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const buildRecord = (label, context, outerContext, unitId, record) => {
    return {
      status: label,
      employeeId: unitId,
      employee: outerContext,
      dependent: context,
      message: record.message.join(' '),
      field: record.id,
      value: record.rawValue,
      transformedValue: record.value,
    };
  };

  // Build Items.
  const buildItems = (_data) => {
    if (_data) {
      const arrayItems = _data.workPacketStatusDetails.qualityChecks.sequenceCreationEvent.map(
        ({ recordCreationEvent }) =>
          recordCreationEvent.map(({ context, outerContext, unitId, error, information, warning }) => [
            ...error.map((itemRecord) => buildRecord('Error', context, outerContext, unitId, itemRecord)),
            ...information.map((itemRecord) => buildRecord('Error', context, outerContext, unitId, itemRecord)),
            ...warning.map((itemRecord) => buildRecord('Error', context, outerContext, unitId, itemRecord)),
          ])
      )[0][0];

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
