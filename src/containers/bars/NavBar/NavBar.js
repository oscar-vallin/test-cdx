import React from 'react';
import PropTypes from 'prop-types';
// Components
import { MainMenu } from '../MainMenu';
// Hooks
// import { useNavBar } from "./NavBar.services";
// Styles
import { StyledBox, StyledRow, StyledColumn, StyledTitle, StyledMenu, StyledButtonProfile } from './NavBar.styles';

// CardSection is called directly cause a restriction warning for that component.
const NavBar = ({ id = '__NavBar' }) => {
  // const handlerNavBar = useNavBar();

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

        <StyledColumn id={`${id}__Card__Row-Column`} sm={2} right>
          <StyledButtonProfile>CDX DASHBOARD</StyledButtonProfile>
        </StyledColumn>
      </StyledRow>
    </StyledBox>
  );
};

NavBar.propTypes = {
  id: PropTypes.string,
};

export { NavBar };
