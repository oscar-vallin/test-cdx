import React from 'react';
import PropTypes from 'prop-types';
import { StyledSeparator } from "./Separator.styles";

const CDXSeparator = ({ id = '__CDXSeparator' }) => {
  return <StyledSeparator id={id} />
};

CDXSeparator.propTypes = {
  id: PropTypes.string,
};

export { CDXSeparator };
