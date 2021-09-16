import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useQueryParams } from './useQueryParams';
import { useActiveDomainStore } from '../store/ActiveDomainStore';

export const useOrgSid = () => {
  const QueryParams = useQueryParams();
  const ActiveDomainStore = useActiveDomainStore();

  const history = useHistory();
  const location = useLocation();

  const updateOrgSid = (orgSid) => {
    ActiveDomainStore.setCurrentOrg({ orgSid, destination: null });

    history.replace(QueryParams.replace(location, { orgSid }));
  };

  return {
    orgSid: ActiveDomainStore.domainOrg.current.orgSid,
    setOrgSid: updateOrgSid,
  };
};
