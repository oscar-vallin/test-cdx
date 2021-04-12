import React from 'react';
import PropTypes from 'prop-types';

import { StyledContainer } from './HighlightCounter.styles';

const HighlightCounter = ({ id = '__HighLight', type, children }) => {
  return (
    <StyledContainer id={id} type={type}>
      {children}
    </StyledContainer>
  );
};

HighlightCounter.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string,
};

export { HighlightCounter };
