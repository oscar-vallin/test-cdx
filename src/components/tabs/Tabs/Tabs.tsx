import { ReactElement } from 'react';
import { PivotItem } from 'office-ui-fabric-react/lib-commonjs/Pivot';
import { Badge } from '../../badges/Badge';
import { StyledPivot, StyledSpan } from './Tabs.styles';

const defaultProps = {
  items: [],
  selectedKey: '',
  onClickTab: () => null,
};

type CDXTabsProps = {
  items?: { title: string; content: string; badge: string; hash: string }[];
  selectedKey?: string;
  onClickTab?: any | null;
} & typeof defaultProps;

const CDXTabs = ({ items, selectedKey, onClickTab }: CDXTabsProps): ReactElement => {
  return (
    <StyledPivot defaultSelectedKey={selectedKey}>
      {items.map(({ title, content, badge, hash }, index) => (
        <PivotItem
          headerText={title}
          key={index}
          onRenderItemLink={(link, defaultRenderer) => (
            <StyledSpan onClick={() => onClickTab(hash)}>
              {defaultRenderer(link)}
              {badge && <Badge variant={badge.variant} label={badge.label?.toString()} />}
            </StyledSpan>
          )}
        >
          {content}
        </PivotItem>
      ))}
    </StyledPivot>
  );
};

CDXTabs.defaultProps = defaultProps;

export { CDXTabs };
