import React, { useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { useNavigateToNewDomainLazyQuery, useCurrentOrgNavLazyQuery } from '../data/services/graphql';
import { useOrgSid } from '../hooks/useOrgSid';
import { useStoreActions } from 'easy-peasy';

export const UserDomainContext = React.createContext(() => {});

const INITIAL_STATE = {};

export const UserDomainContextProvider = ({ children }) => {
  const updateCurrentNav = useStoreActions(({ ActiveOrgStore }) => ActiveOrgStore.updateCurrentNav);
  const { isAuthenticated, isAuthenticating, authData } = useAuthContext();
  const { orgSid } = useOrgSid();
  const [userDomain, setUserDomain] = useState({ ...INITIAL_STATE });

  const [
    fetchDashNav,
    { data: dashNav, loading: isFetchingDashNav, error: dashNavError },
  ] = useNavigateToNewDomainLazyQuery();

  const [
    fetchOrgNav,
    { data: orgNav, loading: isFetchingOrgNav, error: orgNavError },
  ] = useNavigateToNewDomainLazyQuery();

  const [
    fetchCurrentOrgNav,
    { data: currentOrgNav, loading: isFetchingCurrentOrgNav, error: currentOrgNavError },
  ] = useCurrentOrgNavLazyQuery();

  useEffect(() => {
    if (isAuthenticated && !isAuthenticating) {
      fetchOrgNav({
        variables: {
          domainNavInput: { orgSid: orgSid || authData?.orgId, appDomain: 'ORGANIZATION' },
        },
      });
    }
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
  }, [isAuthenticated, orgSid]);

  useEffect(() => {
    if (dashNav && orgNav) {
      const domain = {
        dashboard: dashNav.navigateToNewDomain,
        organization: orgNav.navigateToNewDomain,
      };

      setUserDomain({ ...userDomain, ...domain });
    }
  }, [dashNav, orgNav]);

  useEffect(() => {
    if (currentOrgNav) {
      updateCurrentNav(currentOrgNav.currentOrgNav);
    }
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
