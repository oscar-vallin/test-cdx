import React from 'react';
import ReactQuill from 'react-quill';
import { TextField } from '@fluentui/react';
import { UiStringField } from 'src/data/services/graphql';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { EmptyValue } from 'src/components/inputs/InputText/InputText.styles';
import { QuillWrapper, ReadOnlyTextArea } from './UIInputTextArea.styles';

type UIInputTextAreaType = {
  id: string;
  uiField?: UiStringField;
  onChange?: (
    e?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string,
  ) => void | null;
  value?: string;
  placeholder?: string;
  renderLabel?: boolean;
  autocomplete?: string;
  type?: string;
  resizable?: boolean;
  rows?: number;
  multiline?: boolean;
  showRichTextEditor?: boolean;
};

const UIInputTextArea = ({
  id,
  uiField,
  onChange,
  value,
  placeholder,
  type,
  resizable = true,
  renderLabel = true,
  rows,
  multiline,
  showRichTextEditor = false,
}: UIInputTextAreaType) => {
  const onRenderLabel = () => {
    if (renderLabel) {
      return <UIFormLabel id={`${id}_lbl`} uiField={uiField} />;
    }
    return null;
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'script',
    'align',
    'list',
    'bullet',
    'indent',
    'link',
  ];

  if (uiField?.visible !== true) {
    return null;
  }

  if (uiField?.readOnly) {
    if (!value || value.trim().length === 0) {
      return (
        <>
          {onRenderLabel()}
          <EmptyValue id={id}>&lt;empty&gt;</EmptyValue>
        </>
      );
    }
    if (showRichTextEditor) {
      return (
        <>
          {onRenderLabel()}
          <ReadOnlyTextArea id={id} dangerouslySetInnerHTML={{ __html: value }} />
        </>
      );
    }
    return (
      <>
        {onRenderLabel()}
        <ReadOnlyTextArea id={id}>{value}</ReadOnlyTextArea>
      </>
    );
  }

  if (showRichTextEditor) {
    return (
      <>
        {onRenderLabel()}
        <QuillWrapper>
          <ReactQuill
            id={id}
            style={{ height: '256px', width: '100%' }}
            modules={modules}
            formats={formats}
            value={value}
            onChange={(v) => {
              if (onChange) onChange(undefined, v);
            }}
          />
        </QuillWrapper>
      </>
    );
  }

  return (
    <TextField
      id={id}
      type={type ?? 'text'}
      value={value}
      rows={rows}
      label={uiField?.label}
      errorMessage={uiField?.errMsg ?? undefined}
      required={uiField?.required ?? false}
      onChange={onChange}
      onRenderLabel={onRenderLabel}
      placeholder={placeholder}
      minLength={uiField?.min ?? undefined}
      maxLength={uiField?.max ?? undefined}
      resizable={resizable ?? true}
      multiline={multiline ?? true}
      styles={{ root: { width: '100%' } }}
    />
  );
};

export { UIInputTextArea };
