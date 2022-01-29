import styled from 'styled-components';
import { Text } from '../../typography';

export const PaginatorWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  transform: translateY(42px);
`;

export const PagingInfo = styled(Text)`
  vertical-align: middle;
  height: 25px;
  padding-left: 10px;
  padding-right: 10px;
`;
