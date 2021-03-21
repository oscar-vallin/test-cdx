import styled from 'styled-components';
import { Box } from '../../components/layouts/Box';

export const BoxStyled = styled(Box)`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  width: 100vw;
  min-height: 100vh;
`;
