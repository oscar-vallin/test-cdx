import React, { ReactElement } from 'react';
import FormLabel, { UIFormLabel } from 'src/components/labels/FormLabel';
import { UiStringField } from 'src/data/services/graphql';
import { FieldValue, StyledTextField } from './InputText.styles';
import { Row } from '../../layouts';

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

  const onRenderLabel = () => <FormLabel required={required} info={info} {...props} />;

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
      onRenderLabel={info ? onRenderLabel : undefined}
      {...props}
    />
  );
};

type UIInputTextType = {
  uiStringField?: UiStringField;
  onChange?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void | null;
  value?: string;
};

const UIInputTextReadOnly = ({ uiStringField }: UIInputTextType) => {
  return (
    <>
      <Row>
        <UIFormLabel uiField={uiStringField} />
      </Row>
      <Row>
        <FieldValue>{uiStringField?.value}</FieldValue>
      </Row>
    </>
  );
};

const UIInputText = ({ uiStringField, onChange, value }: UIInputTextType) => {
  if (uiStringField?.readOnly == true) {
    return <UIInputTextReadOnly uiStringField={uiStringField} />;
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
