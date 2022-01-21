import styled from 'styled-components';
import { Column } from 'src/components/layouts';

export const StyledColumn = styled(Column)`
  .ms-Viewport {
    width: 100%;
  }

  [class*='ms-Details'] {
    background: transparent;
  }
`;

export const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.neutralLighter};
  padding: 10px;
  width: 100%;
`;
