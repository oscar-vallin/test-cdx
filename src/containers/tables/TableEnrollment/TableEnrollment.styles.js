import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { Text as ComponentText } from '../../../components/typography/Text';

export const Box = styled(LayoutBox)`
  width: 100%;
`;

export const Row = styled(LayoutRow)`
  width: 100%;
`;

export const Column = styled(LayoutColumn)`
  width: 100%;
`;

export const BoxCaption = styled(Box)`
  padding: 1%;
`;

export const BoxHeader = styled(Box)`
  padding-left: 35px;
`;

export const Text = styled(ComponentText)`
  width: 100%;
  color: gray;
  font-size: 0.875rem;
  padding-left: 1%;
`;
