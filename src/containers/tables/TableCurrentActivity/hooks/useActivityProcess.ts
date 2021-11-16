/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError } from '@apollo/client';
import { useState, useEffect } from 'react';
import {
  ExchangeActivityInProcessQuery,
  useExchangeActivityInProcessLazyQuery,
} from '../../../../data/services/graphql';
import { useOrgSid } from '../../../../hooks/useOrgSid';

export const useActivityProcess = () => {
  const [loadingProc, setLoadingProc] = useState(true);
  const [dataProcess, setData] = useState<ExchangeActivityInProcessQuery>();
  const [apiError, setApiError] = useState<ApolloError | undefined>();
  const { orgSid } = useOrgSid();
  const [apiExchangeActivityInProcessLazy, { data, loading, error }] = useExchangeActivityInProcessLazyQuery();

  useEffect(() => {
    apiExchangeActivityInProcessLazy({
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
