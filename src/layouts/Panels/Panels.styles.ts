import styled from 'styled-components';
import { Text } from 'src/components/typography/Text';

export const PanelHeader = styled(Text)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 30px;
`
export const PanelBody = styled.div`
  margin-top: 15px;
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