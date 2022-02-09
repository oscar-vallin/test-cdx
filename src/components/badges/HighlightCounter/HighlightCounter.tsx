import { ReactElement } from 'react';

import { HighlightBubble, StyledLink } from './HighlightCounter.styles';
import { ErrorSeverity, Maybe } from 'src/data/services/graphql';

type HighlightCounterProps = {
  id: string;
  type: number | Maybe<ErrorSeverity> | undefined;
  href?: string;
  theme?: object;
  children?: ReactElement | any;
};

const HighlightCounter = ({ id, type, href, children, ...props }: HighlightCounterProps): ReactElement => {
  if (href) {
    return (
      <HighlightBubble id={id} type={type} {...props}>
        <StyledLink to={href} {...props}>
          {children}
        </StyledLink>
      </HighlightBubble>
    );
  } else {
    return (
      <HighlightBubble id={id} type={type} {...props}>
        {children}
      </HighlightBubble>
    );
  }
};

export { HighlightCounter };
