import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useWorkPacketStatusesLazyQuery, useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useInputValue } from '../../../hooks/useInputValue';

export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.ARCHIVES);

  const { authLogout } = useAuthContext();
  const history = useHistory();

  const [apiCall, data, loading, error] = useWorkPacketStatusesLazyQuery({
    variables: {
      orgSid: argOrgSid ?? 1,
      dateRange: argDateRange,
      filter: argFilter,
    },
  });

  const { enableRefresh, disableRefresh } = useRefresh(TABLE_NAMES.ARCHIVES, apiCall);

  const _columns = [
    { key: 'datetime', label: 'Received On', id: 'datetime', style: 'text' },
    { key: 'vendor', label: 'Vendor', id: 'vendor', style: 'text' },
    { key: 'planSponsor', label: 'Plan Sponsor', id: 'planSponsor', style: 'text' },
    { key: 'clientFile', label: 'Client File', id: 'clientFile', style: 'link' },
    { key: 'vendorFile', label: 'Vendor File', id: 'vendorFile', style: 'link' },
  ];

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
      authLogout(error.message);
      history.push('/');
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
      return doEffect();
    }
  }, [data]);

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
const useInput = (placeholder) => {};

//
export const useInputs = () => {
  const startDate = useInput('Start Date...');
  const endDate = useInput('End Date...');
  const localInput = useInputValue('', 'Extract Name,  Status, Vendor, etc.', '', '');

  return {
    startDate,
    endDate,
    localInput,
  };
};
