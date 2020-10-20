import React, { useState } from 'react';
import { useInputValue } from '../../../hooks/useInputValue';

// useEmailField
export const useMainMenu = (defaultOption) => {
  const [selectedOption, setOption] = React.useState(defaultOption);

  return { selectedOption, setOption };
};
