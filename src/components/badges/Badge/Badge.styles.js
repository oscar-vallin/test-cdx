import styled from 'styled-components';

const getVariant = ({ colors }, variant) => {
  const Variants = {
    primary: { background: colors.themePrimary, color: colors.white },
    // light: { background: colors.themeLight, color: colors. },
    success: { background: colors.successBackground, color: colors.success },
    error: { background: colors.errorBackground, color: colors.error },
    severe: { background: colors.severeError, color: colors.white },
    warning: { background: colors.warningBackground, color: colors.warning },
    info: { background: colors.infoBackground, color: colors.info },
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


