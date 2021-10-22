import { ReactElement } from 'react';

import { StyledContainer, StyledLink } from './HighlightCounter.styles';

const defaultProps = {
  id: '',
  href: '#',
};

type HighlightCounterProps = {
  id: string;
  type: number | null;
  href?: string;
  theme?: object;
  children?: ReactElement | any;
} & typeof defaultProps;

const HighlightCounter = ({ id, type, href = '#', children, ...props }: HighlightCounterProps): ReactElement => {
  return (
    <StyledContainer id={id} type={type} {...props}>
      <StyledLink to={href} {...props}>
        {children}
      </StyledLink>
    </StyledContainer>
  );
};

HighlightCounter.defaultProps = defaultProps;

export { HighlightCounter };
