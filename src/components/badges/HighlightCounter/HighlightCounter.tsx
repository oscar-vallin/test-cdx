import PropTypes from 'prop-types';

import { StyledContainer, StyledLink } from './HighlightCounter.styles';

const HighlightCounter = ({ id, type, href = '#', children, ...props }) => {
  return (
    <StyledContainer id={id} type={type} {...props}>
      <StyledLink to={href} {...props}>
        {children}
      </StyledLink>
    </StyledContainer>
  );
};

HighlightCounter.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string,
};

export { HighlightCounter };
