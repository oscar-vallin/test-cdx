import styled from 'styled-components';
import { CommandBarButton, DetailsList } from '@fluentui/react';
import { Column } from '../../../../components/layouts';

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
