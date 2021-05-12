import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useWorkPacketStatusesQuery, useWpTransmissionsQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useInputValue } from '../../../hooks/useInputValue';

export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.ARCHIVES);

  const { authLogout } = useAuthContext();
  const history = useHistory();

  const { data, loading, error } = useWpTransmissionsQuery({
    variables: {
      orgSid: argOrgSid,
      dateRange: argDateRange,
      filter: argFilter,
    },
  });

  // * Component Did Mount
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (error) {
      authLogout(error.message);
      history.push('/');
    }
  }, [error]);

  //
  useEffect(() => {
    const doEffect = () => {
      const _columns = [
        { key: 'datetime', label: 'Delivered On', style: 'text' },
        { key: 'planSponsor', label: 'Plan Sponsor', style: 'text' },
        { key: 'vendorId', label: 'Vendor', style: 'text' },
        { key: 'specId', label: 'Spec', style: 'text' },
        { key: 'implementation', label: 'Implementation', style: 'text' },
        { key: 'inboundFilename', label: 'Client File', style: 'link' },
        { key: 'outboundFilename', label: 'Vendor File', style: 'link' },
        { key: 'outboundFilesize', label: 'Outbound File Size', style: 'text' },
        { key: 'billingCount', label: 'Billing Unit Count', style: 'text' },
        { key: 'totalRecords', label: 'Total Records', style: 'text' },
        { key: 'extractType', label: 'Feed', style: 'text' },
        { key: 'extractVersion', label: 'Version', style: 'text' },
      ];

      const _items = data.wpTransmissions.nodes.map((item) => {
        const datetime = format(new Date(item.deliveredOn), 'MM/dd/yyyy hh:mm a');

        return [
          formatField(datetime, 'text', 'datetime', datetime),
          formatField(item.planSponsorId, 'text', 'planSponsor', item.planSponsorId),
          formatField(item.vendorId, 'text', 'vendorId', item.vendorId),
          formatField(item.specId, 'text', 'specId', item.specId),
          formatField(item.implementation, 'text', 'implementation', item.implementation),
          formatField(item.inboundFilename, 'link', 'inboundFilename', item.inboundFilename),
          formatField(item.outboundFilename, 'link', 'outboundFilename', item.outboundFilename),
          formatField(item.outboundFilesize, 'text', 'outboundFilesize', item.outboundFilesize),
          formatField(item.billingCount, 'text', 'billingCount', item.billingCount),
          formatField(item.totalRecords, 'text', 'totalRecords', item.totalRecords),
          formatField(item.extractType, 'text', 'extractType', item.extractType),
          formatField(item.extractVersion, 'text', 'extractVersion', item.extractVersion),
        ];
      });

      setColumns(_columns);
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
