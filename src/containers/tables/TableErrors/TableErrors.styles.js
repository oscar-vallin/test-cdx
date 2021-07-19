import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';

export const Container = styled(LayoutBox)`
  margin: 0 auto;
  width: 75%;
`;

export const Box = styled(LayoutBox)`
  align-items: flex-start;
  justify-content: flex-start;
  transform: translateY(-15px);
  width: 100%;
`;

export const FilterSection = styled(LayoutRow)`
  position: sticky;
  top: 30px;
  transform: translateY(-30px);
  z-index: 2;
`;

export const StyledRow = styled(LayoutRow)`
  padding: 15px;
`;

export const Column = styled(LayoutColumn)`
`;

export const RightColumn = styled(LayoutColumn)`
`;