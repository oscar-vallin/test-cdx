import styled from 'styled-components';
import { device } from 'src/styles/GlobalStyles';

const variants = (theme) => ({
  muted: theme.colors.neutralTertiary,
  error: theme.colors.custom.error,
});

export const StyledText = styled.span<StyledTextProps>`
  color: ${({ theme, variant }) => variants(theme)[variant] || theme.colors.neutralPrimary};
  display: ${({ hideForMobile }) => hideForMobile ? 'none' : 'inline-block'};
  font: ${({ theme }) => theme.fontStyles.normal};
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  font-weight: ${({ theme, variant }) => theme.fontWeights[variant]};
  text-align: ${({ center, right }) => {
    if (center) return 'center';
    if (right) return 'end';

    return 'start';
  }};
  text-transform: ${({ transform }) => transform};
  overflow: ${({ ellipsis }) => ellipsis ? 'hidden' : 'visible'};
  text-overflow: ${({ ellipsis }) => ellipsis ? 'ellipsis' : 'clip'};
  word-break: ${({ breakWord }) => `break-${breakWord}`};
  width: ${({ center, right }) => (center || right ? '100%' : 'auto')};
  line-height: normal;
 
  @media ${device.tablet} {
    ${({ hideForMobile }) => hideForMobile ? 'display: inline-block;' : ''}
    ${({ showForMobile }) => showForMobile ? 'display: none;' : ''}
  }
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
  ellipsis: boolean;
  hideForMobile: boolean;
  showForMobile: boolean;
};
