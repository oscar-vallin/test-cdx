import { ReactElement } from 'react';
import { PivotItem } from 'office-ui-fabric-react/lib-commonjs/Pivot';
import { Badge } from '../../badges/Badge';
import { StyledPivot, StyledSpan } from './Tabs.styles';

const defaultProps = {
  items: [],
  selectedKey: '',
  onClickTab: () => null,
};

type itemsProps = {
  title: string;
  content: ReactElement;
  badge: { variant?: string; label?: string };
  hash: () => null;
};

type CDXTabsProps = {
  items?: { title: string; content: string; badge: string; hash: string }[] | any;
  selectedKey?: string;
  onClickTab?: any | null;
} & typeof defaultProps;

const CDXTabs = ({ items, selectedKey, onClickTab }: CDXTabsProps): ReactElement => {
  return (
    <StyledPivot defaultSelectedKey={selectedKey}>
      {items.map(({ title, content, badge, hash }: itemsProps, index) => (
        <PivotItem
          headerText={title}
          key={index}
          onRenderItemLink={(link: any, defaultRenderer: any): any => (
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
