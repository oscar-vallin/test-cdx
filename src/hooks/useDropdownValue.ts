import { useState } from 'react';
import * as React from 'react';
import { IComboBox, IComboBoxOption } from '@fluentui/react';

export type DropdownInput = {
    value: string;
    setValue: React.Dispatch<any>;
    onChange: (e: React.FormEvent<IComboBox>, option?: IComboBoxOption) => void;
  };
  
const useDropdownValue = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e,o) => {
        if(o.key === 'All')
            setValue('')
        else
            setValue(o.key ?? '');
    };
    return { value, onChange, setValue};
};
  
export { useDropdownValue };