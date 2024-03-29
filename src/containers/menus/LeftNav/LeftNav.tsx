import { useHistory } from 'react-router';
import { ActionButton } from '@fluentui/react';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { getRouteByApiId, ROUTE_XCHANGE_DETAILS } from 'src/data/constants/RouteConstants';
import { NavItemType, NavPanel } from 'src/containers/menus/LeftNav/NavPanel';
import { theme } from 'src/styles/themes/theme';
import {
  AdminNavPanel, MenuSeparator, MobileTopNav, NavList, NavListItem,
} from './LeftNav.styles';

type LeftNavProps = {
  menuOptionSelected?: string;
  isOpen: boolean;
};

export const LeftNav = ({ menuOptionSelected, isOpen }: LeftNavProps) => {
  const history = useHistory();
  const { orgSid } = useOrgSid();
  const ActiveDomain = useActiveDomainUseCase();
  const ActiveDomainStore = useActiveDomainStore();

  const renderOrgNavigation = () => {
    const items = ActiveDomainStore?.domainOrg?.current?.subNavItems ?? [];
    if (items.length > 1) {
      const navItems: NavItemType[] = items
        .filter((item) => item.orgSid !== orgSid)
        .map((item) => ({
          id: `__NavToOrg_${item.orgSid}`,
          label: item.label,
          selected: item.destination === menuOptionSelected,
          onClick: () => ActiveDomain.setCurrentOrg(item.orgSid),
        }));

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
              onClick: () => ActiveDomain.setCurrentOrg(ActiveDomainStore.domainOrg.origin.orgSid),
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
    const navItems: NavItemType[] = items.map((item) => ({
      id: `__NavTo_${item.destination}`,
      label: item.label,
      selected: item.destination === menuOptionSelected,
      onClick: () => {
        const url = getRouteByApiId(item.destination)?.URL;
        if (url) {
          history.push(`${url}?orgSid=${orgSid}`);
        }
      },
    }));
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

  const renderAdminItems = () => ActiveDomainStore.nav.admin.map((navItem, index) => {
    if (navItem.label === '-') {
      return <MenuSeparator key={`adminNav_separator_${index}`} />;
    }

    const subNavItems: any[] = [];
    navItem.subNavItems.forEach((subNavItem) => {
      subNavItems.push(subNavItem);
      if (menuOptionSelected === ROUTE_XCHANGE_DETAILS.API_ID && subNavItem.label === 'Xchanges') {
        subNavItems.push({
          label: 'Details',
          destination: ROUTE_XCHANGE_DETAILS.API_ID,
          orgSid,
          subNavItems: undefined,
        })
      }
    });

    return (
      <NavPanel
        id={`__Nav_${navItem.label.replace(' ', '_')}`}
        key={`adminNav_${index}`}
        label={navItem.label}
        elements={
            subNavItems.map((subNav) => {
              if (subNav.destination === menuOptionSelected) navItem.isExpanded = true;
              return {
                id: `__Nav_${subNav.destination}`,
                label: subNav.label,
                selected: subNav.destination === menuOptionSelected,
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
