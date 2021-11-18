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
        dateRange: { rangeStart: '2021-08-15T00:00:00.000Z', rangeEnd: '2021-09-15T23:59:59.000Z' },
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
