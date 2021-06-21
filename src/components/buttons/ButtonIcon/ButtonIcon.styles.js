import styled from 'styled-components';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Button } from '../Button';

export const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background: transparent;
  border: none;
`;

export const StyledFontIcon = styled(FontIcon)`
  font-size: ${({ size }) => (size ? `${size}px` : '1.25rem')};
`;
