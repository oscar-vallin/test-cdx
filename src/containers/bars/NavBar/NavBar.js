import React from 'react';
import PropTypes from 'prop-types';
// import { ProfileMenu } from '../ProfileMenu';
// Components
import { MainMenu } from '../MainMenu';
// Hooks
// import { useNavBar } from "./NavBar.services";
// Styles
import {
  StyledBox,
  StyledRow,
  StyledColumn,
  StyledTitle,
  // StyledButtonProfile,
  StyledButtonIcon,
} from './NavBar.styles';

// CardSection is called directly cause a restriction warning for that component.
const NavBar = ({ id = '__NavBar' }) => {
  const renderIcon = (iconName) => {
    return (
      <StyledColumn id={`${id}__Right__${iconName}`} noStyle>
        <StyledButtonIcon icon={iconName} size={18} />
      </StyledColumn>
    );
  };

  // Render
  return (
    <StyledBox id={id} sm="12">
      <StyledRow id={`${id}__Nav`} left>
        <StyledColumn id={`${id}__Col-Left`} sm={10} left>
          <StyledRow id={`${id}__Left-Row`} left sm={12}>
            <StyledColumn id={`${id}__Left-Row__Logo`} sm={2} left noPadding>
              <StyledTitle>CDX DASHBOARD</StyledTitle>
            </StyledColumn>
            <StyledColumn id={`${id}__Left-Row__Menu`}>
              <MainMenu left />
            </StyledColumn>
          </StyledRow>
        </StyledColumn>
        <StyledColumn id={`${id}__Col-Right`} sm={2} right>
          <StyledRow id={`${id}__Right_Row`} right>
            {renderIcon('Settings')}
            {renderIcon('Help')}
          </StyledRow>
        </StyledColumn>
      </StyledRow>
    </StyledBox>
  );
};

NavBar.propTypes = {
  id: PropTypes.string,
};

export { NavBar };
