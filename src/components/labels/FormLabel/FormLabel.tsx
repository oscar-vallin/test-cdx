import { FontIcon, TooltipHost } from '@fluentui/react';
import { ReactElement } from 'react';
import { LabelRow, Label, Required, ErrorIcon } from './FormLabel.styles';
import { UiField } from 'src/data/services/graphql';

const defaultProps = {
  required: false,
  iconName: 'Error',
  arial: 'Tooltip',
};

type FormLabelProps = {
  id?: string;
  label?: string;
  required?: boolean;
  info?: string;
  errorMessage?: string;
  arial?: string;
} & typeof defaultProps;

const FormLabel = ({ id, label, required, info, errorMessage, arial, ...props }: FormLabelProps): ReactElement => {
  return (
    <LabelRow id={id}>
      <Label {...props} id={id ? `${id}-Label` : undefined}>
        {label}
      </Label>
      {required && <Required id={id ? `${id}-Required` : undefined}>&nbsp;*</Required>}
      {info && (
        <TooltipHost id={id ? `${id}-Info` : undefined} content={info}>
          &nbsp; <FontIcon id={id ? `${id}-Info-Icon` : undefined} iconName="Info" />
        </TooltipHost>
      )}
      {errorMessage && (
        <TooltipHost id={id ? `${id}-ErrorMsg` : undefined} content={errorMessage}>
          &nbsp; <ErrorIcon id={id ? `${id}-Error-Icon` : undefined} iconName="Warning" />
        </TooltipHost>
      )}
    </LabelRow>
  );
};

FormLabel.defaultProps = defaultProps;

type UIFormLabelType = {
  id: string;
  uiField?: UiField;
};

const UIFormLabel = ({id, uiField }: UIFormLabelType) => {
  return (
    <FormLabel
      id={`${id}`}
      label={uiField?.label ?? ''}
      required={uiField?.required ?? false}
      info={uiField?.info ?? undefined}
      errorMessage={uiField?.errMsg ?? undefined}
    />
  );
};

export { FormLabel, UIFormLabel };
export default FormLabel;
