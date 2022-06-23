import { useEffect, useState } from 'react';
import * as React from 'react';

export type DelayedInput = {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  setValue: React.Dispatch<any>;
  delayedValue: string;
  onChange: (e?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
};

const useFormInputValue = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e?.target?.value ?? '');
  };

  return { value, onChange, setValue };
};

const useInputValue = (label, placeholder, initialValue, type) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e?.target?.value ?? '');
  };

  return { label, placeholder, type, value, onChange, setValue };
};

const useDelayedInputValue = (label, placeholder, initialValue, type): DelayedInput => {
  const [delayedValue, setDelayedValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDelayedValue(value?.trim());
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [value]);

  const onChange = (e?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setValue(newValue ?? '');
  };

  return { label, placeholder, type, value, onChange, setValue, delayedValue };
};

const useDelayedDropdownValue = (label, placeholder, initialValue, type): DelayedInput => {
  const [delayedValue, setDelayedValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDelayedValue(value);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [value]);

  const onChange = (e?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, o?) => {
    if (o.key === 'All') setValue('');
    else setValue(o.key ?? '');
  };

  return { label, placeholder, type, value, onChange, setValue, delayedValue };
};

export { useInputValue, useDelayedInputValue, useFormInputValue, useDelayedDropdownValue };
