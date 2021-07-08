import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { ProfileMenu } from '../../menus/ProfileMenu';
// Components
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';
import { MainMenu } from '../../menus/MainMenu';
import { useCurrentUserTheme } from '../../../hooks/useCurrentUserTheme';
import { useThemeContext } from '../../../contexts/ThemeContext';
import { useAuthContext } from '../../../contexts/AuthContext';
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
} from './NavBar.styles';

// CardSection is called directly cause a restriction warning for that component.
const NavBar = ({ id = '__NavBar', menuOptionSelected = 'dashboard', onUserSettings, ...props }) => {
  const [collapse, setCollapse] = React.useState('false');
  const { userTheme, createOrUpdateTheme, isLoadingTheme, isHandlingTheme } = useCurrentUserTheme();
  const { setFontSize } = useThemeContext();
  const { isAuthenticated } = useAuthContext();
  const [themeFontSize, setThemeFontSize] = useState(userTheme?.themeFontSize || undefined);

  const changeCollapse = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    setThemeFontSize(userTheme.themeFontSize);
  }, [userTheme]);

  // const renderIcon = (iconName) => {
  //   return (
  //     <StyledColumn id={`${id}__Right__${iconName}`} noStyle>
  //       <StyledButtonIcon icon={iconName} variant={'navbar'} size={18} />
  //     </StyledColumn>
  //   );
  // };

  const updateThemeFontSize = (key) => {
    setThemeFontSize(key);
    setFontSize(key);
    createOrUpdateTheme({ themeFontSize: key });
  };

  const settingsMenu = [
    {
      key: 'SMALL',
      iconProps: { iconName: 'FontDecrease' },
      label: 'Small',
    },
    {
      key: 'MEDIUM',
      iconProps: { iconName: 'FontColorA' },
      label: 'Medium (default)',
    },
    {
      key: 'LARGE',
      iconProps: { iconName: 'FontIncrease' },
      label: 'Large',
    },
  ];

  // Render
  return (
    <StyledBox id={id}>
      <StyledRow id={`${id}__Nav`} left>
        <StyledColumnCont id={`${id}__Col-Left`} sm={9} left container>
          <StyledRow id={`${id}__Left-Row`} left sm={12}>
            <StyledColumnLogoL id={`${id}__Left-Row__Logo`} sm={2} noPadding>
              <StyledTitle variant="bold">CDX DASHBOARD</StyledTitle>
            </StyledColumnLogoL>
            <StyledColumnNav id={`${id}__Left-Row__Menu`} sm={10}>
              <MainMenu left option={menuOptionSelected} changeCollapse={changeCollapse} />
            </StyledColumnNav>
            <StyledColumnLogoR id={`${id}__Left-Row__Logo`} sm={2} noPadding collapse>
              <StyledTitle>CDX DASHBOARD</StyledTitle>
            </StyledColumnLogoR>
          </StyledRow>
        </StyledColumnCont>
        <StyledColumnCont id={`${id}__Col-Right`} sm={3} right container>
          <StyledRow id={`${id}__Right_Row`} right>
            <StyledChoiceGroup
              selectedKey={themeFontSize}
              options={settingsMenu.map(({ key, label, iconProps }, index) => ({
                key,
                label,
                onRenderField: (props, render) => {
                  return (
                    <label className={themeFontSize === key && 'selected'} onClick={() => updateThemeFontSize(key)}>
                      <FontIcon iconName={iconProps.iconName} />
                    </label>
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
