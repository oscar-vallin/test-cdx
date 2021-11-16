/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError } from '@apollo/client';
import { useState, useEffect } from 'react';
import { ExchangeActivityErroredQuery, useExchangeActivityErroredLazyQuery } from '../../../../data/services/graphql';
import { useOrgSid } from '../../../../hooks/useOrgSid';

export const useActivityErrored = () => {
  const [loadingError, setLoadingError] = useState(true);
  const [dataError, setDataError] = useState<ExchangeActivityErroredQuery>();
  const [apiError, setApiError] = useState<ApolloError | undefined>();
  const { orgSid } = useOrgSid();
  const [apiExchangeActivityErroredLazy, { data, loading, error }] = useExchangeActivityErroredLazyQuery();

  useEffect(() => {
    apiExchangeActivityErroredLazy({
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

  return { dataError, loadingError, apiError };
};
