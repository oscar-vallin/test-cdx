import React from 'react';
import PropTypes from 'prop-types';

import { StyledContainer, StyledLink } from './HighlightCounter.styles';

const HighlightCounter = ({ id = '__HighLight', type, href = '#', children }) => {
  return (
    <StyledContainer id={id} type={type}>
      <StyledLink href={href}>{children}</StyledLink>
    </StyledContainer>
  );
};

HighlightCounter.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string,
};

export { HighlightCounter };
