import React from 'react';
import { UiStringField } from 'src/data/services/graphql';
import { TextField } from '@fluentui/react';
import FormLabel, { UIFormLabel } from 'src/components/labels/FormLabel';
import ReactQuill from 'react-quill';


type UIInputTextAreaType = {
  id: string;
  uiField?: UiStringField;
  onChange?: (e?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void | null;
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
  showRichTextEditor= false
}: UIInputTextAreaType) => {

  const onRenderLabel = () => {
    if (renderLabel) {
      return <FormLabel id={`${id}_lbl`} label={uiField?.label} required={uiField?.required} info={uiField?.info ?? ''} errorMessage={uiField?.errMsg ?? ''} />;
    }
    return null;
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{ 'align': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],    
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean'],
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'script',
    'align',
    'list', 'bullet', 'indent',
    'link',
  ]

  return (
    <>
    {showRichTextEditor ? 
      <>
        {onRenderLabel()}
        <ReactQuill 
          modules={modules}
          formats={formats}
          value={value}
          onChange={(value)=>{
            if(onChange) onChange(undefined, value)
          }}
        />
      </>: 
      <TextField
        id={id}
        type={type ?? 'text'}
        value={value}
        disabled={uiField?.readOnly ?? false}
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
      />}
    </>
  );
};

export { UIInputTextArea };
