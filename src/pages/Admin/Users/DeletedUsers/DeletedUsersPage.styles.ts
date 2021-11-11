import styled from 'styled-components';
import { Column } from '../../../../components/layouts';

export const StyledColumn = styled(Column)`
  .ms-Viewport,
  & > [class*='root'] {
    width: 100%;
  }
`;
