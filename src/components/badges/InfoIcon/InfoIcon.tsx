import { FontIcon, TooltipHost } from '@fluentui/react';

type InfoIconType = {
  id: string;
  tooltip?: string;
  leftPad?: boolean;
};

export const InfoIcon = ({id, tooltip, leftPad = true}: InfoIconType) => {
  const charPad = (): string => {
    if (leftPad) {
      return '\xa0';
    }
    return '';
  }

  if (tooltip) {
    return (
      <TooltipHost content={tooltip} id={id}>
        {charPad()}
        <FontIcon aria-describedby={id} iconName="Info" />
      </TooltipHost>
    );
  }

  return null;
};
