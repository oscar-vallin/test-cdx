import { ReactNode } from 'react';
import { StyledButtonAction } from './ButtonAction.styles';

type ButtonActionProps = {
  id?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  icon?: string;
};

const buttonIcons = {
  edit: 'Edit',
  sort: 'Sort',
  eye: 'RedEye',
  chromeBack: 'ChromeBack',
  chromeNext: 'ChromeBackMirrored',
  up: 'Up',
  down: 'Down',
  today: 'GotoToday',
  asc: 'SortUp',
  desc: 'SortDown',
};

const ButtonAction = ({ id = '', children, icon = '', disabled = false, onClick, ...props }: ButtonActionProps) => {
  const _icon = { iconName: buttonIcons[icon] };

  return (
    <StyledButtonAction id={id} disabled={disabled} onClick={onClick} iconProps={_icon} {...props}>
      {children}
    </StyledButtonAction>
  );
};

export { ButtonAction };
