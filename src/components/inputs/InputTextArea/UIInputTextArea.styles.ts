import styled from 'styled-components';
import { TextField } from '@fluentui/react';

export const QuillWrapper = styled.div`
  .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid #ccc;
    
    .ql-header {
      color: ${({ theme }) => theme.colors.neutralSecondary};
      .ql-stroke {
        stroke: ${({ theme }) => theme.colors.neutralSecondary};
      }
    }
    .ql-formats {
      .ql-stroke,
      .ql-fill {
        stroke: ${({ theme }) => theme.colors.neutralSecondary};
      }     
    }
  }
  .ql-container.ql-snow {
    border: none;
  }
  .ql-editor {
    height: 210px;
  }
  border: .5px solid ${({ theme }) => theme.colors.neutralSecondary};
  width: 100%;
`;

export const ThemedTextField = styled(TextField)`
  .ms-TextField-fieldGroup {
    background-color: ${({ theme }) => theme.colors.white};
    
    textarea {
      color: ${({ theme }) => theme.colors.neutralSecondary};
    }
  }
`;

export const ReadOnlyTextArea = styled.pre`
  border: 1px solid ${({ theme }) => theme.colors.neutralTertiaryAlt};
  padding: 10px;
  width: 100%;
  min-height: 8em;
  font: ${({ theme }) => theme.fontStyles.normal};
  overflow: auto;
`;
