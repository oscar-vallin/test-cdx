import React from 'react';
import PropTypes from 'prop-types';
import { StyleConstants } from '../../data/constants/StyleConstants';
import { BoxStyled } from './LayoutLogin.styles';

const LayoutLogin = ({ id = 'LayoutLogin', children, direction = StyleConstants.DIRECTION_COLUMN }) => {
  return (
    <BoxStyled id={id} direction={direction}>
      {children}
    </BoxStyled>
  );
};

LayoutLogin.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
};

export { LayoutLogin };
