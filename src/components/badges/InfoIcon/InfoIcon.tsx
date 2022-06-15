import { TooltipHost } from '@fluentui/react';
import { BlueInfo } from 'src/components/badges/InfoIcon/InfoIcon.styles';

type InfoIconType = {
  id: string;
  tooltip?: string | null;
};

export const InfoIcon = ({ id, tooltip }: InfoIconType) => {

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
        <BlueInfo aria-describedby={id} iconName="Info" style={{ cursor: 'pointer' }} />
      </TooltipHost>
    );
  }

  return null;
};
