import { useState } from 'react';

export type CheckType = {
  id?: string;
  label: string;
  onChange: any;
  checked: boolean;
};

const useCheckValue = (label, initialValue: boolean): CheckType => {
  const [value, setValue] = useState<boolean>(initialValue ?? false);
  const onChange = () => {
    setValue(!value);
  };

  return { label, onChange, checked: value };
};

export { useCheckValue };
export default useCheckValue;
