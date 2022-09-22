import React from 'react';
import { IDropdownOption } from '@fluentui/react';
import { Maybe, UiOptions, UiSelectOneField } from 'src/data/services/graphql';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { buildDropdownOption } from './DropdownCommon';
import { ThemeDropdown } from './InputDropdown.styles';
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
  const handleChange = (e: React.FormEvent<HTMLDivElement>, newValue?: IDropdownOption) => {
    if (onChange && newValue) {
      onChange(newValue.key.toString());
    }
  };

  const onRenderTitle = (iconOptions): JSX.Element => {
    const option = iconOptions[0];

    return (
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        {option.data && option.data.infoIcon && (
          <InfoIcon id={`${id}-Info`} tooltip={option.data.infoIcon} />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  if (uiField?.visible === false) {
    return null;
  }

  const renderReadOnlyValues = () => {
    if (uiField?.value) {
      return uiField?.value.name ?? uiField?.value.value;
    }
    return <EmptyValue>&lt;empty&gt;</EmptyValue>;
  };

  if (uiField?.readOnly) {
    return <FieldValue>{renderReadOnlyValues()}</FieldValue>
  }

  return (
    <ThemeDropdown
      id={id}
      style={{
        width: '100%',
        borderBottomColor: 'blue',
        outline: 'none',
      }}
      selectedKey={value}
      onRenderTitle={onRenderTitle}
      onChange={handleChange}
      multiSelect={false}
      placeholder={placeholder}
      options={buildDropdownOption(uiField, options)}
    />
  );
};
