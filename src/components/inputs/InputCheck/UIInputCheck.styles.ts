import { Checkbox, Label } from '@fluentui/react';
import styled from 'styled-components';

export const CheckBoxAlignBottom = styled(Checkbox)`
  position: absolute;
  top: 2.3em;
`;

export const InlineLabel = styled(Label)`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.normal ?? '1em'};
`;