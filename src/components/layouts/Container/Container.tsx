import { ReactElement, ReactNode } from 'react';
import { StyledBox } from './Container.styles';

const Container = ({ children, ...props }: ContainerProps): ReactElement => {
  return <StyledBox {...props}>{children}</StyledBox>;
};

type ContainerProps = {
  id: string;
  children: ReactNode;
  direction: string;
  left: string;
  right: string;
  top: string;
  bottom: string;
};

export { Container };
