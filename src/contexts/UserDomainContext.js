import React, { useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { useNavigateToNewDomainLazyQuery } from '../data/services/graphql';

export const UserDomainContext = React.createContext(() => {});

const INITIAL_STATE = {}

export const UserDomainContextProvider = ({ children }) => {
  const { isAuthenticated, isAuthenticating, authData } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [userDomain, setUserDomain] = useState({ ...INITIAL_STATE });

  const [
    fetchDashNav,
    { data: dashNav, loading: isFetchingDashNav, error: dashNavError }
  ] = useNavigateToNewDomainLazyQuery({
    variables: {
      domainNavInput: { orgSid: authData?.orgId, appDomain: 'DASHBOARD' },
    },
  });

  const [
    fetchOrgNav,
    { data: orgNav, loading: isFetchingOrgNav, error: orgNavError }
  ] = useNavigateToNewDomainLazyQuery({
    variables: {
      domainNavInput: { orgSid: authData?.orgId, appDomain: 'ORGANIZATION' },
    },
  });

  useEffect(() => {
    if (isAuthenticated && !isAuthenticating) {
      fetchDashNav();
      fetchOrgNav();
    }
  }, [isAuthenticated, !isAuthenticating]);

  useEffect(() => {
    if (dashNav && orgNav) {
      const domain = {
        dashboard: dashNav.navigateToNewDomain,
        organization: orgNav.navigateToNewDomain,
      }

      setUserDomain({ ...userDomain, ...domain });
      
      if (authData.userType === 'ORGANIZATION') {
        console.log('redirect');
      }
    }
  }, [dashNav, orgNav]);

  return (
    <UserDomainContext.Provider value={{ userDomain, isFetchingOrgNav, setUserDomain }}>
      {children}
    </UserDomainContext.Provider>
  )
}
