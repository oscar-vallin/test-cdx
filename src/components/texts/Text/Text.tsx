import { ReactElement, ReactNode } from 'react';
import { StyledText } from './Text.styles';

const defaultProps = {
  id: '',
  children: <></>,
  variant: 'normal',
  left: '',
  right: false,
  top: '',
  bottom: '',
};

type TextProps = {
  id?: string;
  children?: ReactNode | Element | string;
  variant?: any;
  left?: string;
  right?: boolean;
  top?: string;
  bottom?: string;
} & typeof defaultProps;

const Text = ({ id, children, variant, left, right, top, bottom, ...props }: TextProps): ReactElement => {
  return (
    <StyledText id={`${id}-Text`} variant={variant} left={left} right={right} top={top} bottom={bottom} {...props}>
      {children}
    </StyledText>
  );
};

Text.defaultProps = defaultProps;

export { Text };
