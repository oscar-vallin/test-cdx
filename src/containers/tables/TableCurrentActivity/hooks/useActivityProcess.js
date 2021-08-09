import React, { useState, useEffect } from 'react';
import { useExchangeActivityInProcessLazyQuery } from '../../../../data/services/graphql';
import { useOrgSid } from '../../../../hooks/useOrgSid';

export const useActivityProcess = () => {
  const [loadingProc, setLoadingProc] = useState(true);
  const [dataProcess, setData] = useState();
  const [apiError, setApiError] = useState();
  const { orgSid } = useOrgSid();
  const [useExchangeActivityInProcessLazy, { data, loading, error }] = useExchangeActivityInProcessLazyQuery();

  useEffect(() => {
    useExchangeActivityInProcessLazy({
      variables: {
        orgSidInput: { orgSid },
        dateRange: { rangeStart: '2020-01-01T00:00:00-08:00', rangeEnd: '2020-01-01T23:59:59-08:00' },
        pageableInput: {
          pageNumber: 0,
          pageSize: 100,
        },
      },
    });
  }, [orgSid]);

  useEffect(() => {
    setLoadingProc(loading);
  }, []);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  //*
  useEffect(() => {
    setApiError(error);
  }, [error]);

  return { dataProcess, loadingProc, apiError };
};
