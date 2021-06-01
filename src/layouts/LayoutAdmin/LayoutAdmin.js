import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledBox, StyledNav } from './LayoutAdmin.styles';
import { LayoutDashboard } from '../LayoutDashboard';
import { useHistory } from 'react-router-dom';
import { ADMIN_NAV } from '../../data/constants/AdminConstants';
import { useAuthContext } from '../../contexts/AuthContext';

import { Spinner } from '../../components/spinners/Spinner';
import { Spacing } from '../../components/spacings/Spacing';

import { useNavigateToNewDomainQuery } from '../../data/services/graphql';

const parseLinks = (links = [], sidebarOpt) => {
  return links.map(({ label, subNavItems, page }) => ({
    name: label,
    ...(subNavItems) ? {
      isExpanded: subNavItems.find((item) => item.page.type === sidebarOpt),
      links: parseLinks(subNavItems)
    } : {},
    ...(page)
      ? {
        url: ADMIN_NAV[page.type],
        key: page.type,
        params: page.parameters,
        commands: page.commands
      }
      : {}
  }))
}
const LayoutAdmin = ({
  id = 'LayoutAdmin',
  menuOptionSelected = 'admin',
  sidebarOptionSelected = '',
  children
}) => {
  const history = useHistory();
  const { authData } = useAuthContext();
  const [domain, setDomain] = useState({});

  const { data, loading, error } = useNavigateToNewDomainQuery({
    variables: {
      domainNavInput: {
        orgSid: authData.orgId,
        appDomain: authData.userType,
        selectedPage: authData.selectedPage
      }
    },
  });

  useEffect(() => {
    if (data && !loading) {
      setDomain(data.navigateToNewDomain);

      if (!sidebarOptionSelected) {
        history.push(ADMIN_NAV[domain.selectedPage]);
      }
    }
  }, [data, loading, sidebarOptionSelected])


  return (
    <LayoutDashboard id={id} menuOptionSelected={menuOptionSelected}>
      {
        loading
          ? <Spacing margin={{ top: 'double' }}>
              <Spinner size="lg" label="Loading admin domain"/>
            </Spacing>
          : (
            <StyledBox>
              <StyledNav
                selectedKey={sidebarOptionSelected}
                groups={[{ links: parseLinks(domain.navItems, sidebarOptionSelected) }]}
                onLinkClick={(evt, route) => {
                  evt.preventDefault();

                  if (!route.links) {
                    history.push(route.url);
                  }
                }}
              />

              <StyledBox>
                {children}
              </StyledBox>
            </StyledBox>
          )
      }
    </LayoutDashboard>
  );
};

LayoutAdmin.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export { LayoutAdmin };
