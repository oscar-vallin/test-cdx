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
        dateRange: { rangeStart: '2020-01-01T00:00:00-08:00', rangeEnd: '2020-01-01T23:59:59-08:00' },
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
