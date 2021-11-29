import { useEffect, useState } from 'react';
import { useActivityComplete } from './hooks/useActivityComplete.service';
import { useActivityErrored } from './hooks/useActivityErrored.service';
import { useActivityProcess } from './hooks/useActivityProcess.service';
import { OrganizationLink } from '../../../data/services/graphql';
// import {ApolloError} from "@apollo/client";

type ActivityData = {
  items: OrganizationLink[];
  loading: boolean;
};

type AllActivityData = {
  tableProc: ActivityData;
  tableComp: ActivityData;
  tableError: ActivityData;
};

export const useTable = (startDate: Date, endDate: Date): AllActivityData => {
  const [_loadingProc, setLoadingProc] = useState(true);
  const [_loadingComp, setLoadingComp] = useState(true);
  const [_loadingError, setLoadingError] = useState(true);
  const [itemsProc, setItemsProc] = useState<OrganizationLink[]>([]);
  const [itemsComp, setItemsComp] = useState<OrganizationLink[]>([]);
  const [itemsError, setItemsError] = useState<OrganizationLink[]>([]);

  const { dataComplete, loadingComp } = useActivityComplete(startDate, endDate);
  const { dataError, loadingError } = useActivityErrored(startDate, endDate);
  const { dataProcess, loadingProc } = useActivityProcess(startDate, endDate);

  // * Component Did Mount.

  useEffect(() => {
    const doEffect = () => {
      const _itemsProcess = dataProcess?.exchangeActivityInProcess?.nodes ?? [];

      setItemsProc(_itemsProcess as OrganizationLink[]);

      const _itemsComplete = dataComplete?.exchangeActivityTransmitted?.nodes ?? [];

      setItemsComp(_itemsComplete as OrganizationLink[]);

      const _itemsErrored = dataError?.exchangeActivityErrored?.nodes ?? [];

      setItemsError(_itemsErrored as OrganizationLink[]);
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
  };
};
