import { ReactElement, ReactNode } from 'react';
import { IContextualMenuProps } from '@fluentui/react';
import { StyledButton } from './Button.styles';

const defaultProps = {
  id: '',
  text: null,
  variant: 'secondary',
  disabled: false,
  block: false,
};

type ButtonProps = {
  id?: string;
  text?: any;
  children?: ReactNode;
  variant?: string;
  disabled?: boolean;
  onClick?: () => void;
  block?: boolean;
  key?: string;
  selected?: boolean;
  split?: boolean;
  menuProps?: IContextualMenuProps;
} & typeof defaultProps;

const Button = ({
  id = '',
  text,
  children,
  variant = 'secondary',
  disabled = false,
  onClick,
  block = false,
  ...props
}: ButtonProps): ReactElement => (
  <StyledButton
    id={id}
    variant={variant}
    disabled={disabled}
    onClick={onClick}
    block={block}
    {...props}
  >
    {text || children}
  </StyledButton>
);

Button.defaultProps = defaultProps;

export { Button };
