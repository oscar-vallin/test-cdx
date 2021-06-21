import styled from 'styled-components';
import { Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { Text } from '../../../components/typography';

export const StyledRow = styled(LayoutRow)`
  padding-bottom: ${({ line }) => (line ? '10px' : '0px')};
  border-bottom: ${({ line, theme }) => (line ? `1px solid ${theme.colors.black}` : 'none')};
`;

export const StyledColumn = styled(LayoutColumn)`
  width: 50%;
`;

export const StyledTitle = styled(Text)`
  &&& {
    text-align: ${({ noData }) => (noData ? 'center' : 'left')};
    color: gray;
    font-size: 0.875rem;
    font-weight: ${({ theme, noData }) => (noData ? theme.fontWeights.bold : theme.fontWeights.normal)};
  }
`;

export const StyledSubtitle = styled(StyledTitle)`
  &&& {
    font-size: 0.75rem;
  }
`;

export const StyledValues = styled(Text)`
  &&& {
    text-align: left;
    color: black;
    font-size: 2.25rem;
    font-weight: 700;
  }
`;
