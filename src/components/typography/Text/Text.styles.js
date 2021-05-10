import styled from 'styled-components';

export const StyledText = styled.span`
  color: ${({ theme, variant }) => (variant === 'muted') ? theme.colors.themeTertiary : theme.colors.black };
  display: inline-block;
  font: ${({ theme }) => theme.fontStyles.normal};
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  font-weight: ${({ theme, variant }) => (variant === 'bold') ? theme.fontWeights.bold : theme.fontWeights.normal };
  text-align: ${({ center, right }) => (center ? 'center' : right ? 'end' : 'start')};
  text-transform: ${({ transform }) => transform};
  word-break: ${({ breakWord }) => `break-${breakWord}`};
  width: ${({ center, right }) => (center || right) ? '100%' : 'auto'};
`;
