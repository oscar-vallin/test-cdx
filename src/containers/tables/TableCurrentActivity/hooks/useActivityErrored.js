import React, { useState, useEffect } from 'react';
import { useExchangeActivityErroredQuery } from '../../../../data/services/graphql';

export const useActivityErrored = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [loadingError, setLoadingError] = useState(true);
  const [dataError, setDataError] = useState();
  const [apiError, setApiError] = useState();

  const { data, loading, error } = useExchangeActivityErroredQuery({
    variables: {
      orgSidInput: { orgSid: 1 },
      dateRange: { rangeStart: '2020-01-01T00:00:00-08:00', rangeEnd: '2020-01-01T23:59:59-08:00' },
      pageableInput: {
        pageNumber: 0,
        pageSize: 100,
      },
    },
  });
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
