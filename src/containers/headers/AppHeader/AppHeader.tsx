import { ReactElement, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useHistory, useLocation } from 'react-router';
import { Icon } from '@fluentui/react/lib-commonjs/Icon';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { ProfileMenu } from 'src/containers/menus/ProfileMenu';
import { useCurrentUserTheme } from 'src/hooks/useCurrentUserTheme';
import { useThemeStore } from 'src/store/ThemeStore';
import { useSessionStore } from 'src/store/SessionStore';
import { getRouteByApiId, ROUTE_USER_SETTINGS } from '../../../data/constants/RouteConstants';
import { useOrgSid } from '../../../hooks/useOrgSid';

import {
  StyledContainer,
  StyledButton,
  StyledNavIcon,
  StyledNav,
  StyledNavButton,
  StyledDiv,
  StyledIconButton,
  StyledPanel,
  StyledHeader,
  StyledSubNav,
} from './AppHeader.styles';

const defaultProps = {
  id: '',
  children: '',
};

type AppHeaderProps = {
  id?: string;
  children?: any;
  onUserSettings?: any;
  sidebarOptionSelected?: any;
};

const AppHeader = ({ id, onUserSettings, sidebarOptionSelected, children }: AppHeaderProps): ReactElement => {
  const history = useHistory();
  const location = useLocation();
  const { orgSid } = useOrgSid();
  const ThemeStore = useThemeStore();
  const { user } = useSessionStore();
  const ActiveDomainStore = useActiveDomainStore();

  const [isOpen, setIsOpen] = useState(false);
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

  const renderNavButtons = () => {
    return ActiveDomainStore.nav.dashboard.map((menuOption: { label: string; destination: string }, index: any) => {
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
          key={menuOption.destination}
          data-e2e={menuOption.destination}
          selected={location.pathname === opt.URL}
          onClick={() => {
            history.push(`${opt.URL}?orgSid=${orgSid}`);

            return null;
          }}
        >
          {menuOption.label}
        </StyledNavButton>
      ) : null;
    });
  };

  return (
    <StyledContainer id={id} open={isOpen}>
      <StyledHeader data-e2e="AppHeader">
        <StyledButton open={isOpen} onClick={() => setIsOpen(!isOpen)} data-e2e="AdminNavBtn">
          <StyledNavIcon iconName="GlobalNavButton" />

          <div className="HeaderBtnText">
            <div>
              <h2 className="HeaderBtnText__title">
                {ActiveDomainStore.domainOrg.current.label
                  .split('')
                  .filter((letter) => letter.match(/^[A-Z]*$/))
                  .join('')}
              </h2>

              <small className="HeaderBtnText__description">{ActiveDomainStore.domainOrg.current.label}</small>
            </div>

            {/* <StyledChevronDown iconName="ChevronDown" /> */}
          </div>
        </StyledButton>

        <StyledNavButton
          onClick={() => {
            ActiveDomainStore.setCurrentOrg(ActiveDomainStore.domainOrg.origin);
          }}
        >
          <Icon iconName="Home" />
        </StyledNavButton>

        <StyledNav>{renderNavButtons()}</StyledNav>

        <StyledDiv>
          <StyledIconButton
            id="__ProfileMenu_Font_Buttons"
            iconProps={{ iconName: 'Font' }}
            title="Font sizes"
            menuProps={{ items: settingsMenu }}
          />

          <ProfileMenu
            id="__ProfileMenu"
            onUserSettings={() => history.push(`${ROUTE_USER_SETTINGS.URL}?orgSid=${user.orgSid}`)}
          />
        </StyledDiv>
      </StyledHeader>

      <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
        <StyledPanel open={isOpen} data-e2e="AdminNav">
          <StyledSubNav
            selectedKey={sidebarOptionSelected}
            groups={[{ links: parseLinks(ActiveDomainStore.nav.admin, sidebarOptionSelected) }]}
            onLinkClick={(evt: any, route: { links: string; url: string }) => {
              evt.preventDefault();

              if (!route.links) {
                history.push(`${route.url}?orgSid=${orgSid}`);
              }
              setIsOpen(false);
            }}
          />
        </StyledPanel>
      </OutsideClickHandler>
    </StyledContainer>
  );
};

AppHeader.defaultProps = defaultProps;

export { AppHeader };
