import React from 'react';
import PropTypes from 'prop-types';
import { StyledLink } from './ButtonLink.styles';

const Link = ({ id = '__Link', children, href, onClick, url = '#', target = '_blank', rel = 'noopener', ...props }) => {
  return (
    <StyledLink onClick={onClick} href={href} target="_blank" rel="noopener" {...props}>
      {children}
    </StyledLink>
  );
};

Link.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  url: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
};

export { Link };
