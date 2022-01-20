import { Maybe, UiOptions, UiSelectManyField } from 'src/data/services/graphql';
import React from 'react';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react';
import { EmptyValue, FieldValue } from '../InputText/InputText.styles';

type UIInputMultiSelectType = {
  id: string;
  uiField?: UiSelectManyField | null;
  options?: Maybe<Array<Maybe<UiOptions>>>;
  value?: string[];
  onChange?: (newValue?: string[]) => void | null;
  placeholder?: string;
};

export const UIInputMultiSelect = ({id, uiField, options, value, onChange, placeholder}: UIInputMultiSelectType) => {

  const onRenderLabel = () => (
    <UIFormLabel id={`${id}_lbl`} uiField={uiField}/>
  );

  const buildComboBoxOptions = (): IComboBoxOption[] => {
    if (uiField && uiField.options && options) {
      // first find the matching UiOption array
      const uiOptions = options.find((value) => value?.key === uiField.options);
      if (uiOptions?.values) {
        return uiOptions.values.map((value): IComboBoxOption => {
          return {
            key: value?.value ?? '',
            text: value?.label ?? '',
          };
        });
      }
    }
    return [ {
      key: '',
      text: '<No Options available>',
      disabled: true
    }];
  }

  const renderReadOnlyValues = () => {
    if (uiField?.value?.length && uiField?.value?.length > 0) {
      return uiField?.value.map((value) => value?.name).join(', ');
    }
    return <EmptyValue>&lt;empty&gt;</EmptyValue>;
  }

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
      selectedKey={value}
      onChange={handleChange}
      multiSelect={true}
      allowFreeform={false}
      autoComplete='on'
      placeholder={placeholder}
      options={buildComboBoxOptions()} />
  );
};
