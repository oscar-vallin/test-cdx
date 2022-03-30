import React from 'react';
import { UiStringField  } from 'src/data/services/graphql';
import { TextField } from '@fluentui/react';

type UIInputTextAreaType = {
    id: string;
    uiField?: UiStringField;
    onChange?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void | null;
    value?: string;
    placeholder?: string;
    renderLabel?: boolean;
    autocomplete?: string;
    type?: string;
    resizable?: boolean;
    rows?: number;
    multiline?: boolean;
};

const UIInputTextArea = ({
    id,
    uiField,
    onChange,
    value,
    placeholder,
    type,
    resizable = true,
    rows,
    multiline
  }: UIInputTextAreaType) => {

    return (
      <TextField
        id={id}
        type={type ?? "text"}
        value={value}
        disabled={uiField?.readOnly ?? false}
        rows={rows}
        label={uiField?.label}
        errorMessage={uiField?.errMsg ?? undefined}
        required={uiField?.required ?? false}
        onChange={onChange}
        placeholder={placeholder}
        minLength={uiField?.min ?? undefined}
        maxLength={uiField?.max ?? undefined}
        resizable={resizable ?? true}
        multiline={multiline ?? true}
      />
    );
  };
  
  export { UIInputTextArea };