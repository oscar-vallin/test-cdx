import React from 'react';
import { StyledComponent } from './Button.styles';

const DEFAULT_FUNCTION = () => console.log('Click');

export const Button = ({ children = <></>, id = '', onClick = DEFAULT_FUNCTION }) => {
  return (
    <StyledComponent id={`Button__${id}`} onClick={onClick}>
      {children}
    </StyledComponent>
  );
};
