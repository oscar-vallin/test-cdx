import { ReactElement, ReactNode } from 'react';
import { StyledButton } from './Button.styles';
import { IContextualMenuProps } from '@fluentui/react';

const defaultProps = {
  id: '',
  text: null,
  variant: 'secondary',
  disabled: false,
  onClick: () => null,
  block: false,
};

type ButtonProps = {
  id?: string;
  text?: any;
  children?: ReactNode;
  variant?: string;
  disabled?: boolean;
  onClick?: () => null;
  block?: boolean;
  key?: string;
  selected?: boolean;
  split?: boolean;
  menuProps?: IContextualMenuProps;
} & typeof defaultProps;

const Button = ({ id, text, children, variant, disabled, onClick, block, ...props }: ButtonProps): ReactElement => {
  return (
    <StyledButton id={id} variant={variant} disabled={disabled} onClick={onClick} block={block} {...props}>
      {text || children}
    </StyledButton>
  );
};

Button.defaultProps = defaultProps;

export { Button };
