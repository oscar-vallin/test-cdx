import { ReactElement } from 'react';
import { StyledButton, StyledFontIcon } from './ButtonIcon.styles';

const defaultProps = {
  id: '',
  disabled: true,
  text: '',
  icon: '',
  children: '',
  variant: '',
  block: false,
  onClick: () => null,
};

type ButtonIconProps = {
  id?: string;
  disabled?: boolean;
  icon?: string;
  size?: number;
  children?: any;
  text?: string;
  variant?: string;
  onClick?: () => void;
  block?: boolean;
} & typeof defaultProps;

const ButtonIcon = ({ id, disabled = true, icon, size, onClick, ...props }: ButtonIconProps): ReactElement => {
  return (
    <StyledButton id={id} disabled={disabled} onClick={onClick} {...props}>
      <StyledFontIcon iconName={icon} size={size} />
    </StyledButton>
  );
};

ButtonIcon.defaultProps = defaultProps;

export { ButtonIcon };
