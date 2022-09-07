/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError } from '@apollo/client';
import { useState, useEffect } from 'react';
import {
  ExchangeActivityTransmittedQuery,
  useExchangeActivityTransmittedLazyQuery,
} from '../../../../data/services/graphql';
import { useOrgSid } from '../../../../hooks/useOrgSid';
import { useQueryHandler } from '../../../../hooks/useQueryHandler';

export const useActivityComplete = (startDate: Date, endDate: Date) => {
  const [loadingComp, setLoadingComp] = useState(true);
  const [dataComplete, setDataComp] = useState<ExchangeActivityTransmittedQuery | undefined>();
  const [apiError, setApiError] = useState<ApolloError | undefined>();
  const { orgSid } = useOrgSid();
  const [apiExchangeActivityTransmittedLazy, { data, loading, error }] = useQueryHandler(
    useExchangeActivityTransmittedLazyQuery,
  );

  useEffect(() => {
    apiExchangeActivityTransmittedLazy({
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
