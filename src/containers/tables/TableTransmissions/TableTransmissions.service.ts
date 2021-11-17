import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useWpTransmissionsQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';

export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[] | undefined>([]);
  const [columns, setColumns] = useState<any[] | undefined>([]);
  const structure = getTableStructure(TABLE_NAMES.ARCHIVES);

  const { data, loading, error } = useWpTransmissionsQuery({
    variables: {
      orgSid: argOrgSid,
      dateRange: argDateRange,
      pageableInput: {
        pageNumber: 0,
        pageSize: 100,
      },
    },
  });

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
  }, []);

  useEffect(() => {
    if (error) {
      // authLogout(error.message);
      // history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const _items = data?.wpTransmissions?.nodes?.map((item) => {
        const datetime = format(new Date(item?.deliveredOn), 'MM/dd/yyyy hh:mm a');

        return [
          formatField(datetime, 'text', 'datetime', datetime, null),
          formatField(item?.planSponsorId, 'text', 'planSponsor', item?.planSponsorId, null),
          formatField(item?.vendorId, 'text', 'vendorId', item?.vendorId, null),
          formatField(item?.specId, 'text', 'specId', item?.specId, null),
          formatField(item?.implementation, 'text', 'implementation', item?.implementation, null),
          formatField(item?.inboundFilename, 'link', 'inboundFilename', item?.inboundFilename, null),
          formatField(item?.outboundFilename, 'link', 'outboundFilename', item?.outboundFilename, null),
          formatField(item?.outboundFilesize, 'text', 'outboundFilesize', item?.outboundFilesize, null),
          formatField(item?.billingCount, 'text', 'billingCount', item?.billingCount, null),
          formatField(item?.totalRecords, 'text', 'totalRecords', item?.totalRecords, null),
          formatField(item?.extractType, 'text', 'extractType', item?.extractType, null),
          formatField(item?.extractVersion, 'text', 'extractVersion', item?.extractVersion, null),
        ];
      });

      setColumns(_columns);
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
