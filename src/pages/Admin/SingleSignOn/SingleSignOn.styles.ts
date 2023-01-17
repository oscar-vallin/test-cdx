import styled from 'styled-components';
import AceEditor from 'react-ace';

export const CodeMirrorRequired = styled.samp`
    color: #a4262c;
    font-size: 0.865rem;
    vertical-align: text-top;
    font-weight: 600;
`;

export const StyledAceEditor = styled(AceEditor)`
  border: 1px solid black;
`;
