import { TooltipHost } from '@fluentui/react';
import { CopyArrowRight16Filled } from '@fluentui/react-icons';

type InheritIconType = {
  id: string;
  tooltip?: string | null;
};

export const InheritedByIcon = ({ id, tooltip }: InheritIconType) => {
  if (tooltip) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <TooltipHost onMouseLeave={() => {}} content={`This value is reused in ${tooltip}`} id={id}>
        <CopyArrowRight16Filled aria-label="Inherit" style={{ cursor: 'pointer', marginLeft: '5px' }} />
      </TooltipHost>
    );
  }
  return null;
};
