import { ReactElement, ReactNode } from 'react';
import { StyledButton } from './Button.styles';

const defaultProps = {
  id: '',
  // text: '',
  variant: 'secondary',
  // disabled: false,
  onClick: () => null,
  // block: false,
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
} & typeof defaultProps;

const Button = ({
  id,
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
