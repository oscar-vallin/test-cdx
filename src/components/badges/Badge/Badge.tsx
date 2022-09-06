import { ReactElement } from 'react';
import { StyledSpan } from './Badge.styles';

const defaultProps = {
  id: '',
  variant: 'primary',
  pill: false,
};

type CDXBadgeProps = {
  id?: string;
  variant?: string;
  pill?: boolean;
  label?: string;
  children?: ReactElement | string;
} & typeof defaultProps;

const CDXBadge = ({
  id, variant = 'primary', pill, label, children,
}: CDXBadgeProps): ReactElement => (
  <StyledSpan id={id} variant={variant} pill={pill} className="cdx-badge">
    {label || children}
  </StyledSpan>
);

CDXBadge.defaultProps = defaultProps;

export { CDXBadge };
