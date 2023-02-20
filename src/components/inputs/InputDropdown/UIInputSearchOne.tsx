import React, { useEffect, useState } from 'react';
import { IComboBox, IComboBoxOption } from '@fluentui/react';
import { UiOption, UiSelectOneField } from 'src/data/services/graphql';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { EmptyValue, FieldValue } from 'src/components/inputs/InputText/InputText.styles';
import { ThemedComboBox } from './InputDropdown.styles';

type UIInputSearchOneType = {
  id: string;
  uiField?: UiSelectOneField | null;
  options?: Array<UiOption> | null;
  value?: UiOption;
  onType?: (newValue?: string) => void | null;
  onSelectValue?: (newValue?: UiOption) => void | null;
  placeholder?: string;
  emptyText?: string;
};

export const UIInputSearchOne = ({
  id, uiField, options, value, onType, onSelectValue, placeholder, emptyText,
}: UIInputSearchOneType) => {
  const [valueText, setValueText] = useState(value?.label);
  const [searchText, setSearchText] = useState('');

  const typeAndSearch = (newValue: string) => {
    setSearchText(newValue);
  };

  useEffect(() => {
    let timer;
    if (onType && searchText) {
      timer = setTimeout(() => onType(searchText), 300);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }, [searchText]);

  const onRenderLabel = () => <UIFormLabel id={`${id}_lbl`} uiField={uiField} />;

  const renderReadOnlyValues = () => {
    if (uiField?.value) {
      return uiField?.value.label ?? uiField?.value.value;
    }
    return <EmptyValue>&lt;empty&gt;</EmptyValue>;
  };

  const handleChange = (e: React.FormEvent<IComboBox>, newValue?: IComboBoxOption) => {
    if (onSelectValue) {
      if (newValue && newValue.key?.toString?.length > 0) {
        onSelectValue({
          label: newValue.text,
          value: newValue.key as string,
        });
        setValueText(newValue.text);
      } else {
        onSelectValue(undefined);
        setValueText('');
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

  const emptyOption: IComboBoxOption = {
    key: '',
    text: emptyText ?? '<No Options available>',
    disabled: true,
  };

  const emptySearchOption: IComboBoxOption = {
    key: '',
    text: 'Clear value',
  };

  const buildComboBoxOptions = (): IComboBoxOption[] => {
    if (!searchText) {
      return [emptySearchOption];
    }
    if (uiField && options?.length) {
      return options.map((_value): IComboBoxOption => ({
        key: _value?.value ?? '',
        text: _value?.label ?? '',
      }));
    }
    return [emptyOption];
  };

  return (
    <ThemedComboBox
      id={id}
      style={{
        width: '100%',
      }}
      label={uiField?.label}
      text={valueText}
      onRenderLabel={onRenderLabel}
      onInputValueChange={typeAndSearch}
      onChange={handleChange}
      multiSelect={false}
      allowFreeInput={true}
      allowFreeform={false}
      autoComplete="on"
      placeholder={placeholder}
      options={buildComboBoxOptions()}
    />
  );
};
