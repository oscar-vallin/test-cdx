import { UiBooleanField } from 'src/data/services/graphql';
import React from 'react';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { ErrorIcon } from 'src/components/badges/ErrorIcon';
import { CheckBoxAlignBottom, InlineLabel } from 'src/components/inputs/InputCheck/UIInputCheck.styles';


type UIInputCheckType = {
  id: string;
  uiField?: UiBooleanField | null;
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => void;
  value?: boolean;
  alignBottom?: boolean;
};
export const UIInputCheck = ({id, uiField, onChange, value, alignBottom}: UIInputCheckType) => {

  const renderLabel = () => {
    return (
      <span>
        <InlineLabel required={uiField?.required}>{uiField?.label}</InlineLabel>
        <InfoIcon id={`${id}_Info`} tooltip={uiField?.info} />
        <ErrorIcon id={`${id}-ErrorMsg`} errorMessage={uiField?.errMsg}/>
      </span>
    );
  };

  if (!uiField?.visible) {
    return null;
  }

  return (
      <CheckBoxAlignBottom
        id={id}
        label={uiField?.label}
        onRenderLabel={renderLabel}
        checked={value}
        disabled={uiField?.readOnly || false}
        onChange={onChange}
        alignBottom={alignBottom}
      />
  );
}