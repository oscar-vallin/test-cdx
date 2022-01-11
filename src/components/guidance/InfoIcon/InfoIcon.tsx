import { FontIcon, TooltipHost } from '@fluentui/react';

const CDXInfoIcon = ({ content }) => {
  return (
    <TooltipHost content={content}>
      <FontIcon iconName="Info" />
    </TooltipHost>
  );
};

export default CDXInfoIcon;
