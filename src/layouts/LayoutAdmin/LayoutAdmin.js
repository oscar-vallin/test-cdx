import React from 'react';
import PropTypes from 'prop-types';
import { StyledBox, StyledNav } from './LayoutAdmin.styles';
import { LayoutDashboard } from '../LayoutDashboard';
import { useHistory } from 'react-router-dom';

const LayoutAdmin = ({
  id = 'LayoutAdmin',
  menuOptionSelected = '',
  sidebarOptionSelected = '',
  sidebar = [],
  children
}) => {
  const history = useHistory();

  return (
    <LayoutDashboard id={id} menuOptionSelected={menuOptionSelected}>
      <StyledBox>
        <StyledNav
          onLinkClick={console.log}
          selectedKey={sidebarOptionSelected}
          groups={sidebar}
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
