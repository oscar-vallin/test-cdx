import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { Text } from '../../../components/typography/Text';

export const Container = styled.div`
  width: 100%;
`;

export const TableContainer = styled.div`
  height: 70vh;
  margin: 2vw;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledBox = styled(LayoutBox)`
  width: 100%;
`;

type StyledTableProps = {
  color: string;
};

export const TableName = styled(Text)<StyledTableProps>`
  text-transform: uppercase;
  color: ${({ color }) => {
    switch (color) {
      case 'complete':
        return '#3CC918';

      case 'error':
        return '#C32B2B';

      default:
        return '#0078D4';
    }
  }};
`;

export const Row = styled(LayoutRow)`
  width: 100%;
  margin: 25px 10px;
`;

export const Column = styled(LayoutColumn)`
  width: 35%;
  max-width: 300px;
`;

export const RightColumn = styled(LayoutColumn)`
  width: 35%;
`;
