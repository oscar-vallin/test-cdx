import { useActiveDomainStore } from '../store/ActiveDomainStore';

export const useOrgSid = () => {
  const ActiveDomainStore = useActiveDomainStore();

  const updateOrgSid = (orgSid) => {
    ActiveDomainStore.setCurrentOrg({ orgSid, destination: null });
  };

  return {
    orgSid: ActiveDomainStore.domainOrg.current.orgSid,
    setOrgSid: updateOrgSid,
  };
};
