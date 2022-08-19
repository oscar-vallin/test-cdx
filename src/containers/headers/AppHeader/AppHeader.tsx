import { ReactElement, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Icon, IContextualMenuItem } from '@fluentui/react';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { ProfileMenu } from 'src/containers/menus/ProfileMenu';
import { getRouteByApiId, ROUTE_USER_SETTINGS } from 'src/data/constants/RouteConstants';
import { useCurrentUserTheme } from 'src/hooks/useCurrentUserTheme';
import { useThemeStore } from 'src/store/ThemeStore';
import { useSessionStore } from 'src/store/SessionStore';
import { useOrgSid } from 'src/hooks/useOrgSid';

import { ThemeFontSize } from 'src/data/services/graphql';
import { topNavTour, WalkThrough } from 'src/components/help';
import {
  NavButton,
  StyledDiv,
  StyledHeader,
  StyledIconButton,
  StyledMenuItem,
  StyledNav,
  StyledNavButton,
  StyledNavIcon,
  StyledOverFlow,
} from './AppHeader.styles';

type AppHeaderProps = {
  onMenuButtonClick: () => void;
  hasLeftMenu?: boolean;
};

const AppHeader = ({ onMenuButtonClick, hasLeftMenu = true }: AppHeaderProps): ReactElement => {
  const history = useHistory();
  const location = useLocation();
  const { orgSid, startDate, endDate } = useOrgSid();
  const ThemeStore = useThemeStore();
  const { user } = useSessionStore();
  const ActiveDomainStore = useActiveDomainStore();

  const { setFontSize } = useCurrentUserTheme();
  const [isShowHelp, setIsShowHelp] = useState(false);

  const updateThemeFontSize = (fontSize: ThemeFontSize) => {
    setFontSize(fontSize);
  };

  const settingsMenu: IContextualMenuItem[] = [
    {
      id: '__Small_Font_Size_Btn',
      key: 'SMALL',
      iconProps: { iconName: 'FontDecrease' },
      text: 'Small font size',
      onClick: () => updateThemeFontSize(ThemeFontSize.Small),
    },
    {
      id: '__Medium_Font_Size_Btn',
      key: 'MEDIUM',
      iconProps: { iconName: 'FontColorA' },
      text: 'Medium font size (default)',
      onClick: () => updateThemeFontSize(ThemeFontSize.Medium),
    },
    {
      id: '__Large_Font_Size_Btn',
      key: 'LARGE',
      iconProps: { iconName: 'FontIncrease' },
      text: 'Large font size',
      onClick: () => updateThemeFontSize(ThemeFontSize.Large),
    },
  ];

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
          <StyledOverFlow>
            <small className="HeaderBtnText__description">{ActiveDomainStore.domainOrg.current.label}</small>
          </StyledOverFlow>
        </div>
      </div>
    );
  };

  const showStyledNavIcon = () => {
    if (hasLeftMenu) {
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

  const openUserSettings = () => {
    history.push(`${ROUTE_USER_SETTINGS.URL}?orgSid=${user.orgSid}`);
  };

  const renderMenuItem = (props) => (
    <StyledMenuItem selected={ThemeStore.userTheme.themeFontSize === props.item.key}>{props.item.text}</StyledMenuItem>
  );

  return (
    <>
      <StyledHeader data-e2e="AppHeader">
        {showStyledNavIcon()}

        <StyledNavButton
          id="__ProfileMenu_Home_button"
          onClick={() => {
            ActiveDomainStore.setCurrentOrg(ActiveDomainStore.domainOrg.origin);
          }}
          title="Home"
          aria-label="Home"
        >
          <Icon iconName="Home" />
        </StyledNavButton>

        <StyledNav>{renderTopNavButtons()}</StyledNav>

        <StyledDiv>
          <StyledIconButton
            id="__AppHeader_Help"
            iconProps={{ iconName: 'Help' }}
            title="Help"
            aria-label="Help"
            onClick={() => setIsShowHelp(!isShowHelp)}
          />

          <StyledIconButton
            id="__ProfileMenu_Font_Buttons"
            iconProps={{ iconName: 'Font' }}
            title="Font sizes"
            aria-label="Font sizes"
            menuProps={{
              items: settingsMenu,
              contextualMenuItemAs: renderMenuItem,
            }}
          />

          <ProfileMenu id="__ProfileMenu" onUserSettings={openUserSettings} />
        </StyledDiv>
      </StyledHeader>
      <WalkThrough id="__TopNav_Tour" show={isShowHelp} tour={topNavTour} onDismiss={() => setIsShowHelp(false)} />
    </>
  );
};

export { AppHeader };
