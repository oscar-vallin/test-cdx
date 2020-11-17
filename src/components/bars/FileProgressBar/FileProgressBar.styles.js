import styled, { keyframes } from 'styled-components';
import { Box as LayoutBox } from '../../layouts/Box';

const rotate = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 10rem 0;
  }
`;

export const Box = styled(LayoutBox)`
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

export const Bar = styled(LayoutBox)`
  background: ${({ color }) => color};
  height: 100%;
  min-height: 16px;
  width: 32%;
  margin: 1px 1px;
  border-top-left-radius: ${({ order }) => (order === 0 ? '5px' : '0px')};
  border-bottom-left-radius: ${({ order }) => (order === 0 ? '5px' : '0px')};
  border-top-right-radius: ${({ order }) => (order === 2 ? '5px' : '0px')};
  border-bottom-right-radius: ${({ order }) => (order === 2 ? '5px' : '0px')};
`;

export const BarAnimated = styled(LayoutBox)`
  width: 100%;
  min-height: 16px;
  animation: ${rotate} 3s linear infinite;
  background: repeating-linear-gradient(-45deg, transparent 1px, transparent 30px, white 40px);
`;
