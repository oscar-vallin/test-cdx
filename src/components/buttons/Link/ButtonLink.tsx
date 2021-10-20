import PropTypes from 'prop-types';
import { StyledLink } from './ButtonLink.styles';

const Link = ({ id, children, href, onClick, target = '_blank', rel = 'noopener', ...props }) => {
  return (
    <StyledLink id={id} onClick={onClick} href={href} target={target} rel={rel} {...props}>
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
