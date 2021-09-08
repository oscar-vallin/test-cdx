import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useAuthContext } from '../contexts/AuthContext';

export const useOrgSid = () => {
  const history = useHistory();
  const location = useLocation();
  const [urlParams, setUrlParams] = useState(queryString.parse(location.search));

  const authData = useStoreState(({ AuthStore }) => AuthStore.data);
  const orgSid = useStoreState(({ ActiveOrgStore }) => ActiveOrgStore.orgSid);
  const updateOrgSid = useStoreActions(({ ActiveOrgStore }) => ActiveOrgStore.updateOrgSid);

  const pushQueryString = () => {
    let finalURL = '';

    if (urlParams?.orgSid || authData?.orgId) {
      updateOrgSid(urlParams?.orgSid || authData?.orgId);
      finalURL += `?orgSid=${urlParams?.orgSid || authData?.orgId}`;
    }

    history.replace({ search: finalURL });
  };

  useEffect(() => {
    pushQueryString();
  }, [urlParams.orgSid]);

  return {
    orgSid,
    setOrgSid: updateOrgSid,
    setUrlParams,
  };
};
