import styled from 'styled-components';
import { DefaultButton, IContextualMenuItem } from '@fluentui/react';

export const StyledButton = styled(DefaultButton)<StyledButtonProps>`
  background: transparent;
  border: none;
  width: auto;
  height: 100%;
  padding: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

type StyledButtonProps = {
  items: IContextualMenuItem[];
  menuProps: any;
};
