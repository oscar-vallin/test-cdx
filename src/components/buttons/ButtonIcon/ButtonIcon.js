import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton, StyledFontIcon } from './ButtonIcon.styles';

const ButtonIcon = ({ id = '__ButtonIcon', children, disabled = true, icon, size, onClick, ...props }) => {
  return (
    <StyledButton id={id} disabled={disabled} onClick={onClick} {...props}>
      <StyledFontIcon iconName={icon} size={size} />
    </StyledButton>
  );
};

ButtonIcon.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.string,
};

export { ButtonIcon };
