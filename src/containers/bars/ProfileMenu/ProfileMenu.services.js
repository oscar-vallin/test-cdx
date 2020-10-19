import React from "react";

// useEmailField
export const useMenu = () => {
  const option = React.useState(0);

  const selectOption = (option) => {
    setIsProcessing(true);

    setIsProcessing(false);
  };

  return { option, selectOption };
};
