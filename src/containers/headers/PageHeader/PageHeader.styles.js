import styled from 'styled-components';
import { Box } from '../../../components/layouts';

export const StyledBox = styled(Box)`
  background: ${({ theme }) => theme.colors.neutralLighterAlt};
  padding: ${({ theme, spacing }) => `0  ${spacing !== undefined ? spacing : theme.spacing.double}  ${theme.spacing.triple}`};
`;
