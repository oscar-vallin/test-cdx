import { ReactElement, ReactNode } from 'react';
import { StyledBox } from './Container.styles';

const defaultProps = {
  id: '',
  // children: <></>,
  direction: 'column',
  left: false,
  right: false,
  top: false,
  bottom: '',
};

type ContainerProps = {
  id?: string;
  children?: ReactNode;
  direction?: string;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: string;
} & typeof defaultProps;

const Container = ({ children, ...props }: ContainerProps): ReactElement => {
  return <StyledBox {...props}>{children}</StyledBox>;
};

Container.defaultProps = defaultProps;

export { Container };
