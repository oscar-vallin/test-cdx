import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useWpTransmissionsQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { getStepStatusLabel } from '../../../data/constants/FileStatusConstants';
import { useInputValue } from '../../../hooks/useInputValue';

//
export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.ERRORS);

  const { data, loading, error } = useWpTransmissionsQuery({
    variables: {
      orgSid: argOrgSid,
      dateRange: argDateRange,
      filter: argFilter,
    },
  });

  // * Component Did Mount.
  useEffect(() => {
    setLoading(false);
    setFakeLoading(false);
    setError();
  }, []);

  useEffect(() => {
    const doEffect = () => {
      console.log('TableTransmissions.service, data.nodes:', data.wpTransmissions.nodes);
      const _columns = [
        { key: 'datetime', label: 'Delivered On', id: 'datetime', style: 'text' },
        { key: 'planSponsor', label: 'Plan Sponsor', id: 'planSponsor', style: 'text' },
        { key: 'vendorId', label: 'Vendor', id: 'vendorId', style: 'text' },
        { key: 'specId', label: 'Spec', id: 'specId', style: 'text' },
        { key: 'implementation', label: 'Implementation', id: 'implementation', style: 'text' },
        { key: 'inboundFilename', label: 'Client File', id: 'inboundFilename', style: 'link' },
        { key: 'outboundFilename', label: 'Vendor File', id: 'outboundFilename', style: 'link' },
        { key: 'outboundFilesize', label: 'Outbound File Size', id: 'outboundFilesize', style: 'text' },
        { key: 'billingCount', label: 'Billing Unit Count', id: 'billingCount', style: 'text' },
        { key: 'totalRecords', label: 'Total Records', id: 'totalRecords', style: 'text' },
        { key: 'extractType', label: 'Feed', id: 'extractType', style: 'text' },
        { key: 'extractVersion', label: 'Version', id: 'extractVersion', style: 'text' },
      ];

      console.log('Received Transmission Data: ', data);

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

//
const useInput = (placeholder) => {};

//
export const useInputs = () => {
  const startDate = useInput('Start Date...');
  const endDate = useInput('End Date...');
  const localInput = useInputValue('', 'File name, client, ...', '', '');

  return {
    startDate,
    endDate,
    localInput,
  };
};
