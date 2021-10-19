/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getTableStructure, useQueryTable } from '../data/constants/TableConstants';
import { isTodayInRange } from '../helpers/tableHelpers';
import { useRefresh } from './useRefresh';

//
export const useTableTemplate = (tableId, argOrgSid, argSearchText, argDateRange, argFilter) => {
  const [items, setItems] = useState([]);
  const structure = getTableStructure(tableId);

  const queryTable = useQueryTable(tableId, {
    orgSid: argOrgSid,
    searchText: argSearchText,
    dateRange: argDateRange,
    filter: argFilter,
  });

  const { enableRefresh, disableRefresh } = useRefresh(tableId, queryTable?.apiCall);

  // * Component Did Mount.
  useEffect(() => {
    queryTable?.apiCall();

    return function unmount() {
      disableRefresh();
    };
  }, []);

  //
  useEffect(() => {
    const _condition = isTodayInRange(argDateRange.rangeStart, argDateRange.rangeEnd);
    if (structure.polling) enableRefresh(_condition && argFilter === '');
  }, [argFilter, argDateRange.rangeStart, argDateRange.rangeEnd]);

  useEffect(() => {
    if (queryTable?.error) {
      // authLogout('Session Expired');
      // history.push('/');
    }
  }, [queryTable?.error]);

  useEffect(() => {
    if (queryTable?.data) {
      setItems(structure.items(queryTable?.data));
    }
  }, [queryTable?.data]);

  return {
    tableProps: {
      items,
      columns: structure.columns,
      structure,
      loading: queryTable?.loading,
    },
    error: queryTable?.error,
  };
};
