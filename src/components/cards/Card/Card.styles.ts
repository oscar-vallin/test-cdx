import styled from 'styled-components';
import { DocumentCard } from '@fluentui/react';

export const CardStyled = styled(DocumentCard)<CardStyledProps>`
  background: ${({ theme }) => theme.colors.neutralLighter};
  box-shadow: ${({ theme, elevation }) => theme.boxShadows[elevation]};
  border: none;
  border-radius: ${({ theme }) => theme.radius.normal};
  font: ${({ theme }) => theme.fontStyles.normal};
  min-width: unset;
  max-width: unset;
  padding: ${({ theme, spacing }) => theme.spacing[spacing]};
  width: 100%;

  &:hover {
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
  }

  .ms-DocumentCard {
    &:hover {
      &::after {
        border: none;
      }
    }
  }
`;

type CardStyledProps = {
  elevation: string;
  spacing: string;
};
