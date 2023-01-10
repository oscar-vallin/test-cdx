import styled from 'styled-components';
import Editor from '@monaco-editor/react';

export const CodeMirrorRequired = styled.samp`
    color: #a4262c;
    font-size: 0.865rem;
    vertical-align: text-top;
    font-weight: 600;
`;

export const EditorField = styled(Editor)`
  border: 1px solid black;

  .editor-scrollable {
    position: fixed;
  }
`;
