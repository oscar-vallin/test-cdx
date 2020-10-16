import React from "react";
import PropTypes from "prop-types";
import { StyledTextField } from "./InputText.styles";

const InputText = ({
  id = "InputText",
  disabled = false,
  onChange,
  autofocus = true,
  errorMessage,
  value,
  ...props
}) => {
  return (
    <StyledTextField
      id={id}
      autoFocus={autofocus}
      disabled={disabled}
      onChange={onChange}
      value={value}
      errorMessage={errorMessage}
      {...props}
    />
  );
};

InputText.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
};

export { InputText };
