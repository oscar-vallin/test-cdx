import { Checkbox } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { CheckboxItem } from 'src/data/Types';
import { OptionRow } from './CheckboxList.styles';
import { UiOption } from 'src/data/services/graphql';

type CheckboxListType = {
  id?: string;
  items: UiOption[];
  value: string[];
  onChange: (selectedValues: string[]) => void;
};

const CheckboxList = ({ id, items, value, onChange }: CheckboxListType) => {
  const clone = (checkboxItems: UiOption[]): CheckboxItem[] => {
    const copy: CheckboxItem[] = [];
    checkboxItems.forEach((itm) => {
      copy.push({
        ...itm,
        checked: selectedValues.includes(itm.value),
      });
    });
    return copy;
  };

  const [selectedValues, setSelectedValues] = useState<string[]>(Object.assign([], value));
  const [options, setOptions] = useState<CheckboxItem[]>(clone(items));

  useEffect(() => {
    // setSelectedValues(Object.assign([], value));
  }, [value]);

  useEffect(() => {
    // setOptions(clone(items));
  }, [items]);

  const onItemCheck = (sid: string) => {
    const idx = selectedValues.indexOf(sid);
    const checked = idx > -1;
    if (checked) {
      // remove it
      selectedValues.splice(idx, 1);
    } else {
      // add it
      selectedValues.push(sid);
    }
    const newOptions = clone(options);
    // const option = newOptions.find((opt) => opt.value == sid);
    // if (option) {
    //   option.checked = !checked;
    // }
    setSelectedValues(selectedValues);
    setOptions(newOptions);
    onChange(selectedValues);
  };

  return (
    <div id={id}>
      {options.map((item, index) => {
        return (
          <OptionRow key={`checkbox_list-${index}`}>
            <Checkbox label={item.label} checked={item.checked} onChange={() => onItemCheck(item.value)} />
          </OptionRow>
        );
      })}
    </div>
  );
};

export { CheckboxList };
