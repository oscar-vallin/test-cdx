import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../layouts';
import { device } from 'src/styles/GlobalStyles';

export const Box = styled(LayoutBox)`
  width: 100%;
`;

export const Row = styled(LayoutRow)`
  flex-wrap: nowrap;
  width: 100%;
  margin: 0;

  .ms-DatePicker {
    width: 100%;
  }
`;

export const LeftColumn = styled(LayoutColumn)`
  padding: 0 5px 0 0;
  
  @media ${device.tablet} {
    padding: 0 8px 0 0;   
  }  
`;

export const RightColumn = styled(LayoutColumn)`
  padding: 0 0 0 5px;
  
  @media ${device.tablet} {
    padding: 0 0 0 8px;
  }
`;
