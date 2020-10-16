import React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./Button.styles";

const Button = ({ id = "__Button", children, primary = true, disabled = false, onClick, ...props }) => {
  return (
    <StyledButton id={id} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export { Button };
