import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useExchangeActivityInProcessQuery } from '../../../data/services/graphql';
import { useActivityComplete } from './hooks/useActivityComplete';
import { useActivityErrored } from './hooks/useActivityErrored';
import { formatField } from '../../../helpers/tableHelpers';

export const useTable = (argOrgSid, argDateRange, argFilter) => {
  const [_loading, setLoading] = useState(true);
  const [itemsProc, setItemsProc] = useState([]);
  const [itemsComp, setItemsComp] = useState([]);
  const [itemsError, setItemsError] = useState([]);
  // const [columns, setColumns] = useState([]);

  const { apiData, loadingComp } = useActivityComplete();
  const { apiDataError, loadingError } = useActivityErrored();

  const { data, loading, error } = useExchangeActivityInProcessQuery({
    variables: {
      orgSidInput: { orgSid: 1 },
      dateRange: { rangeStart: '2020-01-01T00:00:00-08:00', rangeEnd: '2020-01-01T23:59:59-08:00' },
      pageableInput: {
        pageNumber: 0,
        pageSize: 100,
      },
    },
  });

  //   // * Component Did Mount.
  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    const doEffect = () => {
      console.log('data progress: ', apiDataError);

      const _itemsProcess = data.exchangeActivityInProcess.nodes.map(({ id, name, activityTime }) => {
        console.log('data progress: ', id, name, activityTime);
        const datetime = format(new Date(activityTime), 'MM/dd/yyyy hh:mm a');

        return [
          formatField(id, 'id', id),
          formatField(name, 'name', name),
          formatField(datetime, 'activity', datetime),
        ];
      });

      setItemsProc(_itemsProcess);

      const _itemsComplete = apiData.exchangeActivityTransmitted.nodes.map(({ id, name, activityTime }) => {
        console.log('data progress: ', id, name, activityTime);
        const datetime = format(new Date(activityTime), 'MM/dd/yyyy hh:mm a');

        return [
          formatField(id, 'id', id),
          formatField(name, 'name', name),
          formatField(datetime, 'activity', datetime),
        ];
      });

      setItemsComp(_itemsComplete);

      const _itemsErrored = apiDataError.exchangeActivityErrored.nodes.map(({ id, name, activityTime }) => {
        console.log('data progress: ', id, name, activityTime);
        const datetime = format(new Date(activityTime), 'MM/dd/yyyy hh:mm a');

        return [
          formatField(id, 'id', id),
          formatField(name, 'name', name),
          formatField(datetime, 'activity', datetime),
        ];
      });

      setItemsError(_itemsErrored);
    };
    if (data && apiData && apiDataError) {
      return doEffect();
    }
  }, [data]);
  // * Loading Data
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  return {
    tableProc: {
      items: itemsProc,
      loading: _loading,
    },
    tableComp: {
      items: itemsComp,
      loading: loadingComp,
    },
    tableError: {
      items: itemsError,
      loading: loadingError,
    },
    error,
  };
};
