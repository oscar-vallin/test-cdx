import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CommandBarButton } from '@fluentui/react';
import { Column } from '../../../../components/layouts';
import { Button } from '../../../../components/buttons/Button';

export const StyledColumn = styled(Column)`
  .ms-Viewport,
  & > [class*='root'] {
    width: 100%;
  }
`;

export const RouteLink = styled(Link)`
  text-decoration: inherit;
  color: white;
`;

export const StyledButtonAction = styled(Button)`
  background: ${({ theme }) => theme.colors.themePrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border: none;

  &:hover {
    background: ${({ theme }) => theme.colors.themePrimary};
  }
`;

export const StyledCommandButton = styled(CommandBarButton)`
  background: transparent;
`;
