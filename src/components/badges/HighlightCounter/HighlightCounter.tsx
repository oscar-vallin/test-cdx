import { ReactElement } from 'react';

import { StyledContainer, StyledLink } from './HighlightCounter.styles';

const HighlightCounter = ({ id, type, href = '#', children, ...props }: HighlightCounterProps): ReactElement => {
  return (
    <StyledContainer id={id} type={type} {...props}>
      <StyledLink to={href} {...props}>
        {children}
      </StyledLink>
    </StyledContainer>
  );
};

type HighlightCounterProps = {
  id: string;
  type: number | null;
  href?: string;
  theme?: object;
  children?: ReactElement | any;
};

export { HighlightCounter };
