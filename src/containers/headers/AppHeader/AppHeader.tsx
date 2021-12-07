import { ReactElement } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Icon } from '@fluentui/react/lib-commonjs/Icon';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { ProfileMenu } from 'src/containers/menus/ProfileMenu';
import { useCurrentUserTheme } from 'src/hooks/useCurrentUserTheme';
import { useThemeStore } from 'src/store/ThemeStore';
import { getRouteByApiId } from '../../../data/constants/RouteConstants';
import { useOrgSid } from '../../../hooks/useOrgSid';

import {
  StyledContainer,
  StyledButton,
  StyledNavIcon,
  StyledChevronDown,
  StyledLink,
  StyledNav,
  StyledNavButton,
  StyledDiv,
  StyledIconButton,
} from './AppHeader.styles';

const defaultProps = {
  id: '',
  children: '',
};

type AppHeaderProps = {
  id?: string;
  children?: any;
  onUserSettings?: any;
};

const AppHeader = ({ id, onUserSettings, children }: AppHeaderProps): ReactElement => {
  const history = useHistory();
  const location = useLocation();
  const { orgSid, setOrgSid } = useOrgSid();
  const ThemeStore = useThemeStore();
  const ActiveDomainStore = useActiveDomainStore();
  const { setOwnDashFontSize } = useCurrentUserTheme();

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
    <StyledContainer id={id} className="AppHeader" data-e2e="AppHeader">
      <StyledButton>
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

          <StyledChevronDown iconName="ChevronDown" />
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

        <ProfileMenu id="__ProfileMenu" onUserSettings={onUserSettings} />
      </StyledDiv>
    </StyledContainer>
  );
};

AppHeader.defaultProps = defaultProps;

export { AppHeader };
