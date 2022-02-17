import { Maybe, UiOptions, UiSelectOneField } from 'src/data/services/graphql';
import React from 'react';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react';
import { EmptyValue, FieldValue } from 'src/components/inputs/InputText/InputText.styles';
import { buildComboBoxOptions } from './DropdownCommon';

type UIInputMultiSelectType = {
  id: string;
  uiField?: UiSelectOneField | null;
  options?: Maybe<Array<Maybe<UiOptions>>>;
  value?: string;
  onChange?: (newValue?: string) => void | null;
  placeholder?: string;
};

export const UIInputSelectOne = ({id, uiField, options, value, onChange, placeholder}: UIInputMultiSelectType) => {

  const onRenderLabel = () => (
    <UIFormLabel id={`${id}_lbl`} uiField={uiField}/>
  );

  const renderReadOnlyValues = () => {
    if (uiField?.value) {
      return uiField?.value.name ?? uiField?.value.value
    }
    return <EmptyValue>&lt;empty&gt;</EmptyValue>;
  }

  const handleChange = (e: React.FormEvent<IComboBox>, newValue?: IComboBoxOption) => {
    if (onChange && newValue) {
      onChange(newValue.key.toString());
    }
  }

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
    <ComboBox
      id={id}
      style={{
        width: '100%'
      }}
      label={uiField?.label}
      onRenderLabel={onRenderLabel}
      defaultSelectedKey={value}
      onChange={handleChange}
      multiSelect={false}
      allowFreeform={false}
      autoComplete='on'
      placeholder={placeholder}
      options={buildComboBoxOptions(uiField, options)} />
  );
};
