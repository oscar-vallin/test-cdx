import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useStoreActions, useStoreState } from 'easy-peasy';

export const useOrgSid = () => {
  const history = useHistory();
  const location = useLocation();
  const [urlParams, setUrlParams] = useState(queryString.parse(location.search));
  console.log(location);

  const authData = useStoreState(({ AuthStore }) => AuthStore.data);
  const orgId = useStoreState(({ ActiveOrgStore }) => ActiveOrgStore.orgSid);
  const updateOrgSid = useStoreActions(({ ActiveOrgStore }) => ActiveOrgStore.updateOrgSid);

  const pushQueryString = () => {
    const { ...search } = urlParams;

    const params = {
      orgSid: orgId || authData?.orgId,
      ...search,
    };

    if (params.orgSid) {
      updateOrgSid(params.orgSid);
    }

    location.search = queryString.stringify(params);

    history.replace(`${location.pathname}?${location.search}`);
  };

  useEffect(() => {
    pushQueryString();
  }, [urlParams.orgSid]);

  return {
    orgSid: orgId,
    setOrgSid: updateOrgSid,
    setUrlParams,
  };
};
