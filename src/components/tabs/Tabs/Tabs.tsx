import { ReactElement } from 'react';
import { PivotItem } from '@fluentui/react';
import { Badge } from 'src/components/badges/Badge';
import { theme } from 'src/styles/themes/theme';
import { StyledPivot, StyledSpan } from './Tabs.styles';

export type CDXTabsItemType = {
  title: string;
  content: ReactElement;
  hash: string;
  badge?: { variant: string; label: string };
};

type CDXTabsType = {
  items?: CDXTabsItemType[] | any;
  selectedKey?: string;
  onClickTab: (key: string) => void;
};

const CDXTabs = ({ items, selectedKey, onClickTab }: CDXTabsType): ReactElement => {
  return (
    <StyledPivot
      defaultSelectedKey={selectedKey}
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
      {items.map(({ title, content, badge, hash }: CDXTabsItemType, index) => (
        <PivotItem
          headerText={title}
          key={index}
          itemKey={hash}
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

export { CDXTabs };
