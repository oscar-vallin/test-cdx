/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError } from '@apollo/client';
import { useState, useEffect } from 'react';
import {
  ExchangeActivityTransmittedQuery,
  useExchangeActivityTransmittedLazyQuery,
} from '../../../../data/services/graphql';
import { useOrgSid } from '../../../../hooks/useOrgSid';

export const useActivityComplete = () => {
  const [loadingComp, setLoadingComp] = useState(true);
  const [dataComplete, setDataComp] = useState<ExchangeActivityTransmittedQuery | undefined>();
  const [apiError, setApiError] = useState<ApolloError | undefined>();
  const { orgSid } = useOrgSid();
  const [apiExchangeActivityTransmittedLazy, { data, loading, error }] = useExchangeActivityTransmittedLazyQuery();

  useEffect(() => {
    apiExchangeActivityTransmittedLazy({
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
    setLoadingComp(loading);
  }, []);

  useEffect(() => {
    if (data) {
      setDataComp(data);
    }
  }, [data]);

  //*
  useEffect(() => {
    setApiError(error);
  }, [error]);

  return { dataComplete, loadingComp, apiError };
};
