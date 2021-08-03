import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';

import { ProfileMenu } from '../../menus/ProfileMenu';

// Components
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { MainMenu } from '../../menus/MainMenu';
import { useCurrentUserTheme } from '../../../hooks/useCurrentUserTheme';
import { useThemeContext } from '../../../contexts/ThemeContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNotification } from '../../../contexts/hooks/useNotification';
import { Spacing } from '../../../components/spacings/Spacing';
import { Spinner } from '../../../components/spinners/Spinner';
// Hooks
// import { useNavBar } from "./NavBar.services";
// Styles
import {
  StyledBox,
  StyledRow,
  StyledColumnLogoR,
  StyledTitle,
  StyledColumn,
  StyledColumnNav,
  StyledColumnLogoL,
  StyledColumnCont,
  StyledDropdown,
  // StyledButtonProfile,
  StyledButtonIcon,
  StyledChoiceGroup,
  StyledButtonOrg,
} from './NavBar.styles';
import { useUserDomain } from '../../../contexts/hooks/useUserDomain';

// CardSection is called directly cause a restriction warning for that component.
const NavBar = ({ id = '__NavBar', menuOptionSelected = 'dashboard', onUserSettings, visible, ...props }) => {
  const Toast = useNotification();
  const { currentUserOrgNav } = useUserDomain();
  const [collapse, setCollapse] = React.useState('false');
  const { userTheme, setOwnDashFontSize, isHandlingFontSize } = useCurrentUserTheme();
  const { setFontSize } = useThemeContext();
  const { storeOrgsId, authData } = useAuthContext();
  const [themeFontSize, setThemeFontSize] = useState(userTheme?.themeFontSize || undefined);

  const changeCollapse = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    setThemeFontSize(userTheme.themeFontSize);
  }, [userTheme]);

  const updateThemeFontSize = (key) => {
    setThemeFontSize(key);
    setFontSize(key);
    setOwnDashFontSize({ themeFontSize: key });
  };

  const settingsMenu = [
    {
      key: 'SMALL',
      iconProps: { iconName: 'FontDecrease' },
      label: 'Small font size',
    },
    {
      key: 'MEDIUM',
      iconProps: { iconName: 'FontColorA' },
      label: 'Medium font size (default)',
    },
    {
      key: 'LARGE',
      iconProps: { iconName: 'FontIncrease' },
      label: 'Large font size',
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
              text={currentUserOrgNav?.label}
              {...((currentUserOrgNav.subNavItems || []).length > 1 && {
                menuProps: {
                  items:
                    (currentUserOrgNav.subNavItems || []).length <= 1
                      ? []
                      : (currentUserOrgNav?.subNavItems || [])
                          .map((item, index) => ({
                            key: index,
                            text: item.label,
                            onClick: () => {
                              Toast.info({ text: `Loading ${item.label} domain`, duration: 3000 });

                              setTimeout(() => storeOrgsId(item.page.parameters.orgSid), 1500);
                            },
                          }))
                          .concat([
                            { key: 'DIVIDER', itemType: ContextualMenuItemType.Divider },
                            {
                              key: 'MAIN_ORG',
                              text: 'Return to my organization',
                              onClick: () => {
                                Toast.info({ text: `Loading your organization's domain`, duration: 3000 });

                                setTimeout(() => storeOrgsId(authData.orgId), 1500);
                              },
                            },
                          ]),
                },
              })}
            />

            <StyledChoiceGroup
              selectedKey={themeFontSize}
              options={settingsMenu.map(({ key, label, iconProps }, index) => ({
                key,
                label,
                onRenderField: (props, render) => {
                  return (
                    <TooltipHost content={label} id={`tooltip-${index}`} calloutProps={{ gapSpace: 0 }}>
                      <button
                        disabled={isHandlingFontSize}
                        className={themeFontSize === key && 'selected'}
                        onClick={() => updateThemeFontSize(key)}
                      >
                        {isHandlingFontSize ? (
                          themeFontSize === key ? (
                            <Spinner size="xs" />
                          ) : (
                            <FontIcon iconName={iconProps.iconName} />
                          )
                        ) : (
                          <FontIcon iconName={iconProps.iconName} />
                        )}
                      </button>
                    </TooltipHost>
                  );
                },
              }))}
            />
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
