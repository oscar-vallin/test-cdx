import React from "react";
import { PropTypes } from "prop-types";
import { CardSection } from "@uifabric/react-cards";
//
import { getClassNames } from "../../../helpers/helperStyles";
import { CardStyled, Stylesheet } from "./Card.styles";

const Card = ({ id = "__Card", children, variant = "normal", ...props }) => {
  return (
    <CardStyled id={id} variant={variant} className={getClassNames(null, props)} horizontal>
      <CardSection id={`${id}__Card-CardSection`} style={Stylesheet.CardSection}>
        {children}
      </CardSection>
    </CardStyled>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.string,
  children: PropTypes.node,
};

export { Card };
