import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useQueryParams } from './useQueryParams';

export const useOrgSid = () => {
  const QueryParams = useQueryParams();

  const history = useHistory();
  const location = useLocation();
  const authData = useStoreState(({ AuthStore }) => AuthStore.data);
  const orgId = useStoreState(({ ActiveOrgStore }) => ActiveOrgStore.orgSid);
  const updateOrgSid = useStoreActions(({ ActiveOrgStore }) => ActiveOrgStore.updateOrgSid);

  const pushQueryString = async () => {
    const orgSid = orgId || authData?.orgId;

    if (orgSid) {
      updateOrgSid(orgSid);
    }

    history.replace(QueryParams.replace(location, { orgSid }));
  };

  useEffect(() => {
    pushQueryString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId || authData?.orgId]);

  return {
    orgSid: orgId,
    setOrgSid: updateOrgSid,
  };
};
