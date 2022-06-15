import { SearchBox } from '@fluentui/react';
import styled from 'styled-components';

export const ThemedSearchBox = styled(SearchBox)`
  background-color: ${({ theme }) => theme.colors.white};
  
  input {
    color: ${({ theme }) => theme.colors.neutralSecondary} !important;
    background: none !important;
  }
`;