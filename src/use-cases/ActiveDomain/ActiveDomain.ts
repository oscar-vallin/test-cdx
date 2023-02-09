/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { CdxWebAppDomain, useNavigateToNewDomainLazyQuery } from 'src/data/services/graphql';
import { ROUTES } from 'src/data/constants/RouteConstants';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { ErrorHandler } from 'src/utils/ErrorHandler';

export const useActiveDomainUseCase = (onFetchComplete?: () => void) => {
  const ActiveDomainStore = useActiveDomainStore();
  const [navigateOnChange, setNavigateOnChange] = useState(true);
  const handleError = ErrorHandler();

  const [fetchDomain, {
    data: domainData,
    loading: domainLoading,
    error: domainError,
  }] = useNavigateToNewDomainLazyQuery();

  const handleSessionTimeout = (error?: any) => {
    if (window.location.pathname !== ROUTES.ROUTE_LOGIN.URL) {
      handleError(error);
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
        subNavItems: orgSubNavItems,
        label: orgTrail?.label,
        orgId: orgTrail?.orgId,
        orgSid: orgTrail?.orgSid,
        destination: navigateOnChange ? domainData.navigateToNewDomain?.selectedPage : null,
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

  /**
   * Update the left and top menus without navigating to the user's home page
   * @param orgSid
   */
  const updateCurrentOrgNav = (orgSid?: string | null) => {
    if (orgSid) {
      setNavigateOnChange(false);
      performNavUpdate({ orgSid })
    }
  };

  return { performNavUpdate, setCurrentOrg, updateCurrentOrgNav };
};
