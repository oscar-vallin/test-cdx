import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box as LayoutBox } from '../../components/layouts';

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
