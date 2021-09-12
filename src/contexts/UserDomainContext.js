import React, { useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useAuthContext } from './AuthContext';
import { useNavigateToNewDomainLazyQuery, useCurrentOrgNavLazyQuery } from '../data/services/graphql';
import { useOrgSid } from '../hooks/useOrgSid';

export const UserDomainContext = React.createContext(() => {
  return {};
});

const INITIAL_STATE = {};

export const UserDomainContextProvider = ({ children }) => {
  const updateCurrentNav = useStoreActions(({ ActiveOrgStore }) => ActiveOrgStore.updateCurrentNav);
  const { isAuthenticated, isAuthenticating, authData } = useAuthContext();
  const { orgSid } = useOrgSid();
  const [userDomain, setUserDomain] = useState({ ...INITIAL_STATE });

  const [fetchDashNav, { data: dashNav }] = useNavigateToNewDomainLazyQuery();

  const [fetchOrgNav, { data: orgNav, loading: isFetchingOrgNav }] = useNavigateToNewDomainLazyQuery();

  const [fetchCurrentOrgNav, { data: currentOrgNav }] = useCurrentOrgNavLazyQuery();

  useEffect(() => {
    if (isAuthenticated && !isAuthenticating) {
      fetchOrgNav({
        variables: {
          domainNavInput: { orgSid: orgSid || authData?.orgId, appDomain: 'ORGANIZATION' },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, !isAuthenticating]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashNav({
        variables: {
          domainNavInput: { orgSid: orgSid || authData?.orgId, appDomain: 'DASHBOARD' },
        },
      });

      fetchCurrentOrgNav({
        variables: {
          orgInput: { orgSid: orgSid || authData?.orgId },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, orgSid]);

  useEffect(() => {
    if (dashNav && orgNav) {
      const domain = {
        dashboard: dashNav.navigateToNewDomain,
        organization: orgNav.navigateToNewDomain,
      };

      setUserDomain({ ...userDomain, ...domain });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashNav, orgNav]);

  useEffect(() => {
    if (currentOrgNav) {
      updateCurrentNav(currentOrgNav.currentOrgNav);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrgNav]);

  return (
    <UserDomainContext.Provider
      value={{
        userDomain,
        isFetchingOrgNav,
        setUserDomain,
      }}
    >
      {children}
    </UserDomainContext.Provider>
  );
};
