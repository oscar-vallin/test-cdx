import styled from 'styled-components';
import { Box as LayoutBox } from '../../../components/layouts/Box';
import { Text as ComponentText } from '../../../components/typography/Text';

export const Box = styled(LayoutBox)`
  width: 100%;
  height: 80%;
`;

export const Text = styled(ComponentText)`
  color: gray;
  font-size: 12px;
  margin: 1px 2px 5px 2%;
`;
