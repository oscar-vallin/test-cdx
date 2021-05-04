import React, { useState, useEffect } from 'react';
import { useExchangeActivityTransmittedQuery } from '../../../../data/services/graphql';

export const useActivityComplete = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [loadingComp, setLoadingComp] = useState(true);
  const [apiData, setApiData] = useState();
  const [apiError, setApiError] = useState();

  const { data, loading, error } = useExchangeActivityTransmittedQuery({
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
    setLoadingComp(false);
  }, []);

  useEffect(() => {
    if (data) {
      setApiData(data);
    }
  }, [data]);

  //*
  useEffect(() => {
    setApiError(error);
  }, [error]);

  return { apiData, loadingComp };
};
