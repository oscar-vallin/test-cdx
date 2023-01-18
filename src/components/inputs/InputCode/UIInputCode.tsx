import React from 'react';
import { UiStringField } from 'src/data/services/graphql';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { CodeEditor, ReadOnlyWrapper } from './UIInputCode.styles';

export type UIInputCodeType = {
  id: string;
  mode: 'java' | 'xml' | 'javascript' | 'html' | 'sql' | 'xquery' | 'yaml';
  uiField?: UiStringField;
  onChange?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void | null;
  value?: string;
  renderLabel?: boolean;
}

export const UIInputCode = ({
  id, mode, uiField, onChange, value, renderLabel = true,
}: UIInputCodeType) => {
  const onRenderLabel = () => {
    if (renderLabel) {
      return <UIFormLabel id={`${id}_lbl`} uiField={uiField} />;
    }
    return null;
  };

  if (!uiField?.visible) {
    return null;
  }

  const renderField = () => {
    if (uiField?.readOnly === false) {
      return (
        <CodeEditor
          id={id}
          type="text"
          value={value}
          disabled={uiField?.readOnly ?? false}
          autoFocus={false}
          onRenderLabel={onRenderLabel}
          errorMessage={uiField?.errMsg ?? undefined}
          onChange={onChange}
          minLength={uiField?.min ?? undefined}
          maxLength={uiField?.max ?? undefined}
          multiline
          rows={20}
          resizable={false}
        />
      );
    }

    return (
      <>
        {onRenderLabel()}
        <ReadOnlyWrapper id={id}>
          <pre>{value}</pre>
        </ReadOnlyWrapper>
      </>
    );
  };

  return (
    <>
      {renderField()}
    </>
  );
}
