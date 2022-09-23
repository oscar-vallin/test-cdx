import React from 'react';
import { IDropdownOption } from '@fluentui/react';
import { Maybe, UiOptions, UiSelectOneField } from 'src/data/services/graphql';
import { buildDropdownTimeOption } from './DropdownCommon';
import { ThemeDropdown } from './InputDropdown.styles';
import { TIME } from './TimeValues';
import { EmptyValue, FieldValue } from '../InputText/InputText.styles';

type UIInputMultiSelectType = {
    id: string;
    uiFieldHour?: UiSelectOneField | null;
    uiFieldMinute?: UiSelectOneField | null;
    value?: string;
    placeholder?: string;
    options?: Maybe<Array<Maybe<UiOptions>>>;
    onChange?: (newValue?: string) => void | null;
  };

export const UITimeSelectOneField = ({
  id, value, uiFieldHour, uiFieldMinute, placeholder, onChange,
}: UIInputMultiSelectType) => {
  const handleChange = (e: React.FormEvent<HTMLDivElement>, newValue?: IDropdownOption) => {
    if (onChange && newValue) {
      onChange(newValue.key.toString());
    }
  };

  const renderReadOnlyValues = () => <EmptyValue>&lt;empty&gt;</EmptyValue>;

  if (uiFieldMinute?.visible === false || uiFieldHour?.visible === false) {
    return null;
  }

  if (uiFieldHour?.readOnly || uiFieldMinute?.readOnly) {
    return <FieldValue>{renderReadOnlyValues()}</FieldValue>
  }

  return (
    <ThemeDropdown
      id={id}
      style={{
        width: '100px',
        borderBottomColor: 'blue',
        outline: 'none',
      }}
      selectedKey={value}
      placeholder={placeholder}
      onChange={handleChange}
      multiSelect={false}
      options={buildDropdownTimeOption(TIME)}
    />
  );
};
