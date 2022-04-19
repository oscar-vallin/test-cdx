import React from 'react';
import { UiBooleanField } from 'src/data/services/graphql';
import { Toggle } from '@fluentui/react';
import FormLabel from 'src/components/labels/FormLabel';


type UIInputTextAreaType = {
  id: string;
  uiField?: UiBooleanField;
  onChange?: (e?: React.MouseEvent<HTMLElement>, newValue?: boolean) => void | null;
  value?: boolean;
  renderLabel?: boolean;
  onText?: string;
  offText?: string;
  role?:  "switch" | "checkbox" | "menuitemcheckbox";
};

const UIInputToggle = ({
  id,
  uiField,
  onChange,
  value,
  renderLabel = true,
  onText,
  offText,
  role
}: UIInputTextAreaType) => {

  const onRenderLabel = () => {
    if (renderLabel) {
      return <FormLabel id={`${id}_lbl`} label={uiField?.label} required={uiField?.required} info={uiField?.info ?? ''} errorMessage={uiField?.errMsg ?? ''} />;
    }
    return null;
  };

 
  return (
    <>
        {uiField?.label && (
            onRenderLabel()
        )}
        <Toggle
            id={id}
            disabled={uiField?.readOnly ?? false}
            onText={onText}
            offText={offText}
            onChange={onChange}
            defaultChecked={value ?? false}
            role={role}
        />
    </>
  );
};

export { UIInputToggle };
