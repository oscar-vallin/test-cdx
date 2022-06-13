import { ReactNode } from 'react';
import { StyledButtonAction } from './ButtonAction.styles';

type ButtonActionProps = {
  id?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  iconName?: string;
  title?: string;
};

const ButtonAction = ({ id, children, iconName, disabled, onClick, title, ...props }: ButtonActionProps) => {
  const _icon = { iconName };

  return (
    <StyledButtonAction
      id={id}
      disabled={disabled}
      onClick={onClick}
      iconProps={_icon}
      title={title}
      ariaLabel={title}
      {...props}
    >
      {children}
    </StyledButtonAction>
  );
};

export { ButtonAction };
