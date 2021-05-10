import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledSpan,
} from './Badge.styles';

const CDXBadge = ({ id = '__CDXBadge', variant = "primary", pill, label, children }) => {
  return (
    <StyledSpan id={id} variant={variant} pill={pill}>
      {label || children}
    </StyledSpan>
  )
};

CDXBadge.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string,
};

export { CDXBadge };
