import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useAuthContext } from '../contexts/AuthContext';

export const useOrgSid = () => {
  const history = useHistory();
  const location = useLocation();
  const [urlParams, setUrlParams] = useState(queryString.parse(location.search));
  const [orgSid, setOrgSid] = useState();
  const { authData } = useAuthContext();

  const pushQueryString = () => {
    let finalURL = '';

    if (urlParams?.orgSid || authData?.orgId) {
      setOrgSid(urlParams?.orgSid || authData?.orgId);
      finalURL += `?orgSid=${urlParams?.orgSid || authData?.orgId}`;
    }

    history.replace(finalURL);
  };

  useEffect(() => {
    pushQueryString();
  }, [urlParams.orgSid]);

  return {
    orgSid,
    setOrgSid,
    setUrlParams,
  };
};
