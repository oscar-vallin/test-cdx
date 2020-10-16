/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from './InputText.styles';

export const InputText = ({ placeholder = '', field }) => {
  return <Input placeholder={placeholder} {...field} />;
};
