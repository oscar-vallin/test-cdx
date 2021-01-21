import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../../containers/bars/NavBar';
import { StyleConstants } from '../../data/constants/StyleConstants';
import { BoxStyled } from './LayoutDashboard.styles';

const LayoutDashboard = ({ id = 'LayoutDashboard', menuOptionSelected = 'dashboard', children }) => {
  return (
    <BoxStyled id={`${id}__Box`} direction={StyleConstants.DIRECTION_COLUMN} top>
      <NavBar menuOptionSelected={menuOptionSelected} />

      {children}
    </BoxStyled>
  );
};

LayoutDashboard.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
};

export { LayoutDashboard };
