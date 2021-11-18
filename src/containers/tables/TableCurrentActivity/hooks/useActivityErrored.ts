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
        dateRange: { rangeStart: '2021-08-15T00:00:00.000Z', rangeEnd: '2021-09-15T23:59:59.000Z' },
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
