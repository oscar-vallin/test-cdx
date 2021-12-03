import { ReactElement, ReactNode } from 'react';
import { StyledText } from './Text.styles';

const defaultProps = {
  id: '',
  variant: 'normal',
  transform: 'none',
  size: 'normal',
  center: '',
  right: false,
  top: '',
  bottom: '',
  breakWord: 'word',
};

type TextProps = {
  id?: string;
  children?: ReactNode | string;
  variant?: string;
  transform?: string;
  size?: string;
  center?: string;
  right?: boolean;
  top?: any;
  bottom?: string;
  breakWord?: string;
  bold?: boolean;
  className?: string;
} & typeof defaultProps;

const Text = ({
  id,
  children,
  variant,
  transform,
  size,
  center,
  right,
  top,
  bottom,
  breakWord,
  ...props
}: TextProps): ReactElement => {
  return (
    <StyledText
      id={id ? `${id}-Text` : undefined}
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

Text.defaultProps = defaultProps;

export { Text };
