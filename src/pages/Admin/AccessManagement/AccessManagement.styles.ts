import styled from 'styled-components';
import { CommandBarButton } from '@fluentui/react';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { Column } from '../../../components/layouts';

export const StyledCommandButton = styled(CommandBarButton)`
  background: transparent;
`;

export const StyledColumn = styled(Column)`
  .ms-Viewport {
    width: 100%;
  }
`;
