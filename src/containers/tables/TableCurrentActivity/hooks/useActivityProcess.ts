/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError } from '@apollo/client';
import { useState, useEffect } from 'react';
import {
  ExchangeActivityInProcessQuery,
  useExchangeActivityInProcessLazyQuery,
} from '../../../../data/services/graphql';
import { useOrgSid } from '../../../../hooks/useOrgSid';
import { useQueryHandler } from '../../../../hooks/useQueryHandler';

export const useActivityProcess = (startDate: Date, endDate: Date) => {
  const [loadingProc, setLoadingProc] = useState(true);
  const [dataProcess, setData] = useState<ExchangeActivityInProcessQuery>();
  const [apiError, setApiError] = useState<ApolloError | undefined>();
  const { orgSid } = useOrgSid();
  const [apiExchangeActivityInProcessLazy, { data, loading, error }] = useQueryHandler(
    useExchangeActivityInProcessLazyQuery
  );

  useEffect(() => {
    apiExchangeActivityInProcessLazy({
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
