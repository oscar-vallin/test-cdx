import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledBox, StyledNav } from './LayoutAdmin.styles';
import { LayoutDashboard } from '../LayoutDashboard';
import { useHistory, useLocation } from 'react-router-dom';
import { getRouteByApiId } from '../../data/constants/RouteConstants';
import { useAuthContext } from '../../contexts/AuthContext';

import { Spinner } from '../../components/spinners/Spinner';
import { Spacing } from '../../components/spacings/Spacing';

import { useNotification } from '../../contexts/hooks/useNotification';

import { useNavigateToNewDomainLazyQuery } from '../../data/services/graphql';
import { useOrgSid } from '../../hooks/useOrgSid';
import { useNavigateToNewDomainQuery } from '../../data/services/graphql';
import { useCurrentUser } from '../../contexts/hooks/useCurrentUser';

const parseLinks = (links = [], sidebarOpt) => {
  return links.map(({ appDomain, label, subNavItems, page }) => ({
    name: label,
    ...(subNavItems
      ? {
          isExpanded: subNavItems.find((item) => item.page.type === sidebarOpt),
          links: parseLinks(subNavItems),
        }
      : {}),
    ...(page
      ? {
          url: getRouteByApiId(page?.type)?.URL,
          key: page.type,
          params: page.parameters,
          commands: page.commands,
        }
      : {}),
  }));
};

const LayoutAdmin = ({ id = 'LayoutAdmin', menuOptionSelected = 'admin', sidebarOptionSelected = '', children }) => {
  const { orgSid } = useOrgSid();
  const history = useHistory();
  const { authData, authLogout, isAuthenticated } = useAuthContext();
  const { isCurrentUserLogged } = useCurrentUser();
  const cache = localStorage.getItem('ADMIN_NAV');

  const [domain, setDomain] = useState({});

  const [useNavigateToNewDomainLazy, { data, loading, error }] = useNavigateToNewDomainLazyQuery();
  const location = useLocation();

  useEffect(() => {
    useNavigateToNewDomainLazy({
      variables: {
        domainNavInput: {
          orgSid,
          appDomain: authData?.userType,
          selectedPage: authData?.selectedPage,
        },
      },
    });
  }, [orgSid]);

  const redirect = (page, sidebarOpt) => {
    if (!sidebarOpt) {
      history.replace(getRouteByApiId(page).URL);
    }
  };

  useEffect(() => {
    if (error) {
      authLogout('Session Expired');
      history.push('/');
    }
  }, [error]);

  useEffect(() => {
    if (cache) {
      const domain = JSON.parse(cache);

      setDomain(domain);
      redirect(domain.selectedPage, sidebarOptionSelected);

      return;
    }

    if (data && !loading) {
      const { navigateToNewDomain: domain } = data;

      localStorage.setItem('ADMIN_NAV', JSON.stringify(domain));

      setDomain(domain);
      redirect(domain.selectedPage, sidebarOptionSelected);

      return;
    }
  }, [data, loading, sidebarOptionSelected]);

  return (
    <LayoutDashboard id={id} menuOptionSelected={menuOptionSelected} showMenu={false}>
      {!cache && loading ? (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size="lg" label="Loading admin domain" />
        </Spacing>
      ) : (
        <StyledBox>
          <StyledNav
            selectedKey={sidebarOptionSelected}
            groups={[{ links: parseLinks(domain.navItems, sidebarOptionSelected) }]}
            onLinkClick={(evt, route) => {
              evt.preventDefault();

              if (!route.links) {
                history.push(`${route.url}?orgSid=${orgSid}`);
              }
            }}
          />

          <StyledBox>{children}</StyledBox>
        </StyledBox>
      )}
    </LayoutDashboard>
  );
};

LayoutAdmin.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export { LayoutAdmin };
