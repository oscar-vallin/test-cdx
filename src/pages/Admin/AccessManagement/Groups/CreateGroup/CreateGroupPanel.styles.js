import styled from 'styled-components';
import { CommandBarButton } from '@fluentui/react';
import { Column } from '../../../../../components/layouts';

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

export const StyledContainer = styled.div`
  background-color: #f3f2f1;
  padding: 10px;
`;
