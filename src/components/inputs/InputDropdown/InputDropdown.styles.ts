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