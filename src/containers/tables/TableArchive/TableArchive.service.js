import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useWorkPacketStatusesQuery } from '../../../data/services/graphql';
import { getTableStructure, TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useInputValue } from '../../../hooks/useInputValue';

export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const structure = getTableStructure(TABLE_NAMES.ARCHIVES);

  const { data, loading, error } = useWorkPacketStatusesQuery({
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

  //
  useEffect(() => {
    const doEffect = () => {
      console.log('TableErrors.service, data:', data);
      const _columns = [
        { key: 'datetime', label: 'Received On', id: 'datetime', style: 'text' },
        { key: 'vendor', label: 'Vendor', id: 'vendor', style: 'text' },
        { key: 'planSponsor', label: 'Plan Sponsor', id: 'planSponsor', style: 'text' },
        { key: 'clientFile', label: 'Client File', id: 'clientFile', style: 'link' },
        { key: 'vendorFile', label: 'Vendor File', id: 'vendorFile', style: 'link' },
      ];

      const _items = data.workPacketStatuses.map(
        ({
          timestamp,
          clientFileArchivePath,
          inboundFilename,
          workOrderId,
          planSponsorId,
          vendorId,
          vendorFileArchivePath,
        }) => {
          const datetime = format(new Date(timestamp), 'MM/dd/yyyy hh:mm a');

          return [
            formatField(datetime, 'text', 'datetime', datetime),
            formatField(vendorId, 'text', 'vendor', vendorId),
            formatField(planSponsorId, 'text', 'planSponsor', planSponsorId),
            formatField(inboundFilename, 'link', 'clientFile', clientFileArchivePath),
            formatField(workOrderId, 'link', 'vendorFile', vendorFileArchivePath),
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

const useInput = (placeholder) => {
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e);
  };

  return {
    value,
    onChange,
    placeholder,
  };
};

//
export const useInputs = () => {
  const startDate = useInput('Start Date...');
  const endDate = useInput('End Date...');

  return {
    startDate,
    endDate,
  };
};
