import styled from 'styled-components';
import { DetailsList } from '@fluentui/react';

export const ThemedDetailsList = styled(DetailsList)`
  background-color: ${({ theme }) => theme.colors.neutralLighter};
  color: ${({ theme }) => theme.colors.neutralPrimary};

  & .ms-DetailsHeader {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.neutralPrimary};
  }

  & .ms-DetailsHeader-cell {
    color: ${({ theme }) => theme.colors.neutralPrimary};
    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }

  & .ms-DetailsRow-fields {
    background-color: ${({ theme }) => theme.colors.white};
  }

  & .ms-DetailsRow-cell {
    color: ${({ theme }) => theme.colors.neutralPrimary};
  }
`;
