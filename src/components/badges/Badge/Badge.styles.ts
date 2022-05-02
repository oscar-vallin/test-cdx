import styled from 'styled-components';

const getVariant = (theme, variant) => {
  const Variants = {
    primary: { background: theme.colors.themePrimary, color: theme.colors.white },
    success: { background: theme.colors.custom.successAlt, color: theme.colors.custom.success },
    error: { background: theme.colors.custom.errorAlt, color: theme.colors.custom.error },
    severe: { background: theme.colors.severeError, color: theme.colors.white },
    warning: { background: theme.colors.custom.warningAlt, color: theme.colors.custom.warning },
    info: { background: theme.colors.custom.infoAlt, color: theme.colors.custom.info },
  };

  return Variants[variant];
};

export const StyledSpan = styled.span<StyledSpanProps>`
  align-items: center;
  background: ${({ theme, variant }) => getVariant(theme, variant).background};
  border-radius: ${({ theme }) => theme.radius.large};
  color: ${({ theme, variant }) => getVariant(theme, variant).color};
  display: inline-flex;
  font-size: ${({ theme, pill }) => (pill ? theme.fontSizes.small : '0.75rem')};
  font-weight: ${({ theme, pill }) => (pill ? theme.fontWeights.normal : theme.fontWeights.bold)};
  justify-content: center;
  padding: 5px 7px;
  white-space: nowrap;
`;

type StyledSpanProps = {
  variant: string;
  pill: boolean;
};
