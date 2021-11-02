import styled from 'styled-components';
import { ActionButton } from '@fluentui/react';

export const StyledButtonAction = styled(ActionButton)<StyledButtonActionProps>`
  color: ${({ theme }) => {
    return theme.colors.themePrimary;
  }};
`;

type StyledButtonActionProps = {
  iconProps: any;
};
