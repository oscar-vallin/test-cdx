import styled from 'styled-components';
import { ChoiceGroup } from '@fluentui/react';

import { Row } from 'src/components/layouts';
import { Card } from 'src/components/cards';

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

export const StyledChoiceGroup = styled(ChoiceGroup)`
  .ms-ChoiceFieldGroup-flexContainer {
    align-items: flex-end;
    display: flex;

    .ms-ChoiceField {
      &:not(:last-child) {
        margin: 0 ${({ theme }) => theme.spacing.normal} 0 0;
      }
      color: ${({ theme }) => theme.colors.neutralPrimary};

      & label:hover .ms-ChoiceFieldLabel {
        color: ${({ theme }) => theme.colors.themePrimary} !important;
      }
    }
  }
`;
