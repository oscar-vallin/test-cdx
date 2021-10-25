import { StyledLink } from './ButtonLink.styles';

const defaultProps = {
  id: '',
  // children: '',
  href: '',
  onClick: () => null,
  target: '_blank',
  rel: 'noopener',
};

type LinkProps = {
  id?: string;
  children?: any;
  href?: string;
  onClick?: () => null;
  target?: string;
  rel?: string;
} & typeof defaultProps;

const Link = ({ id, children, href, onClick, target = '_blank', rel = 'noopener', ...props }: LinkProps) => {
  return (
    <StyledLink id={id} onClick={onClick} href={href} target={target} rel={rel} {...props}>
      {children}
    </StyledLink>
  );
};

export { Link };
