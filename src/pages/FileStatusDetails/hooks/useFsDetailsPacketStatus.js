import React, { useState, useEffect } from 'react';
import { useWorkPacketStatusesLazyQuery } from '../../../data/services/graphql';
import { useOrgSid } from '../../../hooks/useOrgSid';

export const useFsDetailsPacketStatus = () => {
  const { orgSid } = useOrgSid();
  const [loadingFs, setLoadingFs] = useState(true);
  const [apiData, setApiData] = useState();
  const [_error, setError] = useState();

  const [_apiCall, { data, loading, error }] = useWorkPacketStatusesLazyQuery({
    variables: {
      orgSid,
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
