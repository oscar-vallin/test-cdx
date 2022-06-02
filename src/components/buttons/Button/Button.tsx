import { ReactElement, ReactNode } from 'react';
import { IContextualMenuProps } from '@fluentui/react';
import { StyledButton } from './Button.styles';

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
};

const Button = ({
  id = '',
  text,
  children,
  variant = 'secondary',
  disabled = false,
  onClick,
  block = false,
  ...props
}: ButtonProps): ReactElement => {
  return (
    <StyledButton id={id} variant={variant} disabled={disabled} onClick={onClick} block={block} {...props}>
      {text || children}
    </StyledButton>
  );
};

export { Button };
