import styled from 'styled-components';
import { Text } from 'src/components/typography/Text';

export const PanelTitle = styled(Text)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 15px;
`
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
  height: 28em;
`;
export const WizardButtonRow = styled.div`
  button {
    margin-left: 10px;
  }
`;