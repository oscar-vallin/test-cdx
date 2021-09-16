import { useState, useEffect } from 'react';
import { useWorkPacketStatusesLazyQuery } from '../../../../data/services/graphql';

export const useUpdateFileStatus = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [loadingFs, setLoadingFs] = useState(true);
  const [apiData, setApiData] = useState();
  const [_error, setError] = useState();

  let argDateRange;
  let argFilter;

  const [_apiCall, { data, loading, error }] = useWorkPacketStatusesLazyQuery({
    variables: {
      orgSid: 1,
      dateRange: argDateRange,
      filter: argFilter,
    },
  });

  useEffect(() => {
    setLoadingFs(loading);
  }, [loading]);

  useEffect(() => {
    if (data) {
      setApiData(data);
    }
  }, [data]);

  useEffect(() => {
    setError(error);
  }, [error]);

  const fileStatusQuery = async () => {
    setProcessing(true);

    await _apiCall();

    setProcessing(false);
  };

  return { fileStatusQuery, apiData, loadingFs, _error, isProcessing };
};
