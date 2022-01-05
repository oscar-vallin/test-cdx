import React, { ReactElement } from 'react';
import FormLabel, { UIFormLabel } from 'src/components/labels/FormLabel';
import { UiField, UiStringField } from 'src/data/services/graphql';
import { FieldValue, StyledTextField } from './InputText.styles';

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
  required?: boolean;
  canRevealPassword?: boolean;
  label?: string;
  maxLength?: number;
  minLength?: number;
  info?: string;
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
  ...props
}: InputTextProps): ReactElement => {
  const handleKey = (key) => {
    if (key === 'Enter' && onKeyEnter) return onKeyEnter();

    if (onKeyDown) return onKeyDown(key);

    return null;
  };

  const onRenderLabel = () => <FormLabel required={required} info={info} errorMessage={errorMessage} {...props} />;

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
      {...props}
    />
  );
};

type UIReadOnlyType = {
  uiField: UiField;
};

const UIInputTextReadOnly = ({ uiField }: UIReadOnlyType) => {
  const getValue = (): string => {
    if (uiField.hasOwnProperty('description')) {
      return uiField['description'];
    }
    if (uiField.hasOwnProperty('value')) {
      return uiField['value'];
    }
    return '';
  };

  return (
    <>
      <UIFormLabel uiField={uiField} />
      <FieldValue>{getValue()}</FieldValue>
    </>
  );
};

type UIInputTextType = {
  uiStringField?: UiStringField;
  onChange?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void | null;
  value?: string;
};

const UIInputText = ({ uiStringField, onChange, value }: UIInputTextType) => {
  if (uiStringField?.readOnly == true) {
    return <UIInputTextReadOnly uiField={uiStringField} />;
  }
  return (
    <InputText
      type="text"
      value={value}
      disabled={uiStringField?.readOnly ?? false}
      autofocus={false}
      label={uiStringField?.label}
      errorMessage={uiStringField?.errMsg ?? undefined}
      info={uiStringField?.info ?? undefined}
      required={uiStringField?.required ?? false}
      onChange={onChange}
      minLength={uiStringField?.min}
      maxLength={uiStringField?.max}
    />
  );
};

export { InputText, UIInputText, UIInputTextReadOnly };
