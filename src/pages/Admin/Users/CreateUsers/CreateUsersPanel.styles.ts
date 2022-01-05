import styled from 'styled-components';
import { CommandBarButton } from '@fluentui/react';
import { Text } from 'src/components/typography';
import { Column, Row } from '../../../../components/layouts';

export const StyledCommandButton = styled(CommandBarButton)`
  background: transparent;
  padding: 8px 16px;
`;

export const StyledColumn = styled(Column)`
  .ms-Viewport {
    width: 100%;
  }

  [class*='ms-Details'] {
    background: transparent;
  }
`;

export const StyledOptionRow = styled(Row)`
  padding: 8px 16px;
`;

export const StyledText = styled(Text)`
  padding: 0px 8px 24px;
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
