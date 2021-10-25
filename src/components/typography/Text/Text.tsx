import { ReactElement } from 'react';
import { StyledText } from './Text.styles';

const defaultProps = {
  id: '',
  children: '',
  variant: 'normal',
  transform: 'none',
  size: 'normal',
  center: '',
  right: '',
  top: '',
  bottom: '',
  breakWord: 'word',
};

type TextProps = {
  id?: string;
  children?: ReactElement | string;
  variant?: string;
  transform?: string;
  size?: string;
  center?: string;
  right?: string;
  top?: any;
  bottom?: string;
  breakWord?: string;
  bold?: boolean;
} & typeof defaultProps;

const Text = ({
  id,
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
}: TextProps): ReactElement => {
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

Text.defaultProps = defaultProps;

export { Text };
