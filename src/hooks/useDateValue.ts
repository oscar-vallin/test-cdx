import React, { useState } from 'react';

export type DateState = {
  value: Date;
  setValue: React.Dispatch<any>;
  onChange: (e) => void;
};

const useDateValue = (placeholder: string, initialState: Date): DateState => {
  const [value, setValue] = useState(initialState);

  const onChange = (e) => {
    setValue(e ?? '');
  };

  return { value, setValue, onChange };
};

export { useDateValue };
