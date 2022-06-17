/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigateToNewDomainLazyQuery, useCurrentOrgNavLazyQuery } from 'src/data/services/graphql';
import { useSessionStore } from 'src/store/SessionStore';

type QueryResult = {
  loading: boolean;
  error?: any;
  data?: any;
};

type ActiveDomainState = {
  nav: {
    dashboard: QueryResult;
    admin: QueryResult;
  };
  currentOrg: QueryResult;
};

const INITIAL_QUERY_RESULT: QueryResult = {
  loading: false,
  data: null,
  error: null,
};

const INITIAL_STATE: ActiveDomainState = {
  nav: {
    dashboard: { ...INITIAL_QUERY_RESULT },
    admin: { ...INITIAL_QUERY_RESULT },
  },
  currentOrg: { ...INITIAL_QUERY_RESULT },
};

export const useActiveDomainUseCase = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const SessionStore = useSessionStore();

  const [fetchDashNav, { data: dashNav, loading: isFetchingDashNav, error: dashNavError }] =
    useNavigateToNewDomainLazyQuery();

  const [fetchOrgNav, { data: orgNav, loading: isFetchingOrgNav, error: orgNavError }] =
    useNavigateToNewDomainLazyQuery();

  const [fetchCurrentOrgNav, { data: currentOrgNav, loading: isFetchingCurrentOrgNav, error: currentOrgNavError }] =
    useCurrentOrgNavLazyQuery();

  const performNavUpdate = ({ orgSid, domain }) => {
    if (SessionStore.status.isAuthenticated) {
      const params = { domainNavInput: { orgSid, appDomain: domain } };

      switch (domain) {
        case 'ORGANIZATION':
          fetchOrgNav({ variables: params });
          break;
        case 'DASHBOARD':
          fetchDashNav({ variables: params });
          break;
        default:
          break;
      }
    }
  };

  const performCurrentOrgUpdate = ({ orgSid }) => {
    if (SessionStore.status.isAuthenticated) {
      fetchCurrentOrgNav({
        variables: {
          orgInput: { orgSid },
        },
      });
    }
  };

  const updateNavState = (domain, value) => {
    setState({
      ...state,
      nav: {
        ...state.nav,
        [domain]: value,
      },
    });
  };

  useEffect(() => {
    updateNavState('dashboard', {
      data: dashNav,
      loading: isFetchingDashNav,
      error: dashNavError,
    });
  }, [dashNav, isFetchingDashNav, dashNavError]);

  useEffect(() => {
    updateNavState('admin', {
      data: orgNav,
      loading: isFetchingOrgNav,
      error: orgNavError,
    });
  }, [orgNav, isFetchingOrgNav, orgNavError]);

  useEffect(() => {
    setState({
      ...state,
      currentOrg: {
        data: currentOrgNav,
        loading: isFetchingCurrentOrgNav,
        error: currentOrgNavError,
      },
    });
  }, [currentOrgNav, isFetchingCurrentOrgNav, currentOrgNavError]);

  return { performNavUpdate, performCurrentOrgUpdate, activeDomainState: state };
};
