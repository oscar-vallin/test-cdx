import { createTypedHooks } from 'easy-peasy';
import { StoreModel } from 'src/store/index';


export const useActiveDomainStore = (): any => {
  const typedHooks = createTypedHooks<StoreModel>();

  const { nav, domainOrg } = typedHooks.useStoreState((state) => state.ActiveDomainStore);
  const { setDashboardNav, setAdminNav, setCurrentOrg, setOriginOrg, reset }
    = typedHooks.useStoreActions((state) => state.ActiveDomainStore);

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
