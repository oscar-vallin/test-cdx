import React from "react";
import PropTypes from "prop-types";
import { getClassNames } from "../../../helpers/helperStyles";
import { DivStyled } from "./Row.styles";

const Row = ({ id = "__Row", variant = "normal", children, left, right, top, bottom, ...props }) => {
  return (
    <DivStyled
      id={id}
      variant={variant}
      className={getClassNames("ms-Grid-row", props)}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
    >
      {children}
    </DivStyled>
  );
};

Row.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
};

export { Row };
