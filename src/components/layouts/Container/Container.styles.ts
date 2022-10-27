import styled from 'styled-components';
import { Box } from '../Box';
import { device } from 'src/styles/GlobalStyles';

export const StyledBox = styled(Box)`
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 5px;
  margin: 0 auto;
  width: 100%;
  
  @media ${device.tablet} {
    padding: 0 20px;
  }
`;
