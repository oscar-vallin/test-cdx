import { CommandBar } from '@fluentui/react';
import styled from 'styled-components';

export const ThemedCommandBar = styled(CommandBar)`
  .ms-CommandBar {
    background-color: ${({ theme }) => theme.colors.white};
    
    .ms-Button--commandBar {
      background-color: ${({ theme }) => theme.colors.white};
      
      .ms-Button-label {
        color: ${({ theme }) => theme.colors.neutralPrimary};
        
        &:hover {
          color: ${({ theme }) => theme.colors.themeDark};
        }
      }  
    }
  }
`;