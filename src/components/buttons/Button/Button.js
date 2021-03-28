import React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./Button.styles";

const Button = ({ id = "__Button", text, children, variant = "secondary", disabled = false, onClick, ...props }) => {
  return (
    <StyledButton id={id} variant={variant} disabled={disabled} onClick={onClick} {...props}>
      {text || children}
    </StyledButton>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export { Button };
