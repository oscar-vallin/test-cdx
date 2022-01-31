import styled from 'styled-components';
import { device } from 'src/styles/GlobalStyles';

export const SubTitle = styled.span`
  display: none;
  
  @media ${device.mobileL} {
    display: inline;
  }  
`;