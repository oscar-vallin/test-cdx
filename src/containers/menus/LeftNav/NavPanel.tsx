import { useState } from 'react';
import { ActionButton } from '@fluentui/react';
import { theme } from 'src/styles/themes/theme';
import { NavList, NavListItem } from './LeftNav.styles';

export type NavItemType = {
  id: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
};

type NavPanelType = {
  id: string;
  label: string;
  elements: NavItemType[];
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

export const NavPanel = ({ id, label, elements, expanded, onExpand, onCollapse }: NavPanelType) => {
  const hasSelectedMenu = (): boolean => {
    return elements.find((elem) => elem.selected) != null;
  };

  const [isOpen, setIsOpen] = useState(expanded || hasSelectedMenu());

  return (
    <div data-name={label} className={isOpen ? 'is-expanded' : ''}>
      <div>
        <ActionButton
          id={id}
          iconProps={{
            iconName: isOpen ? 'ChevronDown' : 'ChevronRight',
            style: {
              fontSize: theme.fontSizes.small,
              color: theme.colors.black,
            },
          }}
          style={{
            fontSize: theme.fontSizes.normal,
            fontWeight: theme.fontWeights.semiBold,
          }}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
              onCollapse();
            } else {
              setIsOpen(true);
              onExpand();
            }
          }}
        >
          {label}
        </ActionButton>
      </div>
      {isOpen && (
        <NavList>
          {elements.map((elem, index) => (
            <NavListItem key={`nav_${index}`} className={elem.className} selected={elem.selected}>
              <div data-name={elem.label}>
                <ActionButton
                  id={elem.id}
                  onClick={elem.onClick}
                  style={{
                    fontSize: theme.fontSizes.normal,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={elem.label}
                  ariaLabel={elem.label}
                >
                  {elem.label}
                </ActionButton>
              </div>
            </NavListItem>
          ))}
        </NavList>
      )}
    </div>
  );
};
