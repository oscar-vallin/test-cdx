import { ReactElement } from 'react';
import { Maybe, UiField } from 'src/data/services/graphql';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { ErrorIcon } from 'src/components/badges/ErrorIcon';
import { InheritedFromIcon } from 'src/components/badges/InheritedFromIcon';
import { InheritedByIcon } from 'src/components/badges/InheritedByIcon';
import { LabelRow, Label, Required } from './FormLabel.styles';

const defaultProps = {
  required: false,
};

type FormLabelProps = {
  id?: string;
  label?: string;
  required?: boolean;
  info?: string;
  inheritedFrom?: string;
  inheritedBy?: Maybe<string>[];
  errorMessage?: string;
} & typeof defaultProps;

const FormLabel = ({
  id,
  label,
  required,
  info,
  inheritedFrom,
  inheritedBy,
  errorMessage,
  ...props
}: FormLabelProps): ReactElement => (
  <LabelRow id={id}>
    <Label {...props} id={id ? `${id}-Label` : undefined}>
      {label}
    </Label>
    {required && <Required id={id ? `${id}-Required` : undefined}>&nbsp;*</Required>}
    <InfoIcon id={`${id}-Info`} tooltip={info} />
    <InheritedFromIcon id={`${id}-inheritedFrom`} tooltip={inheritedFrom} />
    <InheritedByIcon id={`${id}-inheritedBy`} tooltip={inheritedBy && inheritedBy[0]} />
    <ErrorIcon id={`${id}-ErrorMsg`} errorMessage={errorMessage} />
  </LabelRow>
);

FormLabel.defaultProps = defaultProps;

type UIFormLabelType = {
  id: string;
  uiField?: UiField | null;
};

const UIFormLabel = ({ id, uiField }: UIFormLabelType) => (
  <FormLabel
    id={`${id}`}
    label={uiField?.label ?? ''}
    required={uiField?.required ?? false}
    info={uiField?.info ?? undefined}
    inheritedFrom={uiField?.inheritedFrom ?? undefined}
    inheritedBy={uiField?.inheritedBy ? uiField.inheritedBy : undefined}
    errorMessage={uiField?.errMsg ?? undefined}
  />
);

export { FormLabel, UIFormLabel };
