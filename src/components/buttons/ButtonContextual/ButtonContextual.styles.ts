import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib-commonjs/Button';

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
