import React from 'react';
import { IComboBox, IComboBoxOption } from '@fluentui/react';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { Maybe, UiOptions, UiSelectManyField } from 'src/data/services/graphql';
import { EmptyValue, FieldValue } from '../InputText/InputText.styles';
import { buildComboBoxOptions } from './DropdownCommon';
import { ThemedComboBox } from './InputDropdown.styles';

type UIInputMultiSelectType = {
  id: string;
  uiField?: UiSelectManyField | null;
  options?: Maybe<Array<Maybe<UiOptions>>>;
  value?: string[];
  onChange?: (newValue?: string[]) => void | null;
  placeholder?: string;
};

export const UIInputMultiSelect = ({ id, uiField, options, value, onChange, placeholder }: UIInputMultiSelectType) => {
  const onRenderLabel = () => <UIFormLabel id={`${id}_lbl`} uiField={uiField} />;

  const renderReadOnlyValues = () => {
    if (uiField?.value?.length && uiField?.value?.length > 0) {
      return uiField?.value.map((v) => v?.name).join(', ');
    }
    return <EmptyValue>&lt;empty&gt;</EmptyValue>;
  };

  const handleChange = (e: React.FormEvent<IComboBox>, newValue?: IComboBoxOption) => {
    if (newValue) {
      const clone = Object.assign([], value ?? []);
      const idx = clone.indexOf(newValue.key.toString());
      const exists = idx > -1;
      if (exists && !newValue.selected) {
        // remove it
        clone.splice(idx, 1);
      }
      if (!exists && newValue.selected) {
        // add it
        clone.push(newValue.key.toString());
      }
      if (onChange) {
        onChange(clone);
      }
    }
  };

  if (uiField?.visible === false) {
    return null;
  }

  if (uiField?.readOnly) {
    return (
      <>
        {onRenderLabel()}
        <FieldValue>{renderReadOnlyValues()}</FieldValue>
      </>
    );
  }

  return (
    <ThemedComboBox
      id={id}
      style={{
        width: '100%',
      }}
      label={uiField?.label}
      onRenderLabel={onRenderLabel}
      selectedKey={value}
      onChange={handleChange}
      multiSelect={true}
      allowFreeform={false}
      autoComplete="on"
      placeholder={placeholder}
      options={buildComboBoxOptions(uiField, options)}
    />
  );
};
