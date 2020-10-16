import React from "react";
import PropTypes from "prop-types";
import { getClassNames } from "../../../helpers/helperStyles";
import { DivStyled } from "./Column.styles";

const Column = ({ id = "__Column", variant = "normal", children, left, right, top, bottom, ...props }) => {
  return (
    <DivStyled
      id={id}
      variant={variant}
      className={getClassNames("ms-Grid-col", props)}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
    >
      {children}
    </DivStyled>
  );
};

Column.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
};

export { Column };
