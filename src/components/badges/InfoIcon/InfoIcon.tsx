import { FontIcon, TooltipHost } from '@fluentui/react';

type InfoIconType = {
  id: string;
  tooltip?: string | null;
  leftPad?: boolean;
};

export const InfoIcon = ({ id, tooltip, leftPad = true }: InfoIconType) => {
  const charPad = (): string => {
    if (leftPad) {
      return '\xa0';
    }
    return '';
  };

  if (tooltip) {
    return (
      <TooltipHost
        style={{ whiteSpace: 'pre-wrap' }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMouseLeave={() => {}}
        content={tooltip}
        id={id}
        calloutProps={{ gapSpace: 0 }}
      >
        {charPad()}
        <FontIcon aria-describedby={id} iconName="Info" style={{ cursor: "pointer" }}/>
      </TooltipHost>
    );
  }

  return null;
};
