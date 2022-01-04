import { FontIcon } from '@fluentui/react/lib-commonjs/Icon';
import { TooltipHost } from '@fluentui/react/lib-commonjs/Tooltip';
import { ReactElement } from 'react';
import { LabelTooltip, Label, Required } from './FormLabel.styles';
import { UiField } from '../../../data/services/graphql';

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
    <LabelTooltip id={id}>
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
          &nbsp; <FontIcon id={id ? `${id}-Error-Icon` : undefined} iconName="Warning" />
        </TooltipHost>
      )}
    </LabelTooltip>
  );
};

FormLabel.defaultProps = defaultProps;

type UIFormLabelType = {
  uiField?: UiField;
};

const UIFormLabel = ({ uiField }: UIFormLabelType) => {
  return (
    <FormLabel
      label={uiField?.label ?? ''}
      required={uiField?.required ?? false}
      info={uiField?.info ?? undefined}
      errorMessage={uiField?.errMsg ?? undefined}
    />
  );
};

export { FormLabel, UIFormLabel };
export default FormLabel;
