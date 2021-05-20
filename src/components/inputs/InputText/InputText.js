import React from 'react';
import PropTypes from 'prop-types';
import { StyledTextField } from './InputText.styles';

const InputText = ({
  id = 'InputText',
  type = 'text',
  disabled = false,
  onChange,
  autofocus = true,
  errorMessage,
  onKeyDown,
  onKeyEnter,
  value,
  ...props
}) => {
  const handleKey = (key) => {
    if (key === 'Enter') return onKeyEnter();

    if (onKeyDown) return onKeyDown(key);
  };

  return (
    <StyledTextField
      id={id}
      type={type}
      autoFocus={autofocus}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={({ key }) => handleKey(key)}
      value={value}
      errorMessage={errorMessage}
      {...props}
    />
  );
};

InputText.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
};

export { InputText };
