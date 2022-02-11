import React, { useState } from 'react';
import { endOfDay, endOfToday, startOfToday } from 'date-fns';

export type DateState = {
  value: Date;
  setValue: React.Dispatch<any>;
  onChange: (d: Date | null | undefined) => void;
};

const useDateValue = (placeholder: string, initialState: Date): DateState => {
  const [value, setValue] = useState<Date>(initialState);

  const onChange = (d) => {
    setValue(d ?? startOfToday());
  };

  return { value, setValue, onChange };
};

const useEndDateValue = (placeholder: string, initialState: Date): DateState => {
  const [value, setValue] = useState<Date>(initialState);

  const onChange = (d) => {
    if (d) {
      setValue(endOfDay(d));
    } else {
      setValue(endOfToday())
    }
  };

  return { value, setValue, onChange };
};

export { useDateValue, useEndDateValue };
