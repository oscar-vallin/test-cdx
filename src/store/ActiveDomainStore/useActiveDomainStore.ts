import { useStoreState, useStoreActions } from 'easy-peasy';

const getStoreObj = ({ ActiveDomainStore }) => ActiveDomainStore;

export const useActiveDomainStore = (): any => {
  console.log('🚀 ~ file: useActiveDomainStore.ts ~ line 8 ~ useActiveDomainStore ~ getStoreObj', getStoreObj);

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
