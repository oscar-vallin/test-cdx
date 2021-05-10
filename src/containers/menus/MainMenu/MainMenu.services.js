import React from 'react';

// useEmailField
export const useMainMenu = (defaultOption) => {
  const [selectedOption, setOption] = React.useState(defaultOption);

  return { selectedOption, setOption };
};
