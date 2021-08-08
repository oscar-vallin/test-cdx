import React from 'react';
import { StyledBox } from './Container.styles';

const Container = ({ children, ...props }) => {
  return <StyledBox {...props}>{children}</StyledBox>;
};

export { Container };
