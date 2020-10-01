import React from 'react';
import { StyledComponent } from './Button.styles';

export const Button = ({ children = <></>, id = '' }) => {
  return <StyledComponent id={`Button__${id}`}>{children}</StyledComponent>;
};
