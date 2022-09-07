import styled from 'styled-components';
import { Box } from 'src/components/layouts';

export const StyledBox = styled(Box)<StyledBoxProps>`
  padding: ${({ theme, spacing }) => `0  ${spacing !== undefined ? spacing : theme.spacing.double}  ${theme.spacing.triple}`};
`;

type StyledBoxProps = {
  spacing?: string;
};
