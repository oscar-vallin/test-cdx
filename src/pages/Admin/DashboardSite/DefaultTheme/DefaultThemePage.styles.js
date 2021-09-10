import styled from 'styled-components';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Icon, ColorPicker } from '@fluentui/react';

import { Box as LayoutBox, Row } from '../../../../components/layouts';
import { Card } from '../../../../components/cards';

export const StyledBox = styled(LayoutBox)`
  padding: ${({ theme }) => `0 ${theme.spacing.double}`};
  transform: ${({ theme }) => `translateY(-${theme.spacing.triple})`};
`;

export const StyledRow = styled(Row)`
  align-items: stretch;
`;

export const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;

  .text {
    display: inline-block;
    margin: 0 ${({ theme }) => theme.spacing.normal} 0 0;
    white-space: nowrap;
    width: 120px;

    &--centered {
      margin-top: 7px;
    }
  }
`;

export const StyledCard = styled(Card)`
  height: 100%;
`;

export const StyledTitle = styled.h3`
  margin: ${({ theme }) => `0 0 ${theme.spacing.normal}`};
`;

export const StyledSubTitle = styled.p`
  color: ${({ theme }) => theme.colors.neutralSecondary};
  margin: ${({ theme }) => `0 0 ${theme.spacing.normal}`};
`;

export const StyledChoiceGroup = styled(ChoiceGroup)`
  .ms-ChoiceFieldGroup-flexContainer {
    align-items: flex-end;
    display: flex;

    .ms-ChoiceField {
      &:not(:last-child) {
        margin: 0 ${({ theme }) => theme.spacing.normal} 0 0;
      }
    }
  }
`;

export const StyledIcon = styled(Icon)`
  color: ${({ theme, iconName }) =>
    iconName === 'StatusCircleCheckmark' ? theme.colors.custom.success : theme.colors.custom.error};
`;

export const StyledColorPicker = styled(ColorPicker)`
  max-width: 100%;

  .ms-ColorPicker-panel {
    padding: 0;
  }
`;

export const StyledPreview = styled.div`
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
