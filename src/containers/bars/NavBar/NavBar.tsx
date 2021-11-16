/* eslint-disable no-nested-ternary */
import { ReactElement } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';

import { ProfileMenu } from '../../menus/ProfileMenu';

import { MainMenu } from '../../menus/MainMenu';
import { useCurrentUserTheme } from '../../../hooks/useCurrentUserTheme';
import { useNotification } from '../../../hooks/useNotification';

import {
  StyledBox,
  StyledRow,
  StyledColumnLogoR,
  StyledTitle,
  StyledColumnNav,
  StyledColumnLogoL,
  StyledColumnCont,
  StyledButtonOrg,
  StyledIconButton,
} from './NavBar.styles';

import { useOrgSid } from '../../../hooks/useOrgSid';
import { useSessionStore } from '../../../store/SessionStore';
import { useActiveDomainStore } from '../../../store/ActiveDomainStore';
import { useThemeStore } from '../../../store/ThemeStore';

const defaultProps = {
  id: '',
  menuOptionSelected: 'dashboard',
  onUserSettings: () => null,
  visible: true,
};

type CDXBadgeProps = {
  id?: string;
  menuOptionSelected?: string;
  onUserSettings?: any | null;
  visible?: boolean;
} & typeof defaultProps;

const NavBar = ({ id, menuOptionSelected = 'dashboard', onUserSettings, visible }: CDXBadgeProps): ReactElement => {
  const SessionStore = useSessionStore();
  const ActiveDomainStore = useActiveDomainStore();
  const ThemeStore = useThemeStore();

  const Toast = useNotification();
  const authData = SessionStore.user;

  const [collapse, setCollapse] = useState(false);
  const { setOwnDashFontSize } = useCurrentUserTheme();

  const { setOrgSid } = useOrgSid();

  const changeCollapse = () => {
    setCollapse(!collapse);
  };

  const updateThemeFontSize = (key) => {
    const fontSize = { themeFontSize: key };

    setOwnDashFontSize(fontSize);

    ThemeStore.setUserTheme(fontSize);
  };

  const settingsMenu = [
    {
      key: 'SMALL',
      iconProps: { iconName: 'FontDecrease' },
      text: 'Small font size',
      onClick: () => updateThemeFontSize('SMALL'),
    },
    {
      key: 'MEDIUM',
      iconProps: { iconName: 'FontColorA' },
      text: 'Medium font size (default)',
      onClick: () => updateThemeFontSize('MEDIUM'),
    },
    {
      key: 'LARGE',
      iconProps: { iconName: 'FontIncrease' },
      text: 'Large font size',
      onClick: () => updateThemeFontSize('LARGE'),
    },
  ];

  // Render
  return (
    <StyledBox id={id}>
      <StyledRow id={`${id}__Nav`} left>
        <StyledColumnCont id={`${id}__Col-Left`} sm={8} left container>
          <StyledRow id={`${id}__Left-Row`} left sm={12}>
            <StyledColumnLogoL id={`${id}__Left-Row__Logo`} sm={2} noPadding>
              <StyledTitle variant="bold">CDX DASHBOARD</StyledTitle>
            </StyledColumnLogoL>
            <StyledColumnNav id={`${id}__Left-Row__Menu`} sm={10}>
              {visible && menuOptionSelected && (
                <MainMenu id="__MainMenu" left option={menuOptionSelected} changeCollapse={changeCollapse} />
              )}
            </StyledColumnNav>
            <StyledColumnLogoR id={`${id}__Right-Row__Logo`} sm={2} noPadding collapse>
              <StyledTitle>CDX DASHBOARD</StyledTitle>
            </StyledColumnLogoR>
          </StyledRow>
        </StyledColumnCont>
        <StyledColumnCont id={`${id}__Col-Right`} sm={4} right container>
          <StyledRow id={`${id}__Right_Row`} right>
            <StyledButtonOrg
              id="__Organization__Button"
              text={ActiveDomainStore.domainOrg.current.label}
              {...(ActiveDomainStore.domainOrg.current.subNavItems.length > 1 && {
                menuProps: {
                  items:
                    ActiveDomainStore.domainOrg.current.subNavItems.length <= 1
                      ? []
                      : ActiveDomainStore.domainOrg.current.subNavItems
                          .map((item, index) => ({
                            key: index,
                            text: item.label,
                            onClick: () => {
                              Toast.info({ text: `Loading ${item.label} domain`, duration: 3000 });

                              setTimeout(() => {
                                setOrgSid(item.orgSid);
                              }, 1500);
                            },
                          }))
                          .concat([
                            { key: 'DIVIDER', itemType: ContextualMenuItemType.Divider },
                            {
                              id: '__Return__Organization',
                              key: 'MAIN_ORG',
                              text: 'Return to my organization',
                              onClick: () => {
                                Toast.info({ text: `Loading your organization's domain`, duration: 3000 });

                                setTimeout(() => {
                                  setOrgSid(authData.orgSid);
                                }, 1500);
                              },
                            },
                          ]),
                },
              })}
            />

            <StyledIconButton iconProps={{ iconName: 'Font' }} title="Font sizes" menuProps={{ items: settingsMenu }} />

            <ProfileMenu id="__ProfileMenu" onUserSettings={onUserSettings} />
          </StyledRow>
        </StyledColumnCont>
      </StyledRow>
    </StyledBox>
  );
};

NavBar.defaultProps = defaultProps;

export { NavBar };
