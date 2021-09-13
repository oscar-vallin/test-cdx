import { useStoreState, useStoreActions } from 'easy-peasy';

const getStoreObj = ({ ActiveDomainStore }) => ActiveDomainStore;

export const useActiveDomainStore = (): any => {
  const { nav, domainOrg } = useStoreState(getStoreObj);
  const { setDashboardNav, setAdminNav, setCurrentOrg, setOriginOrg, reset } = useStoreActions(getStoreObj);

  return {
    nav,
    domainOrg,
    setDashboardNav,
    setAdminNav,
    setCurrentOrg,
    setOriginOrg,
    reset,
  };
};
