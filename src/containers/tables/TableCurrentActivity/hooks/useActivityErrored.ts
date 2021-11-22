/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError } from '@apollo/client';
import { useState, useEffect } from 'react';
import { ExchangeActivityErroredQuery, useExchangeActivityErroredLazyQuery } from '../../../../data/services/graphql';
import { useOrgSid } from '../../../../hooks/useOrgSid';
import { useQueryHandler } from '../../../../hooks/useQueryHandler';

export const useActivityErrored = (startDate: Date, endDate: Date) => {
  const [loadingError, setLoadingError] = useState(true);
  const [dataError, setDataError] = useState<ExchangeActivityErroredQuery>();
  const [apiError, setApiError] = useState<ApolloError | undefined>();
  const { orgSid } = useOrgSid();
  const [apiExchangeActivityErroredLazy, { data, loading, error }] = useQueryHandler(
    useExchangeActivityErroredLazyQuery
  );

  useEffect(() => {
    apiExchangeActivityErroredLazy({
      variables: {
        orgSidInput: { orgSid },
        dateRange: { rangeStart: startDate, rangeEnd: endDate },
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
