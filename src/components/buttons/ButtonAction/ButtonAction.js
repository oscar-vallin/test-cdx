import React from "react";
import PropTypes from "prop-types";
import { StyledButtonAction } from "./ButtonAction.styles";

const buttonIcons = {
  edit: "Edit",
};

const ButtonAction = ({ id = "__Button", children, icon, primary = true, disabled = false, onClick, ...props }) => {
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
