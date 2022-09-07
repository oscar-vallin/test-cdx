import { ReactElement } from 'react';
import { IPivotItemProps, PivotItem } from '@fluentui/react';
import { Badge } from 'src/components/badges/Badge';
import { theme } from 'src/styles/themes/theme';
import { StyledPivot, StyledSpan } from './Tabs.styles';

type BadgeType = {
  variant: string;
  label: string;
};

export type CDXTabsItemType = {
  title: string;
  content: ReactElement;
  hash: string;
  badge?: BadgeType;
  disabled?: boolean;
};

type CDXTabsType = {
  items?: CDXTabsItemType[] | any;
  selectedKey?: string;
  onClickTab: (key: string) => void;
};

const renderHeader = (
  hash: string,
  onClickTab: (key: string) => void,
  badge?: BadgeType,
  link?: IPivotItemProps,
  defaultRenderer?: (props?: IPivotItemProps) => JSX.Element | null,
) => (
  <StyledSpan onClick={() => onClickTab(hash)}>
    {defaultRenderer && defaultRenderer(link)}
    {badge && <Badge variant={badge.variant} label={badge.label?.toString()} />}
  </StyledSpan>
);

const CDXTabs = ({ items, selectedKey, onClickTab }: CDXTabsType): ReactElement => (
  <StyledPivot
    selectedKey={selectedKey}
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
    {items.map(({
      title, content, badge, hash, disabled,
    }: CDXTabsItemType, index) => (
      <PivotItem
        headerText={title}
        key={index}
        itemKey={hash}
        onRenderItemLink={(link, defaultRenderer) => renderHeader(hash, onClickTab, badge, link, defaultRenderer)}
        headerButtonProps={{
          disabled,
        }}
      >
        {content}
      </PivotItem>
    ))}
  </StyledPivot>
);

export { CDXTabs };
