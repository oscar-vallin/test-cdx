import styled from 'styled-components';
import { ColorPicker, ChoiceGroup, CommandBarButton } from '@fluentui/react';

export const StyledDiv = styled.div`
  align-items: flex-end;
  display: flex;
  width: 100%;
`;

export const StyledChoiceGroup = styled(ChoiceGroup)`
  .ms-ChoiceFieldGroup-flexContainer {
    align-items: flex-end;
    display: ${({ inline }) => (inline ? 'flex' : 'block')};

    .ms-ChoiceField {
      ${({ theme, inline }) =>
        inline
          ? `&:not(:last-child) {
              margin: 0 ${theme.spacing.normal} 0 0;
            }`
          : `margin: ${theme.spacing.small} 0 0;`}}
    }
  }
`;
0;
export const StyledColorPicker = styled(ColorPicker)`
  max-width: 100%;

  .ms-ColorPicker-panel {
    padding: 0;
  }
`;

export const StyledCommandButton = styled(CommandBarButton)`
  padding: 8px 16px;
`;

export const StyledPreview = styled.div`
  align-items: center;
  display: flex;
`;

export const StyledColorPreview = styled.div`
  background: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.colors.neutralQuaternary};
  height: 30px;
  margin: 0 15px;
  width: 30px;
`;
