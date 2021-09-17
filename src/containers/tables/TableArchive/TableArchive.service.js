/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { useWorkPacketStatusesLazyQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useInputValue } from '../../../hooks/useInputValue';
import { isCDXToday } from '../../../helpers/tableHelpers';
import { useRefresh } from '../../../hooks/useRefresh';

export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.ARCHIVES);

  const [apiCall, data, loading, error] = useWorkPacketStatusesLazyQuery({
    variables: {
      orgSid: argOrgSid ?? 1,
      dateRange: argDateRange,
      filter: argFilter,
    },
  });

  const { enableRefresh, disableRefresh } = useRefresh(TABLE_NAMES.ARCHIVES, apiCall);

  //
  const formatField = (value, type, columnId, text, sublabel) => {
    return {
      id: columnId,
      value,
      type,
      columnId,
      text,
      sublabel,
    };
  };

  // * Component Did Mount
  useEffect(() => {
    setLoading(false);
    apiCall();

    return function unmount() {
      disableRefresh();
    };
  }, []);

  //
  useEffect(() => {
    const _condition = isCDXToday(argDateRange.rangeStart, argDateRange.rangeEnd);
    enableRefresh(_condition && argFilter === '');
  }, [argDateRange, argFilter]);

  //
  useEffect(() => {
    if (error) {
      /* TODO: Refactor to logout use-case */
      // authLogout(error.message);
      // history.push('/');
    }
  }, [error]);

  //
  useEffect(() => {
    const doEffect = () => {
      const _items = data.workPacketStatuses.map((_item) => {
        const datetime = format(new Date(_item.timestamp), 'MM/dd/yyyy hh:mm a');

        return [
          formatField(datetime, 'text', 'datetime', datetime),
          formatField(_item.vendorId, 'text', 'vendor', _item.vendorId),
          formatField(_item.planSponsorId, 'text', 'planSponsor', _item.planSponsorId),
          formatField(_item.inboundFilename, 'link', 'clientFile', _item.clientFileArchivePath),
          formatField(_item.workOrderId, 'link', 'vendorFile', _item.vendorFileArchivePath),
        ];
      });

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

//
export const useInputs = () => {
  const localInput = useInputValue('', 'Extract Name,  Status, Vendor, etc.', '', '');

  return {
    localInput,
  };
};
