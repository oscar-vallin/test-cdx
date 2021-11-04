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
    const { origin } = ActiveDomainStore.domainOrg;

    if (SessionStore.user.token && origin.orgSid) {
      performNavUpdate({ orgSid: origin.orgSid, domain: 'DASHBOARD' });

      if (origin.type === 'ORGANIZATION') {
        performNavUpdate({ orgSid: origin.orgSid, domain: 'ORGANIZATION' });
      }
    }
  }, [SessionStore.user.token, ActiveDomainStore.domainOrg.origin]);

  useEffect(() => {
    const { orgSid } = ActiveDomainStore.domainOrg.current;

    if (SessionStore.user.token && orgSid) {
      performCurrentOrgUpdate({ orgSid });
    }
  }, [SessionStore.user.token, ActiveDomainStore.domainOrg.current.orgSid]);

  useEffect(() => {
    const { dashboard } = activeDomainState.nav;

    if (dashboard.data) {
      ActiveDomainStore.setDashboardNav(dashboard.data.navigateToNewDomain.navItems.map(parseToStoreObj));
    }
  }, [activeDomainState.nav.dashboard.data]);

  useEffect(() => {
    const { admin } = activeDomainState.nav;

    if (admin.data) {
      ActiveDomainStore.setAdminNav(admin.data.navigateToNewDomain.navItems.map(parseToStoreObj));
    }
  }, [activeDomainState.nav.admin.data]);

  useEffect(() => {
    const { currentOrg } = activeDomainState;

    if (currentOrg.data) {
      const { currentOrgNav } = currentOrg.data;

      const subNavItems = currentOrg.data.currentOrgNav.subNavItems.map(parseToStoreObj);

      ActiveDomainStore.setCurrentOrg({
        subNavItems,
        label: currentOrgNav.label,
        orgSid: subNavItems.find(({ label }) => label.includes(currentOrgNav.label))?.orgSid,
      });
    }
  }, [activeDomainState.currentOrg.data]);

  useEffect(() => {
    const { destination } = ActiveDomainStore.domainOrg.current;

    if (destination) {
      ActiveDomainStore.setCurrentOrg({ destination: null });

      history.push(URL_ROUTES[destination]);
    }
  }, [ActiveDomainStore.domainOrg.current.destination]);

  return <ActiveDomainContext.Provider value={children}>{children}</ActiveDomainContext.Provider>;
};
