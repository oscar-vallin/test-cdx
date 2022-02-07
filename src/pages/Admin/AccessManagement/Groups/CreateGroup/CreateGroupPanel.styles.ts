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