/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, createContext, ReactNode } from 'react';
import { useHistory } from 'react-router';

import { URL_ROUTES } from 'src/data/constants/RouteConstants';
import { useActiveDomainStore } from '../store/ActiveDomainStore';
import { useSessionStore } from '../store/SessionStore';
import { useActiveDomainUseCase } from '../use-cases/ActiveDomain';

export const ActiveDomainContext = createContext(() => {
  return null;
});

const defaultProps = {
  // children: '',
};

type ActiveDomainContextProviderProps = {
  children?: ReactNode | ReactElement | string | any;
} & typeof defaultProps;

export const ActiveDomainContextProvider = ({ children }: ActiveDomainContextProviderProps): ReactElement => {
  const history = useHistory();
  const SessionStore = useSessionStore();
  const ActiveDomainStore = useActiveDomainStore();
  const { performNavUpdate, performCurrentOrgUpdate, activeDomainState } = useActiveDomainUseCase();

  const parseToStoreObj = (link) => ({
    label: link.label,
    destination: link.page?.type || null,
    orgSid: link.page?.parameters?.find((param) => param.name === 'orgSid')?.idValue || null,
    subNavItems: link.subNavItems?.map(parseToStoreObj),
  });

  useEffect(() => {
    const { origin } = ActiveDomainStore.domainOrg;

    if (SessionStore.user.token && origin.orgSid) {
      performNavUpdate({ orgSid: origin.orgSid });
    }
  }, [SessionStore.user.token, ActiveDomainStore.domainOrg.origin]);

  useEffect(() => {
    const { orgSid } = ActiveDomainStore.domainOrg.current;

    if (SessionStore.status.isAuthenticated && orgSid) {
      performCurrentOrgUpdate({ orgSid });
      performNavUpdate({ orgSid });
    }
  }, [SessionStore.status.stage, ActiveDomainStore.domainOrg.current.orgSid]);

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
        orgId: currentOrgNav.orgId,
        orgSid: subNavItems.find(({ label }) => label.includes(currentOrgNav.label))?.orgSid,
        destination: currentOrgNav.page?.type,
      });
    }
  }, [activeDomainState.currentOrg.data]);

  useEffect(() => {
    const { destination } = ActiveDomainStore.domainOrg.current;
    if (SessionStore.redirectUrl) {
      history.push(SessionStore.redirectUrl);
      SessionStore.setRedirectUrl(null);
    } else if (destination) {
      ActiveDomainStore.setCurrentOrg({ destination: null });
      history.push(`${URL_ROUTES[destination]}?orgSid=${ActiveDomainStore.domainOrg.current.orgSid}`);
    }
  }, [ActiveDomainStore.domainOrg.current.destination]);

  return <ActiveDomainContext.Provider value={children}>{children}</ActiveDomainContext.Provider>;
};

ActiveDomainContextProvider.defaultProps = defaultProps;
