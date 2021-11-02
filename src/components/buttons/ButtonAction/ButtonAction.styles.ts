import styled from 'styled-components';
import { ActionButton } from '@fluentui/react';

export const StyledButtonAction = styled(ActionButton)<StyledButtonActionProps>`
  color: ${({ theme }) => {
    console.log('theme.colors.themePrimary: ', theme.colors.themePrimary);
    return theme.colors.themePrimary;
  }};
`;

type StyledButtonActionProps = {
  iconProps: any;
};
