import { useLocation } from 'react-router-dom';
import { useActiveDomainStore } from '../store/ActiveDomainStore';
import { useEffect } from 'react';

export const useOrgSid = () => {
  const ActiveDomainStore = useActiveDomainStore();

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const orgSid = urlParams.get('orgSid') ?? '-1';

  // If the orgSid is different than what is in session, update the session
  useEffect(() => {
    if (orgSid && orgSid !== ActiveDomainStore?.currentOrg?.orgSid) {
      ActiveDomainStore.setCurrentOrg({ orgSid: orgSid, destination: null });
    }
  }, [orgSid]);

  return {
    orgSid
  };
};
