import { ReactElement } from 'react';
import { StyledText } from './Text.styles';

const defaultProps = {
  id: '',
  children: <></>,
  variant: 'normal',
  left: '',
  right: '',
  top: '',
  bottom: '',
};

type TextProps = {
  id?: string;
  children?: ReactElement | string | any;
  variant?: any;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
} & typeof defaultProps;

const Text = ({ id, children, variant = 'normal', left, right, top, bottom, ...props }: TextProps): ReactElement => {
  return (
    <StyledText id={`${id}-Text`} variant={variant} left={left} right={right} top={top} bottom={bottom} {...props}>
      {children}
    </StyledText>
  );
};

Text.defaultProps = defaultProps;

export { Text };
