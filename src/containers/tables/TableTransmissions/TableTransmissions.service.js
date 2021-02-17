import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { getStepStatusLabel } from '../../../data/constants/FileStatusConstants';
import { useInputValue } from '../../../hooks/useInputValue';

//
export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.ERRORS);

  const { data, loading, error } = useWorkPacketStatusesQuery({
    variables: {
      orgSid: argOrgSid,
      dateRange: argDateRange,
      filter: argFilter,
    },
  });

  // * Component Did Mount.
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const doEffect = () => {
      console.log('TableTransmissions.service, data:', data);
      const _columns = [
        { key: 'datetime', label: 'Delivered On', id: 'datetime', style: 'text' },
        { key: 'planSponsor', label: 'Plan Sponsor', id: 'planSponsor', style: 'text' },
        { key: 'vendor', label: 'Vendor', id: 'vendor', style: 'text' },
        { key: 'vendor', label: 'Spec', id: 'vendor', style: 'text' },
        { key: 'vendor', label: 'Implementation', id: 'vendor', style: 'text' },
        { key: 'clientFile', label: 'Client File', id: 'clientFile', style: 'link' },
        { key: 'vendorFile', label: 'Vendor File', id: 'vendorFile', style: 'link' },
        { key: 'message', label: 'Message', id: 'message', style: 'text' },
        // { key: 'message', label: 'Outbound File Size', id: 'message', style: 'text' },
        // { key: 'message', label: 'Billing Unit Count', id: 'message', style: 'text' },
        // { key: 'message', label: 'Total Records', id: 'message', style: 'text' },
        // { key: 'message', label: 'Feed', id: 'message', style: 'text' },
        // { key: 'message', label: 'Version', id: 'message', style: 'text' },
      ];

      const _items = data.workPacketStatuses.map(
        ({
          timestamp,
          clientFileArchivePath,
          inboundFilename,
          planSponsorId,
          vendorId,
          hasErrors,
          workOrderId,
          vendorFileArchivePath,
        }) => {
          const datetime = format(new Date(timestamp), 'MM/dd/yyyy hh:mm a');
          const message = hasErrors ? 'Error' : '';

          return [
            formatField(datetime, 'text', 'datetime', datetime),
            formatField(planSponsorId, 'text', 'planSponsor', planSponsorId),
            formatField(vendorId, 'text', 'vendor', vendorId),
            formatField(vendorId, 'text', 'vendor', vendorId),
            formatField(vendorId, 'text', 'vendor', vendorId),
            formatField(inboundFilename, 'link', 'clientFile', clientFileArchivePath),
            formatField(workOrderId, 'link', 'vendorFile', vendorFileArchivePath),
            formatField(message, 'text', 'message', message),
          ];
        }
      );

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
