import React from 'react';
import { IComboBox, IComboBoxOption } from '@fluentui/react';
import { Maybe, UiOptions, UiSelectOneField } from 'src/data/services/graphql';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { buildComboBoxOptions } from './DropdownCommon';
import { ThemedFlatComboBox } from './InputDropdown.styles';
import { EmptyValue, FieldValue } from '../InputText/InputText.styles';

type UIInputMultiSelectType = {
    id: string;
    uiField?: UiSelectOneField | null;
    options?: Maybe<Array<Maybe<UiOptions>>>;
    value?: string;
    onChange?: (newValue?: string) => void | null;
    placeholder?: string;
  };

export const UIFlatSelectOneField = ({
  id, uiField, options, value, onChange, placeholder,
}: UIInputMultiSelectType) => {
  const onRenderLabel = () => <UIFormLabel id={`${id}_lbl`} uiField={uiField} />;
  const handleChange = (e: React.FormEvent<IComboBox>, newValue?: IComboBoxOption) => {
    if (onChange && newValue) {
      onChange(newValue.key.toString());
    }
  };

  const renderReadOnlyValues = () => {
    if (uiField?.value) {
      return uiField?.value.name ?? uiField?.value.value;
    }
    return <EmptyValue>&lt;empty&gt;</EmptyValue>;
  };

  if (uiField?.readOnly) {
    return (
      <>
        {onRenderLabel()}
        <FieldValue>{renderReadOnlyValues()}</FieldValue>
      </>
    );
  }

  return (
    <ThemedFlatComboBox
      id={id}
      style={{
        width: '100%',
        margin: '0 10px',
      }}
      selectedKey={value}
      onRenderLabel={onRenderLabel}
      onChange={handleChange}
      multiSelect={false}
      allowFreeform={false}
      autoComplete="on"
      placeholder={placeholder}
      options={buildComboBoxOptions(uiField, options)}
    />
  );
};
