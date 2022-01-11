import styled from 'styled-components';
import { DefaultButton } from '@fluentui/react';

export const StyledButton = styled(DefaultButton)<StyledButtonProps>`
  background: transparent;
  border: none;
  width: auto;
  padding: 0;
`;

type StyledButtonProps = {
  items: { id?: string; key: string; text: string; onClick: () => void }[];
  menuProps: any;
};
