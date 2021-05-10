import styled from 'styled-components';
import { ColorPicker, ChoiceGroup, CommandBarButton } from '@fluentui/react';

export const StyledDiv = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StyledChoiceGroup = styled(ChoiceGroup)`
  .ms-ChoiceFieldGroup-flexContainer {
    align-items: flex-end;
    display: flex;

    .ms-ChoiceField {
      &:not(:last-child) {
        margin: 0 ${({ theme }) => theme.spacing.normal} 0 0;
      }
    }
  }
`;

export const StyledColorPicker = styled(ColorPicker)`
  max-width: 100%;

  .ms-ColorPicker-panel {
    padding: 0;
  }
`;

export const StyledCommandButton = styled(CommandBarButton)`
  padding: 8px 16px;
`;
