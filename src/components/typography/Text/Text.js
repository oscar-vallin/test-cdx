import React from 'react';
import PropTypes from 'prop-types';
import { StyledText } from './Text.styles';

const Text = ({
  id = '__Text',
  children,
  variant = 'normal',
  transform = 'none',
  size = 'normal',
  center,
  right,
  top,
  bottom,
  breakWord = 'word',
  ...props
}) => {
  return (
    <StyledText
      id={`${id}-Text`}
      variant={variant}
      center={center}
      right={right}
      top={top}
      bottom={bottom}
      transform={transform}
      breakWord={breakWord}
      size={size}
      {...props}
    >
      {children}
    </StyledText>
  );
};

Text.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.string,
  transform: PropTypes.string,
};

export { Text };
