import { useState } from 'react';

export const useInputValue = (initialValue, type, placeholder) => {
  const [value, setValue] = useState(initialValue);
  const onChange = e => setValue(e.target.value);

  return { type, value, placeholder, onChange, setValue };
};

export default useInputValue;
