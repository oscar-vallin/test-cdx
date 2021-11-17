import { StyledLink } from './ButtonLink.styles';

const defaultProps = {
  id: '',
  // children: '',
  onClick: () => null,
  target: '_blank',
  rel: 'noopener',
};

type LinkProps = {
  id?: string;
  children?: any;
  href?: string;
  onClick?: any;
  target?: string;
  rel?: string;
};

const Link = ({ id, children, href, onClick, target, rel, ...props }: LinkProps) => {
  return (
    <StyledLink id={id} onClick={onClick} href={href} target={target} rel={rel} {...props}>
      {children}
    </StyledLink>
  );
};

Link.defaultProps = defaultProps;

export { Link };
