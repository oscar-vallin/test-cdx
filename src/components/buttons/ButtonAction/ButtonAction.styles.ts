import styled from 'styled-components';
import { ActionButton } from '@fluentui/react';

export const StyledButtonAction = styled(ActionButton)<StyledButtonActionProps>`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  color: ${({ theme }) => theme.colors.themePrimary};

  &:hover {
    color: ${({ theme }) => theme.colors.themeDarker};
  }
`;

type StyledButtonActionProps = {
  iconProps: any;
};
