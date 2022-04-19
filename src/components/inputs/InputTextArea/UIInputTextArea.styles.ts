import styled from 'styled-components';

export const StyledRichTextArea = styled.div`
    .ql-toolbar.ql-snow {
        border: none;
        border-bottom: 1px solid #ccc;
    }
    .ql-container.ql-snow {
        border: none;
    }
    height:  ${({ theme }) => `${theme.space[8]}`};
`;