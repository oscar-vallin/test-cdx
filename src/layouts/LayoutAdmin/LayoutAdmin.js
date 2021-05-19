import React from 'react';
import PropTypes from 'prop-types';
import { StyledBox, StyledNav } from './LayoutAdmin.styles';
import { LayoutDashboard } from '../LayoutDashboard';
import { useHistory } from 'react-router-dom';
import { ADMIN_NAV } from '../../data/constants/AdminConstants';
import { useAuthContext } from "../../contexts/AuthContext";

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
  menuOptionSelected = '',
  sidebarOptionSelected = '',
  sidebar = [],
  children
}) => {
  const history = useHistory();
  const { token } = useAuthContext();
  const nav = JSON.parse(token.AUTH_DATA);

  return (
    <LayoutDashboard id={id} menuOptionSelected={menuOptionSelected}>
      <StyledBox>
        <StyledNav
          selectedKey={sidebarOptionSelected}
          groups={[{ links: parseLinks(nav.navItems, sidebarOptionSelected) }]}
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
    </LayoutDashboard>
  );
};

LayoutAdmin.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.array.isRequired,
};

export { LayoutAdmin };
