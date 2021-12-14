import { FontIcon } from '@fluentui/react/lib-commonjs/Icon';
import { TooltipHost } from '@fluentui/react/lib-commonjs/Tooltip';
import { ReactElement } from 'react';
import { LabelTooltip, Label, Required } from './FormLabel.styles';

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
  iconName?: string;
  arial?: string;
} & typeof defaultProps;

const FormLabel = ({ id, label, required, info, iconName, arial }: FormLabelProps): ReactElement => {
  return (
    <LabelTooltip id={id}>
      <Label id={id ? `${id}-Label` : undefined}>{label}</Label>
      {required && <Required id={id ? `${id}-Required` : undefined}>&nbsp;*</Required>}
      {info && (
        <TooltipHost id={id ? `${id}-TooltipHost` : undefined} content={info}>
          &nbsp;{' '}
          <FontIcon
            id={id ? `${id}-TooltipHost-FontIcon` : undefined}
            aria-describedby={arial ?? 'Tooltip'}
            iconName={iconName ?? 'Error'}
          />
        </TooltipHost>
      )}
    </LabelTooltip>
  );
};

FormLabel.defaultProps = defaultProps;

export { FormLabel };
export default FormLabel;
