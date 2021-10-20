import { FontIcon, TooltipHost } from 'office-ui-fabric-react';

const CDXInfoIcon = ({ content }) => {
  return (
    <TooltipHost content={content}>
      <FontIcon iconName="Info" />
    </TooltipHost>
  );
};

export default CDXInfoIcon;
