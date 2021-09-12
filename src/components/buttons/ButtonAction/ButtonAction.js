import PropTypes from 'prop-types';
import { StyledButtonAction } from './ButtonAction.styles';

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

const ButtonAction = ({ id = '__Button', children, icon, disabled = false, onClick, ...props }) => {
  const _icon = { iconName: buttonIcons[icon] };

  return (
    <StyledButtonAction id={id} disabled={disabled} onClick={onClick} iconProps={_icon} {...props}>
      {children}
    </StyledButtonAction>
  );
};

ButtonAction.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.string,
};

export { ButtonAction };
