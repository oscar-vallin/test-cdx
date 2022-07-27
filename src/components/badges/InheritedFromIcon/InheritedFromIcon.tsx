import { TooltipHost } from '@fluentui/react';
import { CopySelect20Filled } from '@fluentui/react-icons';

type InheritIconType = {
  id: string;
  tooltip?: string | null;
};

export const InheritedFromIcon = ({ id, tooltip }: InheritIconType) => {
  if (tooltip) {
    return (
      <TooltipHost onMouseLeave={() => {}} content={`Inherited from ${tooltip}`} id={id}>
        <CopySelect20Filled aria-label="Inherit" style={{ cursor: 'pointer', marginLeft: '5px' }} />
      </TooltipHost>
    );
  }
  return null;
};
