import React from "react";
import PropTypes from "prop-types";
// Components

import { InputText } from "../../../components/inputs/InputText";
import { Spinner } from "../../../components/spinners/Spinner";
// Hooks
import { useLogin } from "./MainMenu.services";
// Styles
import { StyledBox, StyledRow, StyledColumn, StyledTitle, StyledMenu, StyledButtonProfile } from "./MainMenu.styles";

// CardSection is called directly cause a restriction warning for that component.
const NavBar = ({ id = "__NavBar" }) => {
  const handlerLogin = useLogin();
  const { email, password } = handlerLogin;

  return (
    <StyledBox id={id} sm="12">
      <StyledRow id={`${id}__MainMenu--Row`}>
        <StyledColumn id={`${id}__MainMenu__Row-Column`}>
          <StyledMenuButton>Dashboard</StyledMenuButton>
        </StyledColumn>
        <StyledColumn id={`${id}__MainMenu__Row-Column`}>
          <StyledMenuButton>Dashboard</StyledMenuButton>
        </StyledColumn>
        <StyledColumn id={`${id}__MainMenu__Row-Column`}>
          <StyledMenuButton>Dashboard</StyledMenuButton>
        </StyledColumn>
        ;
      </StyledRow>
    </StyledBox>
  );
};

FormLogin.propTypes = {
  id: PropTypes.string,
};

export { FormLogin };
