import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ProfileMenu } from '../../menus/ProfileMenu';
// Components
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';
import { MainMenu } from '../../menus/MainMenu';
import { IconButton } from '@fluentui/react/lib/Button';
import { useCurrentUserTheme } from '../../../hooks/useCurrentUserTheme';
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
  // StyledButtonProfile,
  StyledButtonIcon,
} from './NavBar.styles';

// CardSection is called directly cause a restriction warning for that component.
const NavBar = ({
  id = '__NavBar',
  menuOptionSelected = 'dashboard',
  onUserSettings,
  ...props
}) => {
  const [collapse, setCollapse] = React.useState('false');
  const { userTheme, createOrUpdateTheme, isLoadingTheme, isHandlingTheme } = useCurrentUserTheme();
  const { isAuthenticated } = useAuthContext();

  const changeCollapse = () => {
    setCollapse(!collapse);
  };

  const [themeFontSize, setThemeFontSize] = useState(userTheme?.data?.themeFontSize || null);

  const renderIcon = (iconName) => {
    return (
      <StyledColumn id={`${id}__Right__${iconName}`} noStyle>
        <StyledButtonIcon icon={iconName} variant={'navbar'} size={18} />
      </StyledColumn>
    );
  };

  const updateThemeFontSize = (event, { key }) => {
    setThemeFontSize(key);
  };

  useEffect(() => {
    if (themeFontSize && isAuthenticated) {
      createOrUpdateTheme({ ...userTheme.data, themeFontSize });
    }
  }, [themeFontSize, userTheme, isAuthenticated]);

  const settingsMenu = {
    shouldFocusOnMount: true,
    items: [
      {
        key: 'Actions',
        itemType: ContextualMenuItemType.Header,
        text: 'Actions',
      },
      {
        key: 'SMALL',
        iconProps: { iconName: 'FontDecrease' },
        text: 'Small',
        onClick: updateThemeFontSize,
      },
      {
        key: 'MEDIUM',
        iconProps: { iconName: 'FontColorA' },
        text: 'Medium (default)',
        onClick: updateThemeFontSize,
      },
      {
        key: 'LARGE',
        iconProps: { iconName: 'FontIncrease' },
        text: 'Large',
        onClick: updateThemeFontSize,
      },
    ],
  };

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
            <IconButton
              menuProps={settingsMenu}
              iconProps={{ iconName: 'Settings' }}
            />

            {renderIcon('Help')}
            <ProfileMenu onUserSettings={onUserSettings}/>
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
