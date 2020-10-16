/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from './InputText.styles';

export const InputText = ({ placeholder = '', field }) => {
  return <Input placeholder={placeholder} {...field} />;
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
