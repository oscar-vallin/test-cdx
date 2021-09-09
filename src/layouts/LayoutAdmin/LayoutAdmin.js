import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { StyledBox, StyledNav } from './LayoutAdmin.styles';
import { LayoutDashboard } from '../LayoutDashboard';
import { getRouteByApiId } from '../../data/constants/RouteConstants';
import { useUserDomain } from '../../contexts/hooks/useUserDomain';
import { Spinner } from '../../components/spinners/Spinner';
import { Spacing } from '../../components/spacings/Spacing';

import { useNotification } from '../../contexts/hooks/useNotification';
import { useOrgSid } from '../../hooks/useOrgSid';

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
  const {
    userDomain: { organization },
    isFetchingOrgNav,
  } = useUserDomain();

  return (
    <LayoutDashboard id={id} menuOptionSelected={menuOptionSelected} showMenu={false}>
      {isFetchingOrgNav ? (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size="lg" label="Loading admin domain" />
        </Spacing>
      ) : (
        <StyledBox>
          <StyledNav
            selectedKey={sidebarOptionSelected}
            groups={[{ links: parseLinks(organization?.navItems || [], sidebarOptionSelected) }]}
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
