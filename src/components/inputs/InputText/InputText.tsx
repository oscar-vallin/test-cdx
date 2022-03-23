import React, { ReactElement } from 'react';
import FormLabel, { UIFormLabel } from 'src/components/labels/FormLabel';
import { UiField, UiStringField } from 'src/data/services/graphql';
import { EmptyValue, FieldValue, StyledTextField } from './InputText.styles';

export type InputTextProps = {
  id?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void | null;
  autofocus?: boolean;
  errorMessage?: string;
  onKeyDown?: any | null;
  onKeyEnter?: any | null;
  value?: string;
  placeholder?: string;
  renderLabel?: boolean;
  required?: boolean;
  canRevealPassword?: boolean;
  label?: string;
  maxLength?: number;
  minLength?: number;
  info?: string;
  autocomplete?: string
};

const InputText = ({
  id,
  type,
  disabled,
  onChange,
  autofocus,
  errorMessage,
  onKeyDown,
  onKeyEnter,
  value,
  info,
  required,
  renderLabel = true,
  autocomplete,
  ...props
}: InputTextProps): ReactElement => {
  const handleKey = (key) => {
    if (key === 'Enter' && onKeyEnter) return onKeyEnter();

    if (onKeyDown) return onKeyDown(key);

    return null;
  };

  const onRenderLabel = () => {
    if (renderLabel) {
      return <FormLabel id={`${id}_lbl`} required={required} info={info} errorMessage={errorMessage} {...props} />;
    }
    return null;
  };

  return (
    <StyledTextField
      id={id}
      type={type}
      autofocus={autofocus ?? false}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={({ key }) => handleKey(key)}
      value={value ?? ''}
      errorMessage={errorMessage}
      onRenderLabel={onRenderLabel}
      autoComplete={autocomplete}
      {...props}
    />
  );
};

type UIReadOnlyType = {
  id: string;
  uiField?: UiField;
  renderLabel?: boolean;
};

const UIInputTextReadOnly = ({ id, uiField, renderLabel = true }: UIReadOnlyType) => {
  const getValue = () => {
    let text = '';
    if (uiField?.hasOwnProperty('description')) {
      text = uiField['description'];
    } else if (uiField?.hasOwnProperty('value')) {
      text = uiField['value'];
    }
    if (text && text.length > 0) {
      return text;
    }
    return <EmptyValue>&lt;empty&gt;</EmptyValue>;
  };

  return (
    <>
      {renderLabel && <UIFormLabel id={`${id}_lbl`} uiField={uiField} />}
      <FieldValue id={id}>{getValue()}</FieldValue>
    </>
  );
};

type UIInputTextType = {
  id: string;
  uiField?: UiStringField;
  onChange?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void | null;
  value?: string;
  placeholder?: string;
  renderLabel?: boolean;
  autocomplete?: string;
};

const UIInputText = ({ id, uiField, onChange, value, placeholder, renderLabel = true, autocomplete}: UIInputTextType) => {
  if (uiField?.readOnly === true) {
    return <UIInputTextReadOnly id={id} uiField={uiField} renderLabel={renderLabel} />;
  }
  return (
    <InputText
      id={id}
      type="text"
      value={value}
      disabled={uiField?.readOnly ?? false}
      autofocus={false}
      label={uiField?.label}
      errorMessage={uiField?.errMsg ?? undefined}
      info={uiField?.info ?? undefined}
      required={uiField?.required ?? false}
      renderLabel={renderLabel}
      onChange={onChange}
      placeholder={placeholder}
      minLength={uiField?.min}
      maxLength={uiField?.max}
      autocomplete={autocomplete}
    />
  );
};

export { InputText, UIInputText, UIInputTextReadOnly };
