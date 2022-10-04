/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CdxWebAppDomain, useNavigateToNewDomainLazyQuery } from 'src/data/services/graphql';
import { useSessionStore } from 'src/store/SessionStore';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';

export const useActiveDomainUseCase = (onFetchComplete?: () => void) => {
  const ActiveDomainStore = useActiveDomainStore();
  const SessionStore = useSessionStore();

  const history = useHistory();

  const [fetchDomain, {
    data: domainData,
    loading: domainLoading,
    error: domainError,
  }] = useNavigateToNewDomainLazyQuery();

  const handleSessionTimeout = (error?: any) => {
    if (window.location.pathname !== ROUTES.ROUTE_LOGIN.URL
      && error?.networkError?.statusCode === 403) {
      SessionStore.setGlobalError('Your session has expired please login again.');
      history.push(ROUTES.ROUTE_LOGIN.URL);
    }
  };

  useEffect(() => {
    handleSessionTimeout(domainError);
  }, [domainError]);

  const performNavUpdate = ({ orgSid }) => {
    fetchDomain({
      variables: {
        domainNavInput: {
          orgSid,
        },
      },
    });
  };

  const parseToStoreObj = (link) => ({
    label: link.label,
    destination: link.page?.type || null,
    orgSid: link.page?.parameters?.find((param) => param.name === 'orgSid')?.idValue || null,
    subNavItems: link.subNavItems?.map(parseToStoreObj),
  });

  useEffect(() => {
    // console.log(domainData);
    if (!domainLoading && domainData) {
      const topNav = domainData
        .navigateToNewDomain
        ?.navItems
        ?.find((itm) => itm.appDomain === CdxWebAppDomain.Dashboard);
      const leftNav = domainData
        .navigateToNewDomain
        ?.navItems
        ?.find((itm) => itm.appDomain === CdxWebAppDomain.MainMenu);
      const orgTrail = domainData
        .navigateToNewDomain
        ?.navItems
        ?.find((itm) => itm.appDomain === CdxWebAppDomain.Organization);

      ActiveDomainStore.setDashboardNav(topNav?.subNavItems?.map(parseToStoreObj));
      ActiveDomainStore.setAdminNav(leftNav?.subNavItems?.map(parseToStoreObj));

      const orgSubNavItems = orgTrail?.subNavItems?.map(parseToStoreObj);
      ActiveDomainStore.setCurrentOrg({
        orgSubNavItems,
        label: orgTrail?.label,
        orgId: orgTrail?.orgId,
        orgSid: orgTrail?.orgSid,
        destination: domainData.navigateToNewDomain?.selectedPage,
      });

      if (onFetchComplete) {
        onFetchComplete();
      }
    }
  }, [domainData, domainLoading]);

  const setCurrentOrg = (orgSid?: string | null) => {
    if (orgSid) {
      performNavUpdate({ orgSid });
    }
  };

  return { performNavUpdate, setCurrentOrg };
};
