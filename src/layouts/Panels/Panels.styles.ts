import styled from 'styled-components';
import { Text } from 'src/components/typography/Text';
import { Panel } from '@fluentui/react';

export const PanelTitle = styled(Text)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 15px;
`;
export const PanelBody = styled.div`
  margin-top: 15px;
`;

export const PanelHeader = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: 'flex-start';
  align-items: 'flex-end';
  width: 100%;
`;

export const WizardBody = styled.div`
  margin-top: 1em;
  overflow: auto;
  margin-bottom: 1em;
  height: 28rem;
`;
export const WizardButtonRow = styled.div`
  button {
    margin-left: 10px;
  }
`;
export const ThemedPanel = styled(Panel)`
  .ms-Panel-main {
    background-color: ${({ theme }) => theme.colors.white};
    .ms-Panel-commands {
      z-index: 9999;
    }
    .ms-Panel-footer {
      border-top: ${({ theme }) => `1px solid ${theme.colors.neutralLight}`};
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
  .ms-Overlay {
    cursor: auto;
  }
`;
