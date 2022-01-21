import { Checkbox } from '@fluentui/react';
import { useState } from 'react';
import { CheckboxItem } from 'src/data/Types';
import { UiOption } from 'src/data/services/graphql';
import { OptionRow } from './CheckboxList.styles';

type CheckboxListType = {
  id?: string;
  items: UiOption[];
  value: string[];
  emptyMessage?: String;
  onChange: (selectedValues: string[]) => void;
};

const CheckboxList = ({ id, items, value, emptyMessage = 'No options available', onChange }: CheckboxListType) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(Object.assign([], value));

  const clone = (checkboxItems: UiOption[]): CheckboxItem[] => {
    // console.log("Selected Items")
    // console.log(value)
    const copy: CheckboxItem[] = [];
    checkboxItems.forEach((itm) => {
      copy.push({
        ...itm,
        checked: selectedValues.includes(itm.value),
      });
    });
    return copy;
  };

  const [options, setOptions] = useState<CheckboxItem[]>(clone(items));

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

  if (options.length === 0) {
    return <div id={id}>{emptyMessage}</div>
  }

  // console.log('rendering options')
  // console.log(options);
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
