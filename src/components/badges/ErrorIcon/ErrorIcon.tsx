import { TooltipHost } from '@fluentui/react';
import { RedWarning } from './ErrorIcon.styes';

type ErrorIconType = {
  id: string;
  errorMessage?: string | null;
  leftPad?: boolean;
};

export const ErrorIcon = ({ id, errorMessage, leftPad = true }: ErrorIconType) => {
  const charPad = (): string => {
    if (leftPad) {
      return '\xa0';
    }
    return '';
  };

  if (errorMessage) {
    return (
      <TooltipHost content={errorMessage} id={id}>
        {charPad()}
        <RedWarning aria-describedby={id} iconName="Warning12" />
      </TooltipHost>
    );
  }

  return null;
};
