import styled from 'styled-components';

export const StyledText = styled.span`
  color: ${({ theme, variant }) => (variant === 'muted' ? theme.colors.themeTertiary : theme.colors.neutralPrimary)};
  display: inline-block;
  font: ${({ theme }) => theme.fontStyles.normal};
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  font-weight: ${({ theme, variant }) => theme.fontWeights[variant]};
  text-align: ${({ center, right }) => {
    if (center) return 'center';
    if (right) return 'end';

    return 'start';
  }};
  text-transform: ${({ transform }) => transform};
  word-break: ${({ breakWord }) => `break-${breakWord}`};
  width: ${({ center, right }) => (center || right ? '100%' : 'auto')};
`;
