import React from 'react';
import PropTypes from 'prop-types';
import { ProfileMenu } from '../../menus/ProfileMenu';
// Components
import { MainMenu } from '../../menus/MainMenu';
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
  onUserSettings
}) => {
  const [collapse, setCollapse] = React.useState('false');

  const changeCollapse = () => {
    setCollapse(!collapse);
  };
  const renderIcon = (iconName) => {
    return (
      <StyledColumn id={`${id}__Right__${iconName}`} noStyle>
        <StyledButtonIcon icon={iconName} variant={'navbar'} size={18} />
      </StyledColumn>
    );
  };

  // Render
  return (
    <StyledBox id={id}>
      <StyledRow id={`${id}__Nav`} left>
        <StyledColumnCont id={`${id}__Col-Left`} sm={9} left container>
          <StyledRow id={`${id}__Left-Row`} left sm={12}>
            <StyledColumnLogoL id={`${id}__Left-Row__Logo`} sm={2} noPadding>
              <StyledTitle>CDX DASHBOARD</StyledTitle>
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
            {renderIcon('Settings')}
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
