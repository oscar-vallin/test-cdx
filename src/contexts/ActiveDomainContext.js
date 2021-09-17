/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, createContext } from 'react';
import { useHistory } from 'react-router';

import { URL_ROUTES } from '../data/constants/RouteConstants';
import { useActiveDomainStore } from '../store/ActiveDomainStore';
import { useSessionStore } from '../store/SessionStore';
import { useActiveDomainUseCase } from '../use-cases/ActiveDomain';

export const ActiveDomainContext = createContext(() => {
  return null;
});

export const ActiveDomainContextProvider = ({ children }) => {
  const history = useHistory();
  const SessionStore = useSessionStore();
  const ActiveDomainStore = useActiveDomainStore();
  const { performNavUpdate, performCurrentOrgUpdate, activeDomainState } = useActiveDomainUseCase();

  const parseToStoreObj = (link) => ({
    label: link.label,
    destination: link.page?.type || null,
    orgSid: link.page?.parameters.find((param) => param.name === 'orgSid')?.idValue || null,
    subNavItems: link.subNavItems?.map(parseToStoreObj),
  });

  useEffect(() => {
    const { isAuthenticated } = SessionStore.status;
    const { origin } = ActiveDomainStore.domainOrg;

    if (isAuthenticated && origin.orgSid) {
      performNavUpdate({ orgSid: origin.orgSid, domain: 'DASHBOARD' });

      if (origin.type === 'ORGANIZATION') {
        performNavUpdate({ orgSid: origin.orgSid, domain: 'ORGANIZATION' });
      }
    }
  }, [SessionStore.status, ActiveDomainStore.domainOrg]);

  useEffect(() => {
    const { orgSid } = ActiveDomainStore.domainOrg.current;

    if (orgSid) {
      performCurrentOrgUpdate({ orgSid });
    }
  }, [ActiveDomainStore.domainOrg.current.orgSid]);

  useEffect(() => {
    const { dashboard } = activeDomainState.nav;

    if (dashboard.data && !dashboard.loading) {
      ActiveDomainStore.setDashboardNav(dashboard.data.navigateToNewDomain.navItems.map(parseToStoreObj));
    }
  }, [activeDomainState.nav.dashboard.loading]);

  useEffect(() => {
    const { admin } = activeDomainState.nav;

    if (admin.data && !admin.loading) {
      ActiveDomainStore.setAdminNav(admin.data.navigateToNewDomain.navItems.map(parseToStoreObj));
    }
  }, [activeDomainState.nav.admin.loading]);

  useEffect(() => {
    const { currentOrg } = activeDomainState;

    if (currentOrg.data && !currentOrg.loading) {
      ActiveDomainStore.setCurrentOrg({
        label: currentOrg.data.currentOrgNav.label,
        subNavItems: currentOrg.data.currentOrgNav.subNavItems.map(parseToStoreObj),
      });
    }
  }, [activeDomainState.currentOrg.loading]);

  useEffect(() => {
    const { destination } = ActiveDomainStore.domainOrg.current;

    if (destination) {
      ActiveDomainStore.setCurrentOrg({ destination: null });

      history.push(URL_ROUTES[destination]);
    }
  }, [ActiveDomainStore.domainOrg.current.destination]);

  return <ActiveDomainContext.Provider>{children}</ActiveDomainContext.Provider>;
};
