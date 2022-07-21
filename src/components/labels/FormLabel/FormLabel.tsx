import { ReactElement } from 'react';
import { UiField } from 'src/data/services/graphql';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { ErrorIcon } from 'src/components/badges/ErrorIcon';
import { InheritIcon } from 'src/components/badges/InheritIcon';
import { LabelRow, Label, Required } from './FormLabel.styles';

const defaultProps = {
  required: false,
};

type FormLabelProps = {
  id?: string;
  label?: string;
  required?: boolean;
  info?: string;
  inherit?: string;
  errorMessage?: string;
} & typeof defaultProps;

const FormLabel = ({ id, label, required, info, inherit, errorMessage, ...props }: FormLabelProps): ReactElement => {
  return (
    <LabelRow id={id}>
      <Label {...props} id={id ? `${id}-Label` : undefined}>
        {label}
      </Label>
      {required && <Required id={id ? `${id}-Required` : undefined}>&nbsp;*</Required>}
      <InfoIcon id={`${id}-Info`} tooltip={info} />
      <InheritIcon id={`${id}-Inherit`} tooltip={inherit} />
      <ErrorIcon id={`${id}-ErrorMsg`} errorMessage={errorMessage} />
    </LabelRow>
  );
};

FormLabel.defaultProps = defaultProps;

type UIFormLabelType = {
  id: string;
  uiField?: UiField | null;
};

const UIFormLabel = ({ id, uiField }: UIFormLabelType) => {
  return (
    <FormLabel
      id={`${id}`}
      label={uiField?.label ?? ''}
      required={uiField?.required ?? false}
      info={uiField?.info ?? undefined}
      inherit={uiField?.inheritedFrom ?? undefined}
      errorMessage={uiField?.errMsg ?? undefined}
    />
  );
};

export { FormLabel, UIFormLabel };
