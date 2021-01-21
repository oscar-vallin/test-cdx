import styled from 'styled-components';
import { Box } from '../../../components/layouts';

/* TODO: Migrate to theme - review lighter colors */
export const StyledBox = styled(Box)`
  background: ${({ theme }) => '#faf9f8'};
  padding: ${({ theme }) => `0  ${theme.spacing.double}  ${theme.spacing.triple}`};
`;