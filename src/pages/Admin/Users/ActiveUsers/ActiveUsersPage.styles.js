import styled from 'styled-components';
import { Column } from '../../../../components/layouts';
import { Link } from 'react-router-dom';

export const StyledColumn = styled(Column)`
  .ms-Viewport {
    width: 100%;
  }
`;

export const RouteLink = styled(Link)`
  text-decoration: inherit;
  color: inherit;
`;
