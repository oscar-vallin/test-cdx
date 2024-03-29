import React from 'react';
import { IComboBox, IComboBoxOption } from '@fluentui/react';
import { Maybe, UiOptions, UiSelectOneField } from 'src/data/services/graphql';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { EmptyValue, FieldValue } from 'src/components/inputs/InputText/InputText.styles';
import { buildComboBoxOptions } from './DropdownCommon';
import { ThemedComboBox } from './InputDropdown.styles';

type UIInputMultiSelectType = {
  id: string;
  uiField?: UiSelectOneField | null;
  options?: Maybe<Array<Maybe<UiOptions>>>;
  value?: string;
  onChange?: (newValue?: string) => void | null;
  placeholder?: string;
};

export const UIInputSelectOne = ({
  id, uiField, options, value, onChange, placeholder,
}: UIInputMultiSelectType) => {
  const onRenderLabel = () => <UIFormLabel id={`${id}_lbl`} uiField={uiField} />;

  const renderReadOnlyValues = () => {
    if (uiField?.value) {
      return uiField?.value.label ?? uiField?.value.value;
    }
    return <EmptyValue>&lt;empty&gt;</EmptyValue>;
  };

  const handleChange = (e: React.FormEvent<IComboBox>, newValue?: IComboBoxOption) => {
    if (onChange && newValue) {
      onChange(newValue.key.toString());
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

  const comboBoxOptions = buildComboBoxOptions(uiField, options);

  // If there is only one option, pre select that option
  if (!value && comboBoxOptions.length === 1) {
    value = comboBoxOptions[0]?.key?.toString() ?? undefined;
    if (value && onChange) {
      onChange(value);
    }
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
      multiSelect={false}
      allowFreeform={false}
      autoComplete="on"
      placeholder={placeholder}
      options={buildComboBoxOptions(uiField, options)}
    />
  );
};
