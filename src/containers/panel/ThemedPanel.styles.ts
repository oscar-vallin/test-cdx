import { Panel } from '@fluentui/react';
import styled from 'styled-components';

export const ThemedPanel = styled(Panel)`
  .ms-Panel-main {
    background-color: ${({ theme }) => theme.colors.white};  
    .ms-Panel-commands {
      z-index: 9999; 
    }
  }  
`;