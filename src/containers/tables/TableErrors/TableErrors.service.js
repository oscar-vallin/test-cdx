import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
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

  const { authLogout } = useAuthContext();
  const history = useHistory();

  const { data, loading, error } = useWorkPacketStatusesQuery({
    variables: {
      orgSid: argOrgSid,
      dateRange: argDateRange,
      filter: argFilter,
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

  // * Component Did Mount.
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (error) {
      authLogout(error.message);
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    const doEffect = () => {
      const _columns = [
        { key: 'datetime', label: 'Received On', id: 'datetime', style: 'text' },
        { key: 'clientFile', label: 'Client File', id: 'clientFile', style: 'link' },
        { key: 'workStep', label: 'Work Step', id: 'workStep', style: 'text' },
        { key: 'planSponsor', label: 'Plan Sponsor', id: 'planSponsor', style: 'text' },
        { key: 'vendor', label: 'Vendor', id: 'vendor', style: 'text' },
        { key: 'message', label: 'Message', id: 'message', style: 'text' },
      ];

      const _items = data.workPacketStatuses.map(
        ({ timestamp, clientFileArchivePath, inboundFilename, stepStatus, planSponsorId, vendorId, hasErrors }) => {
          const datetime = format(new Date(timestamp), 'MM/dd/yyyy hh:mm a');
          const message = hasErrors ? 'Error' : '';
          const stepStatusLabel = getStepStatusLabel(stepStatus);

          return [
            formatField(datetime, 'text', 'datetime', datetime),
            formatField(inboundFilename, 'link', 'clientFile', clientFileArchivePath, '(Details)'),
            formatField(stepStatusLabel, 'text', 'workStep', stepStatusLabel),
            formatField(planSponsorId, 'text', 'planSponsor', planSponsorId),
            formatField(vendorId, 'text', 'vendor', vendorId),
            formatField(message, 'text', 'message', message),
          ];
        }
      );

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

//
export const useInputs = () => {
  const localInput = useInputValue('', 'Extract Name,  Status, Vendor, etc.', '', '');

  return {
    localInput,
  };
};
