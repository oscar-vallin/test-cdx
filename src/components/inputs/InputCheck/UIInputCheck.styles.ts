import { Checkbox, Label } from '@fluentui/react';
import styled from 'styled-components';
import { device } from 'src/styles/GlobalStyles';

interface CheckboxProps {
  alignBottom?: boolean;
}

export const CheckBoxAlignBottom = styled(Checkbox)<CheckboxProps>`
  position: inherit;
  
  @media ${device.mobileL} {
    position: ${({ alignBottom }) => (alignBottom ? 'absolute' : 'inherit')};
    top: ${({ alignBottom }) => (alignBottom ? '2.3em' : '0')};
  }
`;

export const InlineLabel = styled(Label)`
  display: inline-block;
  margin-left: 5px;
`;
