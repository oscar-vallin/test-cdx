import styled from 'styled-components';

const variants = (theme) => ({
  muted: theme.colors.themeTertiary,
  error: theme.colors.custom.error,
});

export const StyledText = styled.span<StyledTextProps>`
  color: ${({ theme, variant }) => variants(theme)[variant] || theme.colors.neutralPrimary};
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

type StyledTextProps = {
  variant: string;
  center: string;
  right: boolean;
  size: string;
  transform: string;
  breakWord: string;
  top: string;
  bottom: string;
};
