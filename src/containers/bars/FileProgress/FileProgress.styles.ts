import styled from 'styled-components';
import { Box as LayoutBox } from '../../../components/layouts/Box';
import { Text as ComponentText } from '../../../components/typography/Text';

export const Box = styled(LayoutBox)<BoxProps>`
  width: 100%;
  height: 80%;
  max-width: 300px;
`;

export const Text = styled(ComponentText)`
  color: gray;
  font-size: 0.75rem;
  margin: 1px 2px 5px 2%;
`;

type BoxProps = {
  left: any;
};
