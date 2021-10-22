import { useEffect, useState } from 'react';
import * as React from 'react';

const useInputValue = (label, placeholder, initialValue, type) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e?.target?.value ?? '');
  };

  return { label, placeholder, type, value, onChange, setValue };
};

const useDelayedInputValue = (label, placeholder, initialValue, type) => {
  const [delayedValue, setDelayedValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDelayedValue(value);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [value]);

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setValue(newValue ?? '');
  };

  return { label, placeholder, type, value, onChange, setValue, delayedValue };
};

export { useInputValue, useDelayedInputValue };
