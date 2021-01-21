import React from "react";
import PropTypes from "prop-types";
import { StyledDiv } from "./Spacing.styles";

const CDXSpacing = ({
  id = "__CDXSpacing",
  children,
  margin = {},
  padding = {},
  block,
  ...props
}) => {
  return (
    <StyledDiv
      id={`${id}-CDXSpacing`}
      margin={margin}
      padding={padding}
      block={block}
      {...props}
    >
      {children}
    </StyledDiv>
  );
};

CDXSpacing.propTypes = {
  margin: PropTypes.string,
  padding: PropTypes.string,
};

export { CDXSpacing };
