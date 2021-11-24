import { useState } from 'react';

// useEmailField
export const useMainMenu = (defaultOption) => {
  const [selectedOption, setOption] = useState(defaultOption);

  return { selectedOption, setOption };
};
