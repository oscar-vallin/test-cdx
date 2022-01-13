import { useHistory, useLocation } from 'react-router-dom';
import { useActiveDomainStore } from '../store/ActiveDomainStore';

export const useOrgSid = () => {
  const ActiveDomainStore = useActiveDomainStore();

  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const orgSid = urlParams.get('orgSid') ?? '-1';

  const updateOrgSid = (sid) => {
    ActiveDomainStore.setCurrentOrg({ orgSid: sid, destination: null });
    urlParams.set('orgSid', sid);
    location.search = urlParams.toString();
    history.push(`${location.pathname}?${location.search}`);
  };

  return {
    orgSid,
    setOrgSid: updateOrgSid,
  };
};
