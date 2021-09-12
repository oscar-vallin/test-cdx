import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useActivityComplete } from './hooks/useActivityComplete';
import { useActivityErrored } from './hooks/useActivityErrored';
import { useActivityProcess } from './hooks/useActivityProcess';
import { formatField } from '../../../helpers/tableHelpers';

export const useTable = () => {
  const [_loadingProc, setLoadingProc] = useState(true);
  const [_loadingComp, setLoadingComp] = useState(true);
  const [_loadingError, setLoadingError] = useState(true);
  const [itemsProc, setItemsProc] = useState([]);
  const [itemsComp, setItemsComp] = useState([]);
  const [itemsError, setItemsError] = useState([]);

  const { dataComplete, loadingComp } = useActivityComplete();
  const { dataError, loadingError } = useActivityErrored();
  const { dataProcess, loadingProc, apiError } = useActivityProcess();

  // * Component Did Mount.

  useEffect(() => {
    const doEffect = () => {
      const _itemsProcess = dataProcess.exchangeActivityInProcess.nodes.map(({ name, activityTime }) => {
        const datetime = format(new Date(activityTime), 'MM/dd/yyyy hh:mm a');

        return [formatField(name, 'name', name), formatField(datetime, 'activity', datetime)];
      });

      setItemsProc(_itemsProcess);

      const _itemsComplete = dataComplete.exchangeActivityTransmitted.nodes.map(({ name, activityTime }) => {
        const datetime = format(new Date(activityTime), 'MM/dd/yyyy hh:mm a');

        return [formatField(name, 'name', name), formatField(datetime, 'activity', datetime)];
      });

      setItemsComp(_itemsComplete);

      const _itemsErrored = dataError.exchangeActivityErrored.nodes.map(({ name, activityTime }) => {
        const datetime = format(new Date(activityTime), 'MM/dd/yyyy hh:mm a');

        return [formatField(name, 'name', name), formatField(datetime, 'activity', datetime)];
      });

      setItemsError(_itemsErrored);
    };

    if (dataProcess && dataComplete && dataError) {
      setLoadingProc(false);
      setLoadingComp(false);
      setLoadingError(false);
      doEffect();
    }
  }, [dataProcess, dataComplete, dataError]);

  // * Loading Data
  useEffect(() => {
    setLoadingProc(loadingProc);
    setLoadingComp(loadingComp);
    setLoadingError(loadingError);
  }, [loadingProc, loadingComp, loadingError]);
  return {
    tableProc: {
      items: itemsProc,
      loading: _loadingProc,
    },
    tableComp: {
      items: itemsComp,
      loading: _loadingComp,
    },
    tableError: {
      items: itemsError,
      loading: _loadingError,
    },
    apiError,
  };
};
