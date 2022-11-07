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
  variant?: 'normal' | 'semiBold' | 'bold' | 'extraBold' | 'muted' | 'error';
  transform?: string;
  size?: 'small' | 'normal' | 'large' | 'giant';
  center?: string;
  right?: boolean;
  top?: any;
  bottom?: string;
  breakWord?: string;
  title?: string;
  bold?: boolean;
  className?: string;
  ellipsis?: boolean;
  hideForMobile?: boolean;
  showForMobile?: boolean;
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
  title,
  ellipsis,
  hideForMobile = false,
  showForMobile = false,
  ...props
}: TextProps): ReactElement => (
  <StyledText
    id={id ? `${id}-Text` : undefined}
    variant={variant}
    center={center}
    right={right}
    top={top}
    bottom={bottom}
    transform={transform}
    breakWord={breakWord}
    title={title}
    size={size}
    className="Text"
    ellipsis={ellipsis ?? false}
    hideForMobile={hideForMobile}
    showForMobile={showForMobile}
    {...props}
  >
    {children}
  </StyledText>
);

Text.defaultProps = defaultProps;

export { Text };
