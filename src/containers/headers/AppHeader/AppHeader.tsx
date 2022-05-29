import { ReactElement } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Icon } from '@fluentui/react';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { ProfileMenu } from 'src/containers/menus/ProfileMenu';
import { ROUTE_EXTERNAL_ORGS } from 'src/data/constants/RouteConstants';
import { useCurrentUserTheme } from 'src/hooks/useCurrentUserTheme';
import { useThemeStore } from 'src/store/ThemeStore';
import { useSessionStore } from 'src/store/SessionStore';
import { getRouteByApiId, ROUTE_USER_SETTINGS } from 'src/data/constants/RouteConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';

import {
  NavButton,
  StyledNavIcon,
  StyledNav,
  StyledNavButton,
  StyledDiv,
  StyledIconButton,
  StyledHeader,
  StyledMenuItem,
  StyledOverFlow,
} from './AppHeader.styles';

const defaultProps = {
  id: '',
  children: '',
};

type AppHeaderProps = {
  onMenuButtonClick: () => void;
};

const AppHeader = ({ onMenuButtonClick }: AppHeaderProps): ReactElement => {
  const history = useHistory();
  const location = useLocation();
  const { orgSid, startDate, endDate } = useOrgSid();
  const ThemeStore = useThemeStore();
  const { user } = useSessionStore();
  const ActiveDomainStore = useActiveDomainStore();

  const { setOwnDashFontSize } = useCurrentUserTheme();

  let originDestination = ActiveDomainStore.domainOrg.origin.destination !== ROUTE_EXTERNAL_ORGS.API_ID;

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
    if (originDestination) {
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
    }
    return;
  };

  const renderOrgName = () => {
    return (
      <div className="HeaderBtnText">
        <div>
          <h2 className="HeaderBtnText__title">{ActiveDomainStore.domainOrg.current.orgId}</h2>
          <StyledOverFlow>
            <small className="HeaderBtnText__description">{ActiveDomainStore.domainOrg.current.label}</small>
          </StyledOverFlow>
        </div>
      </div>
    );
  };

  const showStyledNavIcon = () => {
    if (originDestination) {
      return (
        <NavButton id="__AdminNavBtn" onClick={onMenuButtonClick} data-e2e="AdminNavBtn">
          <StyledNavIcon iconName="GlobalNavButton" />
          {renderOrgName()}
        </NavButton>
      );
    }
    return (
      <NavButton id="__AdminNavBtn" data-e2e="AdminNavBtn">
        {renderOrgName()}
      </NavButton>
    );
  };

  return (
    <StyledHeader data-e2e="AppHeader">
      {showStyledNavIcon()}

      <StyledNavButton
        id="__ProfileMenu_Home_button"
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
  );
};

AppHeader.defaultProps = defaultProps;

export { AppHeader };
