import { useState, useEffect } from 'react';
import { useWorkPacketStatusDetailsLazyQuery } from '../../../data/services/graphql';
import { useAuthContext } from '../../../contexts/AuthContext';

export const useFsPacketStatusDetails = (realId) => {
  const { orgSid } = useAuthContext();
  const [loadingPacketDetail, setLoadingPacketDetail] = useState(true);
  const [apiData, setApiData] = useState();
  const [_error, setError] = useState();

  const [_apiCall, { data, loading, error }] = useWorkPacketStatusDetailsLazyQuery({
    variables: {
      orgSid,
      workOrderId: realId,
    },
  });

  useEffect(() => {
    setLoadingPacketDetail(loading);
  }, [loading]);

  useEffect(() => {
    if (data) {
      setApiData(data);
    }
  }, [data]);

  useEffect(() => {
    setError(error);
  }, [error]);

  const fSPacketStatusDetailQuery = async () => {
    setLoadingPacketDetail(true);

    await _apiCall(realId);

    setLoadingPacketDetail(false);
  };

  return { fSPacketStatusDetailQuery, apiData, loadingPacketDetail, _error };
};
