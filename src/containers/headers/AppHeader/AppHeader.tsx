import { ReactElement, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Icon } from '@fluentui/react';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { ProfileMenu } from 'src/containers/menus/ProfileMenu';
import { useCurrentUserTheme } from 'src/hooks/useCurrentUserTheme';
import { useThemeStore } from 'src/store/ThemeStore';
import { useSessionStore } from 'src/store/SessionStore';
import { getRouteByApiId, ROUTE_USER_SETTINGS } from 'src/data/constants/RouteConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';

import {
  StyledContainer,
  NavButton,
  StyledNavIcon,
  StyledNav,
  StyledNavButton,
  StyledDiv,
  StyledIconButton,
  AdminNavPanel,
  StyledHeader,
  SubNav,
  StyledMenuItem,
} from './AppHeader.styles';

const defaultProps = {
  id: '',
  children: '',
};

type AppHeaderProps = {
  id?: string;
  menuOptionSelected?: any;
  sidebarOptionSelected?: any;
  onMenuOpen: () => void;
  onMenuClose: () => void;
};

const AppHeader = ({
  id,
  menuOptionSelected,
  sidebarOptionSelected,
  onMenuOpen,
  onMenuClose,
}: AppHeaderProps): ReactElement => {
  const history = useHistory();
  const location = useLocation();
  const { orgSid, startDate, endDate } = useOrgSid();
  const ThemeStore = useThemeStore();
  const { user } = useSessionStore();
  const ActiveDomainStore = useActiveDomainStore();

  const [isOpen, setIsOpen] = useState(true);
  const { setOwnDashFontSize } = useCurrentUserTheme();

  type mapProps = {
    type?: string;
    label?: string;
    destination?: string;
    subNavItems?: { type: string }[] | any;
  };

  const updateThemeFontSize = (key) => {
    const fontSize = { themeFontSize: key };

    setOwnDashFontSize(fontSize);

    ThemeStore.setUserTheme(fontSize);
  };

  const settingsMenu = [
    {
      id: '__Small_Font_Size_Btn',
      key: 'SMALL',
      iconProps: { iconName: 'FontDecrease' },
      text: 'Small font size',
      onClick: () => updateThemeFontSize('SMALL'),
    },
    {
      id: '__Medium_Font_Size_Btn',
      key: 'MEDIUM',
      iconProps: { iconName: 'FontColorA' },
      text: 'Medium font size (default)',
      onClick: () => updateThemeFontSize('MEDIUM'),
    },
    {
      id: '__Large_Font_Size_Btn',
      key: 'LARGE',
      iconProps: { iconName: 'FontIncrease' },
      text: 'Large font size',
      onClick: () => updateThemeFontSize('LARGE'),
    },
  ];

  const parseLinks = (links = [], sidebarOpt: string) => {
    return links.map(({ label, destination, subNavItems }: mapProps) => ({
      name: label,
      ...(subNavItems
        ? {
            isExpanded: subNavItems.find((item) => item.destination === sidebarOpt),
            links: parseLinks(subNavItems, ''),
          }
        : {}),
      ...(destination
        ? {
            url: getRouteByApiId(destination)?.URL,
            key: destination,
            // params: page.parameters,
            // commands: page.commands,
          }
        : {}),
    }));
  };

  const renderTopNavButtons = () => {
    return ActiveDomainStore.nav.dashboard.map((menuOption: { label: string; destination: string }) => {
      const opt:
        | {
            ID?: string;
            TITLE?: string;
            URL?: string;
            MAIN_MENU?: boolean;
            API_ID?: string;
          }
        | any = getRouteByApiId(menuOption.label !== 'Admin' ? menuOption.destination : 'ADMIN');

      return opt.MAIN_MENU ? (
        <StyledNavButton
          id={`__${menuOption.destination}_Tab`}
          key={menuOption.destination}
          data-e2e={menuOption.destination}
          selected={location.pathname === opt.URL}
          onClick={() => {
            let dest = `${opt.URL}?orgSid=${orgSid}`;
            if (startDate) {
              dest += `&startDate=${startDate}`;
            }
            if (endDate) {
              dest += `&endDate=${endDate}`;
            }
            history.push(dest);

            return null;
          }}
        >
          {menuOption.label}
        </StyledNavButton>
      ) : null;
    });
  };

  const renderOrgName = () => {
    return (
      <div className="HeaderBtnText">
        <div>
          <h2 className="HeaderBtnText__title">{ActiveDomainStore.domainOrg.current.orgId}</h2>
          <small className="HeaderBtnText__description">{ActiveDomainStore.domainOrg.current.label}</small>
        </div>
      </div>
    )
  };



  return (
    <StyledContainer id={id} open={isOpen}>
      <StyledHeader data-e2e="AppHeader">
        <NavButton id="__AdminNavBtn" open={isOpen}
                   onClick={() => {
                     if (isOpen) {
                       onMenuClose()
                       setIsOpen(false);
                     } else {
                       onMenuOpen();
                       setIsOpen(true);
                     }
                   }} data-e2e="AdminNavBtn">
          <StyledNavIcon iconName="GlobalNavButton" />
          {renderOrgName()}
        </NavButton>

        <StyledNavButton
          onClick={() => {
            ActiveDomainStore.setCurrentOrg(ActiveDomainStore.domainOrg.origin);
          }}
        >
          <Icon iconName="Home" />
        </StyledNavButton>

        <StyledNav>{renderTopNavButtons()}</StyledNav>

        <StyledDiv>
          <StyledIconButton
            id="__ProfileMenu_Font_Buttons"
            iconProps={{ iconName: 'Font' }}
            title="Font sizes"
            menuProps={{
              items: settingsMenu,
              contextualMenuItemAs: (props) => (
                <StyledMenuItem selected={ThemeStore.themes.user.themeFontSize === props.item.key}>
                  {props.item.text}
                </StyledMenuItem>
              ),
            }}
          />

          <ProfileMenu
            id="__ProfileMenu"
            onUserSettings={() => history.push(`${ROUTE_USER_SETTINGS.URL}?orgSid=${user.orgSid}`)}
          />
        </StyledDiv>
      </StyledHeader>

      <style>
        div[name='Return to my organization'] button span &#123;
          border-top: 1px solid lightgray;
        &#125;
      </style>

      <AdminNavPanel id="__AdminNav" open={isOpen} data-e2e="AdminNav">
        {ActiveDomainStore?.domainOrg?.current && (
          <SubNav
            highlight
            selectedKey={sidebarOptionSelected}
            groups={[
              {
                links: [
                  {
                    name: 'Navigate To...',
                    isExpanded: false,
                    url: '',
                    links:
                      ActiveDomainStore.domainOrg.current.subNavItems?.length > 1
                        ? [
                            ...ActiveDomainStore.domainOrg.current.subNavItems.map((item) => ({
                              name: item.label,
                              title: item.label,
                              ariaLabel: item.label,
                              ...item,
                            })),
                            {

                              automationId: '__ReturnToOrg',
                              name: 'Return to my organization',
                              ariaLabel: 'Return to my organization',
                              home: true,
                            },
                          ]
                        : [],
                  },
                ],
              },
            ]}
            onLinkClick={(evt: any, route: any) => {
              evt.preventDefault();

              ActiveDomainStore.setCurrentOrg(route.home ? ActiveDomainStore.domainOrg.origin : route);

              // setIsOpen(false);
            }}
          />
        )}

        <SubNav
          className="AppHeader__MobileNav"
          selectedKey={menuOptionSelected.replace('-', '_').toUpperCase()}
          groups={[{ links: parseLinks(ActiveDomainStore.nav.dashboard, menuOptionSelected) }]}
          onLinkClick={(evt: any, route: { links: string; url: string }) => {
            evt.preventDefault();

            if (!route.links) {
              history.push(`${route.url}?orgSid=${orgSid}`);
            }
            setIsOpen(false);
          }}
        />

        <SubNav
          selectedKey={sidebarOptionSelected}
          groups={[{ links: parseLinks(ActiveDomainStore.nav.admin, sidebarOptionSelected) }]}
          onLinkClick={(evt: any, route: { links: string; url: string }) => {
            evt.preventDefault();

            if (!route.links) {
              history.push(`${route.url}?orgSid=${orgSid}`);
            }
            // setIsOpen(false);
          }}
        />
      </AdminNavPanel>
    </StyledContainer>
  );
};

AppHeader.defaultProps = defaultProps;

export { AppHeader };
