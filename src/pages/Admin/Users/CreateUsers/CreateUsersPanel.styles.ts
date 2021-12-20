import styled from 'styled-components';
import { CommandBarButton } from '@fluentui/react';
import { Column, Row } from '../../../../components/layouts';

export const StyledCommandButton = styled(CommandBarButton)`
  background: transparent;
  padding: 8px 16px;
`;

export const StyledColumn = styled(Column)`
  .ms-Viewport {
    width: 100%;
  }

  [class*='ms-Details'] {
    background: transparent;
  }
`;

export const StyledOptionRow = styled(Row)`
  padding: 8px 16px;
`;
