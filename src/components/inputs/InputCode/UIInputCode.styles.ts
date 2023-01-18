import styled from 'styled-components';
import { TextField } from '@fluentui/react';

export const CodeEditor = styled(TextField)`
  width: 100%;
  
  & textarea {
    white-space: nowrap;
  }
`

export const ReadOnlyWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutralSecondary};
  width: 100%;
  overflow: auto;    
  height: 50px;
`;
