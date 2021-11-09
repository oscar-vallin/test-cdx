import { useState } from 'react';

const useDateValue = (placeholder, initialState) => {
  const [value, setValue] = useState(initialState);

  const onChange = (e) => {
    setValue(e ?? '');
  };

  return { value, setValue, onChange };
};

export { useDateValue };
