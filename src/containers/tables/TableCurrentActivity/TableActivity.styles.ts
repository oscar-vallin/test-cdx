import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow } from '../../../components/layouts';
import { Text } from '../../../components/typography';

export const Container = styled.div`
  width: 100%;
`;

export const TableContainer = styled.div`
  height: 70vh;
  margin-left: 2vw;
  margin-right: 2vw;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
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
  padding-left: 12px;
`;

export const EmptyMessage = styled(Text)`
  padding-left: 12px;
  padding-top: 20px;
  padding-bottom: 20px;
  color: ${({ theme }) => theme.colors.neutralTertiary};
`;

export const TableWrap = styled(LayoutRow)`
  margin-top: 15px;
`;
