import styled from 'styled-components';
import { Box as LayoutBox } from '../../components/layouts';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { Link } from 'react-router-dom';

export const StyledBox = styled(LayoutBox)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100vw;
`;

export const RouteLink = styled(Link)`
  text-decoration: inherit;
  color: inherit;
`;
