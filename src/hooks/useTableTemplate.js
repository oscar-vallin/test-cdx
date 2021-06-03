import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuthContext } from '../contexts/AuthContext';
import { getTableStructure, useQueryTable } from '../data/constants/TableConstants';
import { getItems } from '../data/constants/tables/ArchiveTableConstants';
import { isCDXToday } from '../helpers/tableHelpers';
import { useRefresh } from './useRefresh';

//
export const useTableTemplate = (tableId, argOrgSid, argDateRange, argFilter) => {
  const [items, setItems] = useState([]);
  const structure = getTableStructure(tableId);

  const { authLogout } = useAuthContext();
  const history = useHistory();

  const { apiCall, data, loading, error } = useQueryTable(tableId, {
    orgId: argOrgSid,
    dateRange: argDateRange,
    filter: argFilter,
  });

  const { enableRefresh, disableRefresh } = useRefresh(tableId, apiCall);

  // * Component Did Mount.
  useEffect(() => {
    apiCall();

    return function unmount() {
      disableRefresh();
    };
  }, []);

  //
  useEffect(() => {
    const _condition = isCDXToday(argDateRange.rangeStart, argDateRange.rangeEnd);
    if (structure.polling) enableRefresh(_condition && argFilter === '');
  }, [argDateRange, argFilter]);

  useEffect(() => {
    if (error) {
      authLogout('Session Expired');
      history.push('/');
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setItems(structure.items(data));
    }
  }, [data]);

  return {
    tableProps: {
      items,
      columns: structure.columns,
      structure,
      loading: loading,
    },
    error,
  };
};
