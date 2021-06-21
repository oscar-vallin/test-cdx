import React from 'react';

import { Badge } from '../../badges/Badge';
import { PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { StyledPivot, StyledSpan } from './Tabs.styles';

const CDXTabs = ({ items, selectedKey, onClickTab }) => {
  return (
    <StyledPivot defaultSelectedKey={selectedKey}>
      {items.map(({ title, content, badge, hash }, index) => (
        <PivotItem
          headerText={title}
          key={index}
          onRenderItemLink={(link, defaultRenderer) => (
            <StyledSpan onClick={() => onClickTab(hash)}>
              {defaultRenderer(link)}
              {badge && <Badge variant={badge.variant} label={badge.label} />}
            </StyledSpan>
          )}
        >
          {content}
        </PivotItem>
      ))}
    </StyledPivot>
  );
};

export { CDXTabs };
