import { useState } from 'react';

const useInputValue = (label, placeholder, initialValue, type) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e?.target?.value ?? '');
  };

  return { label, placeholder, type, value, onChange, setValue };
};

export { useInputValue };
