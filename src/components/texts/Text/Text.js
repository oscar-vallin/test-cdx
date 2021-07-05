import React from 'react';
import PropTypes from 'prop-types';
import { StyledText } from './Text.styles';

const Text = ({ id = '__Text', children, variant = 'normal', left, right, top, bottom, ...props }) => {
  return (
    <StyledText id={`${id}-Text`} variant={variant} left={left} right={right} top={top} bottom={bottom} {...props}>
      {children}
    </StyledText>
  );
};

Text.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.string,
};

export { Text };
