import React, { useState, useEffect } from 'react';
import { useExchangeActivityErroredLazyQuery } from '../../../../data/services/graphql';
import { useOrgSid } from '../../../../hooks/useOrgSid';

export const useActivityErrored = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [loadingError, setLoadingError] = useState(true);
  const [dataError, setDataError] = useState();
  const [apiError, setApiError] = useState();
  const { orgSid } = useOrgSid();
  const [useExchangeActivityErroredLazy, { data, loading, error }] = useExchangeActivityErroredLazyQuery();

  useEffect(() => {
    useExchangeActivityErroredLazy({
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
    setLoadingError(loading);
  }, []);

  useEffect(() => {
    if (data) {
      setDataError(data);
    }
  }, [data]);

  //*
  useEffect(() => {
    setApiError(error);
  }, [error]);

  return { dataError, loadingError };
};
