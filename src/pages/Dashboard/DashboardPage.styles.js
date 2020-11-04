import styled from 'styled-components';
import { Row as LayoutRow, Column as LayoutColumn } from '../../components/layouts';

export const StyledRow = styled(LayoutRow)`
  && {
    margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '15px')};
    margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '15px')};
    padding: 0px 8px;
  }
`;

export const StyledColumn = styled(LayoutColumn)`
  && {
    margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '15px')};
    padding: 0px 8px;
  }
`;
