import { ApolloError } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useWorkPacketStatusesLazyQuery, WorkPacketStatusesQuery } from '../../../data/services/graphql';
import { useOrgSid } from '../../../hooks/useOrgSid';

export const useFsDetailsPacketStatus = () => {
  const { orgSid } = useOrgSid();
  const [loadingFs, setLoadingFs] = useState(true);
  const [apiData, setApiData] = useState<WorkPacketStatusesQuery | undefined>();
  const [_error, setError] = useState<ApolloError | undefined>();

  const [_apiCall, { data, loading, error }] = useWorkPacketStatusesLazyQuery({
    variables: {
      orgSid,
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

  const fSPacketStatusQuery = async () => {
    setLoadingFs(true);

    await _apiCall();

    setLoadingFs(false);
  };

  return { fSPacketStatusQuery, apiData, loadingFs, _error };
};
