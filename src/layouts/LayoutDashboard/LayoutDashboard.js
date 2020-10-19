import React from "react";
import PropTypes from "prop-types";
import { NavBar } from "../../containers/bars/NavBar";
import { BoxStyled } from "./LayoutDashboard.styles";

const LayoutDashboard = ({ id = "LayoutDashboard", children }) => {
  return (
    <BoxStyled id={id}>
      <NavBar />
      {children}
    </BoxStyled>
  );
};

LayoutDashboard.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
};

export { LayoutDashboard };
