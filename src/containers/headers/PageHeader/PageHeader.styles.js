import styled from 'styled-components';
import { Box } from '../../../components/layouts';

export const StyledBox = styled(Box)`
  background: ${({ theme }) => theme.colors.neutralLighterAlt};
  padding: ${({ theme }) => `0  ${theme.spacing.double}  ${theme.spacing.triple}`};
`;