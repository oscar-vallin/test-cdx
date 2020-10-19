import React from 'react';
import PropTypes from 'prop-types';
// Components

// Hooks
// import { useNavBar } from "./NavBar.services";
// Styles
import { StyledBox, StyledRow, StyledColumn, StyledTitle, StyledMenu, StyledButtonProfile } from './NavBar.styles';

// CardSection is called directly cause a restriction warning for that component.
const NavBar = ({ id = '__NavBar' }) => {
  // const handlerNavBar = useNavBar();

  return (
    <StyledBox id={id} sm="12">
      <StyledRow id={`${id}__Card--Row`}>
        <StyledColumn id={`${id}__Card__Row-Column`}>
          <StyledTitle>CDX DASHBOARD</StyledTitle>
        </StyledColumn>
        <StyledColumn id={`${id}__Card__Row-Column`}>
          <StyledMenu />
        </StyledColumn>
        <StyledColumn id={`${id}__Card__Row-Column`}>
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
