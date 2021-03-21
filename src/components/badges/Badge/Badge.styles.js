import styled from 'styled-components';

const getVariant = (theme, variant) => {
  const Variants = {
    primary: { background: theme.colors.themePrimary, color: theme.colors.white },
    // light: { background: theme.colors.themeLight, color: theme.colors. },
    success: { background: theme.colors.successBackground, color: theme.colors.success },
    error: { background: theme.colors.errorBackground, color: theme.colors.error },
    severe: { background: theme.colors.severeError, color: theme.colors.white },
    warning: { background: theme.colors.warningBackground, color: theme.colors.warning },
    info: { background: theme.colors.infoBackground, color: theme.colors.info },
  };

  return Variants[variant];
}

export const StyledSpan = styled.span`
  align-items: center;
  background: ${({ theme, variant }) => getVariant(theme, variant).background};
  border-radius: ${({ theme }) => theme.radius.large};
  color: ${({ theme, variant }) => getVariant(theme, variant).color};
  display: flex;
  font-size: ${({ theme, pill }) => pill ? theme.fontSizes.small : '12px'};
  font-weight: ${({ theme, pill }) => pill
    ? theme.fontWeights.normal
    : theme.fontWeights.bold};
  justify-content: center;
  padding: ${({ theme, pill }) => pill
    ? `${theme.radius.normal} ${theme.radius.medium}`
    : `${theme.radius.normal} 6px`};
  white-space: nowrap;
`;


