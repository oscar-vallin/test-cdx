import styled from 'styled-components';
import { DefaultButton, IContextualMenuItem } from '@fluentui/react';

export const StyledButton = styled(DefaultButton)<StyledButtonProps>`
  background: transparent;
  border: none;
  width: auto;
  padding: 0;
`;

type StyledButtonProps = {
  items: IContextualMenuItem[];
  menuProps: any;
};
