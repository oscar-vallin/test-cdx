import { ReactElement } from 'react';
import { StyledSpan } from './Badge.styles';

const CDXBadge = ({ id, variant = 'primary', pill, label, children }: CDXBadgeProps): ReactElement => {
  return (
    <StyledSpan id={id} variant={variant} pill={pill}>
      {label || children}
    </StyledSpan>
  );
};

type CDXBadgeProps = {
  id: string;
  variant: string;
  pill: boolean;
  label?: string;
  children?: ReactElement | string;
};

export { CDXBadge };
