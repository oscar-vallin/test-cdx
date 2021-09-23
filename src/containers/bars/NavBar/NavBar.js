/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';

import { IconButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { ProfileMenu } from '../../menus/ProfileMenu';

import { MainMenu } from '../../menus/MainMenu';
import { useCurrentUserTheme } from '../../../hooks/useCurrentUserTheme';
import { useNotification } from '../../../hooks/useNotification';
import { Spinner } from '../../../components/spinners/Spinner';

import {
  StyledBox,
  StyledRow,
  StyledColumnLogoR,
  StyledTitle,
  StyledColumnNav,
  StyledColumnLogoL,
  StyledColumnCont,
  StyledChoiceGroup,
  StyledButtonOrg,
  StyledIconButton,
} from './NavBar.styles';

import { useOrgSid } from '../../../hooks/useOrgSid';
import { useSessionStore } from '../../../store/SessionStore';
import { useActiveDomainStore } from '../../../store/ActiveDomainStore';
import { useThemeStore } from '../../../store/ThemeStore';

const NavBar = ({ id = '__NavBar', menuOptionSelected = 'dashboard', onUserSettings, visible }) => {
  const SessionStore = useSessionStore();
  const ActiveDomainStore = useActiveDomainStore();
  const ThemeStore = useThemeStore();

  const Toast = useNotification();
  const authData = SessionStore.user;

  const [collapse, setCollapse] = useState('false');
  const { setOwnDashFontSize, isHandlingFontSize } = useCurrentUserTheme();

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
                <MainMenu left option={menuOptionSelected} changeCollapse={changeCollapse} />
              )}
            </StyledColumnNav>
            <StyledColumnLogoR id={`${id}__Left-Row__Logo`} sm={2} noPadding collapse>
              <StyledTitle>CDX DASHBOARD</StyledTitle>
            </StyledColumnLogoR>
          </StyledRow>
        </StyledColumnCont>
        <StyledColumnCont id={`${id}__Col-Right`} sm={4} right container>
          <StyledRow id={`${id}__Right_Row`} right>
            <StyledButtonOrg
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

            <ProfileMenu onUserSettings={onUserSettings} />
          </StyledRow>
        </StyledColumnCont>
      </StyledRow>
    </StyledBox>
  );
};

NavBar.propTypes = {
  id: PropTypes.string,
};

export { NavBar };
