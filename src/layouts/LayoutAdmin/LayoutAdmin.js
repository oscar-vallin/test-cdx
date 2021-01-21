import React from 'react';
import PropTypes from 'prop-types';
import { StyledBox, StyledNav } from './LayoutAdmin.styles';
import { LayoutDashboard } from '../LayoutDashboard';

const LayoutAdmin = ({
  id = 'LayoutAdmin',
  menuOptionSelected = '',
  sidebarOptionSelected = '',
  sidebar = [],
  children
}) => {
  return (
    <LayoutDashboard id={id} menuOptionSelected={menuOptionSelected}>
      <StyledBox>
        <StyledNav
          onLinkClick={console.log}
          selectedKey={sidebarOptionSelected}
          groups={sidebar}
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
