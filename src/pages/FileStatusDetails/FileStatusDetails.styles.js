import styled from 'styled-components';
import { Box as LayoutBox } from '../../components/layouts';

export const StyledBox = styled(LayoutBox)`
  padding: ${({ theme }) => `0 ${theme.spacing.double}`};
  transform: ${({ theme }) => `translateY(-${theme.spacing.triple})`};
`;