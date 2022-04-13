import { useHistory } from 'react-router';
import { ActionButton } from '@fluentui/react';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { getRouteByApiId } from 'src/data/constants/RouteConstants';
import { NavItemType, NavPanel } from 'src/containers/menus/LeftNav/NavPanel';
import { theme } from 'src/styles/themes/theme';
import { AdminNavPanel, MenuSeparator, MobileTopNav, NavList, NavListItem } from './LeftNav.styles';

type LeftNavProps = {
  menuOptionSelected?: string;
  isOpen: boolean;
};

export const LeftNav = ({ menuOptionSelected, isOpen }: LeftNavProps) => {
  const history = useHistory();
  const { orgSid } = useOrgSid();
  const ActiveDomainStore = useActiveDomainStore();

  const renderOrgNavigation = () => {
    const items = ActiveDomainStore?.domainOrg?.current?.subNavItems ?? [];
    if (items.length > 1) {
      const navItems: NavItemType[] = items
        .filter((item) => item.orgSid != orgSid)
        .map((item) => {
          return {
            id: `__NavToOrg_${item.orgSid}`,
            label: item.label,
            selected: item.destination == menuOptionSelected,
            onClick: () => ActiveDomainStore?.setCurrentOrg(item),
          };
        });

      return (
        <NavPanel
          id="__ParentOrgNav"
          label="Navigate To..."
          elements={[
            ...navItems,
            {
              id: '__ReturnHome',
              label: 'Return to my organization',
              selected: false,
              onClick: () => ActiveDomainStore.setCurrentOrg(ActiveDomainStore.domainOrg.origin),
              className: 'return-home',
            },
          ]}
          expanded={ActiveDomainStore?.domainOrg?.current?.isExpanded}
          onCollapse={() => {
            ActiveDomainStore.domainOrg.current.isExpanded = false;
          }}
          onExpand={() => {
            ActiveDomainStore.domainOrg.current.isExpanded = true;
          }}
        />
      );
    }
    return null;
  };

  const renderMobileTopNav = () => {
    const items = ActiveDomainStore?.nav?.dashboard ?? [];
    const navItems: NavItemType[] = items.map((item) => {
      return {
        id: `__NavTo_${item.destination}`,
        label: item.label,
        selected: item.destination == menuOptionSelected,
        onClick: () => {
          const url = getRouteByApiId(item.destination)?.URL;
          if (url) {
            history.push(`${url}?orgSid=${orgSid}`);
          }
        },
      };
    });
    return (
      <MobileTopNav>
        <NavList>
          {navItems.map((elem, index) => (
            <NavListItem key={`mTopNav_${index}`} selected={elem.selected}>
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
      </MobileTopNav>
    );
  };

  const renderAdminItems = () => {
    return ActiveDomainStore.nav.admin.map((navItem, index) => {
      if (navItem.label == '-') {
        return <MenuSeparator key={`adminNav_separator_${index}`} />;
      }
      return (
        <NavPanel
          id={`__Nav_${navItem.label.replace(' ', '_')}`}
          key={`adminNav_${index}`}
          label={navItem.label}
          elements={
            navItem.subNavItems?.map((subNav) => {
              return {
                id: `__Nav_${subNav.destination}`,
                label: subNav.label,
                selected: subNav.destination == menuOptionSelected,
                onClick: () => {
                  const url = getRouteByApiId(subNav.destination)?.URL;
                  if (url) {
                    history.push(`${url}?orgSid=${orgSid}`);
                  }
                },
              };
            }) || []
          }
          expanded={navItem.isExpanded}
          onCollapse={() => {
            navItem.isExpanded = false;
          }}
          onExpand={() => {
            navItem.isExpanded = true;
          }}
        />
      );
    });
  };

  if (ActiveDomainStore.nav.admin.length > 0) {
    return (
      <AdminNavPanel id="__AdminNav" open={isOpen} data-e2e="AdminNav">
        {renderMobileTopNav()}

        {renderOrgNavigation()}

        {renderAdminItems()}
      </AdminNavPanel>
    );
  }

  return null;
};
