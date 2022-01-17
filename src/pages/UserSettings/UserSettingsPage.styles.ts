import styled from 'styled-components';
import { Icon, ColorPicker } from '@fluentui/react';
import { Box as LayoutBox } from 'src/components/layouts';

export const StyledBox = styled(LayoutBox)`
  padding: ${({ theme }) => `0 ${theme.spacing.double}`};
  transform: none;
`;

export const StyledIcon = styled(Icon)`
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme, iconName }) =>
    iconName === 'StatusCircleCheckmark' ? theme.colors.custom.success : theme.colors.custom.error};
`;

export const StyledColorPicker = styled(ColorPicker)`
  max-width: 100%;

  .ms-ColorPicker-panel {
    padding: 0;
  }
`;

export const StyledPreview = styled.div<StyledPreviewProps>`
  border: 1px solid ${({ theme }) => theme.colors.neutralTertiary};
  margin: ${({ theme }) => theme.spacing.normal} 0;

  .preview__header {
    background: ${({ colors }) => colors.themePrimary};
    color: #fff;
    font-weight: 700;
    padding: 10px;
  }

  .preview__body {
    .Card {
      background: ${({ colors }) => colors.themePrimary};
    }
  }
`;

export const CompositeRulesSeparator = styled.div`
  font-weight: 500;
`;

type StyledPreviewProps = {
  colors?: any;
};
