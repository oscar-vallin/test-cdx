import { ComboBox } from '@fluentui/react';
import styled from 'styled-components';

export const ThemedComboBox = styled(ComboBox)`
  .ms-ComboBox {
    background-color: ${({ theme }) => theme.colors.white};

    input {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.neutralSecondary};
    }
  }
`;

export const ThemedFlatComboBox = styled(ComboBox)`
  .ms-ComboBox {
    background-color: ${({ theme }) => theme.colors.white};

    input {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.black};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    }

    &::after {
      border: 2px solid transparent;
      border-bottom-color: ${({ theme }) => theme.colors.themePrimary} 
    }
  }
  .ms-Icon {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;
