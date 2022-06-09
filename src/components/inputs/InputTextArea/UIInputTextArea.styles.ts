import styled from 'styled-components';

export const QuillWrapper = styled.div`
  .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid #ccc;
  }
  .ql-container.ql-snow {
    border: none;
  }
  .ql-editor {
    height: 210px;
  }
  border: 1px solid ${({ theme }) => theme.colors.neutralPrimary};
  height: ${({ theme }) => `${theme.space[8]}`};
  width: 100%;
`;

export const ReadOnlyTextArea = styled.pre`
  border: 1px solid ${({ theme }) => theme.colors.neutralTertiaryAlt};
  padding: 10px;
  width: 100%;
  min-height: 8em;
  font: ${({ theme }) => theme.fontStyles.normal};
  overflow: auto;
`;