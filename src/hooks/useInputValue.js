import { useState } from "react";

export const useInputValue = (placeholder, initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => setValue(e.target.value);

  return { label: placeholder, placeholder, value, onChange };
};
