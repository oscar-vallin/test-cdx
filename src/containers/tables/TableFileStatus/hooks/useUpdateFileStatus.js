import { useState, useEffect } from 'react';
import { useWorkPacketStatusesLazyQuery } from '../../../../data/services/graphql';

export const useUpdateFileStatus = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [loadingFs, setLoadingFs] = useState(true);
  const [apiData, setApiData] = useState();
  const [_error, setError] = useState();

  let argSearchText;
  let argDateRange;
  let argFilter;

  const [_apiCall, { data, loading, error }] = useWorkPacketStatusesLazyQuery({
    variables: {
      orgSid: 1,
      searchText: argSearchText,
      dateRange: argDateRange,
      filter: argFilter,
      pageableInput: {
        pageNumber: 0,
        pageSize: 100,
      },
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
