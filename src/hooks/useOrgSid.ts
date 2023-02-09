import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';

export const useOrgSid = () => {
  const ActiveDomain = useActiveDomainUseCase();
  const ActiveDomainStore = useActiveDomainStore();

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const orgSid = urlParams.get('orgSid') ?? '-1';
  const startDate = urlParams.get('startDate');
  const endDate = urlParams.get('endDate');

  // If the orgSid is different than what is in session, update the session
  useEffect(() => {
    if (orgSid && orgSid !== ActiveDomainStore.domainOrg?.current?.orgSid) {
      ActiveDomain.updateCurrentOrgNav(orgSid);
    }
  }, [orgSid]);

  return {
    orgSid,
    startDate,
    endDate,
  };
};
