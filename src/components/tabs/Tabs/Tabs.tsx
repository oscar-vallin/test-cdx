import { ReactElement } from 'react';
import { PivotItem } from '@fluentui/react';
import { Badge } from 'src/components/badges/Badge';
import { StyledPivot, StyledSpan } from './Tabs.styles';
import { theme } from 'src/styles/themes/theme';

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
    <StyledPivot
      selectedKey={String(selectedKey)}
      overflowBehavior="menu"
      overflowAriaLabel="more items"
      styles={{
        link: {
          fontSize: theme.fontSizes.normal,
        },
        linkIsSelected: {
          fontSize: theme.fontSizes.normal,
        },
      }}
      style={{ fontSize: theme.fontSizes.normal }}
    >
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
