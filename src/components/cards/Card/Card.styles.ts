import styled from 'styled-components';
import { DocumentCard } from '@fluentui/react';
import { device } from 'src/styles/GlobalStyles';

export const CardStyled = styled(DocumentCard)<CardStyledProps>`
  background: ${({ theme }) => theme.colors.neutralLighter};
  box-shadow: ${({ theme, elevation }) => theme.boxShadows[elevation]};
  border: none;
  border-radius: ${({ theme }) => theme.radius.normal};
  font: ${({ theme }) => theme.fontStyles.normal};
  min-width: unset;
  max-width: unset;
  padding: 5px;
  width: 100%;

  &:hover {
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
  }
  
  @media ${device.tablet} {
    padding: ${({ theme, spacing }) => theme.spacing[spacing]};    
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
