import { Checkbox } from '@fluentui/react';
import { useState } from 'react';
import { CheckboxItem } from 'src/data/Types';
import { UiOption } from 'src/data/services/graphql';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { ErrorIcon } from 'src/components/badges/ErrorIcon';
import { InlineLabel } from 'src/components/inputs/InputCheck/UIInputCheck.styles';
import { OptionRow } from './CheckboxList.styles';

type CheckboxListType = {
  id?: string;
  items: UiOption[];
  value: string[];
  emptyMessage?: string;
  onChange: (selectedValues: string[]) => void;
  formatTooltip?: boolean;
};

const formatInfoTooltip = (str: string) => {
  let result = '';
  if (str) {
    const regex = /;\s*/g;
    result = str.replace(regex, '\n');
  }
  return result;
};

const CheckboxList = ({
  id,
  items,
  value,
  emptyMessage = 'No options available',
  onChange,
  formatTooltip = false,
}: CheckboxListType) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(Object.assign([], value));

  const clone = (checkboxItems: UiOption[]): CheckboxItem[] => {
    // console.log("Selected Items")
    // console.log(value)
    const copy: CheckboxItem[] = [];
    checkboxItems.forEach((itm) => {
      copy.push({
        ...itm,
        checked: selectedValues.includes(itm.value),
        info: itm.info,
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
    return <div id={id}>{emptyMessage}</div>;
  }

  const renderLabel = (item) => (
    <span>
      <InlineLabel required={item?.required}>{item?.label}</InlineLabel>
      <InfoIcon id={`${id}_Info`} tooltip={formatTooltip ? formatInfoTooltip(item?.info) : item?.info} />
      <ErrorIcon id={`${id}-ErrorMsg`} errorMessage={item?.errMsg} />
    </span>
  );

  return (
    <div id={id}>
      {options.map((item, index) => (
        <OptionRow key={`checkbox_list-${index}`}>
          <Checkbox
            label={item.label}
            onRenderLabel={() => renderLabel(item)}
            checked={item.checked}
            onChange={() => onItemCheck(item.value)}
          />
        </OptionRow>
      ))}
    </div>
  );
};

export { CheckboxList, formatInfoTooltip };
