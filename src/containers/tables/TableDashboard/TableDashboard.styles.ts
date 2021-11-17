import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { Table } from '../../../components/tables/Table';

export const StyledBox = styled(LayoutBox)`
  width: 100%;
`;

type StyledRowProps = {
  line: boolean;
};

export const StyledRow = styled(LayoutRow)<StyledRowProps>`
  padding-bottom: ${({ line }) => (line ? '10px' : '0px')};
  border-bottom: ${({ line, theme }) => (line ? `1px solid ${theme.colors.black}` : 'none')};
`;

export const StyledColumn = styled(LayoutColumn)`
  width: 50%;
`;

export const StyledTable = styled(Table)``;

export const TableBox = styled(LayoutBox)``;
