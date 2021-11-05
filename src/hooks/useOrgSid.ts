import { useHistory, useLocation } from 'react-router-dom';
import { useActiveDomainStore } from '../store/ActiveDomainStore';

export const useOrgSid = () => {
  const ActiveDomainStore = useActiveDomainStore();

  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const orgSid = urlParams.get('orgSid') ?? '-1';

  const updateOrgSid = (orgSid) => {
    ActiveDomainStore.setCurrentOrg({ orgSid, destination: null });
    urlParams.set('orgSid', orgSid);
    location.search = urlParams.toString();
    history.push(`${location.pathname}?${location.search}`);
  };

  return {
    orgSid,
    setOrgSid: updateOrgSid,
  };
};
