import { Checkbox, Label } from '@fluentui/react';
import styled from 'styled-components';

interface CheckboxProps {
  alignBottom?: boolean;
}

export const CheckBoxAlignBottom = styled(Checkbox)<CheckboxProps>`
  position: ${({ alignBottom }) => (alignBottom ? 'absolute' : 'inherit')};
  top: ${({ alignBottom }) => (alignBottom ? '2.3em' : '0')};
  & .ms-Checkbox-checkbox {
    border-color: ${({ theme }) => theme.colors.neutralPrimary };
  }
`;

export const InlineLabel = styled(Label)`
  display: inline-block;
  margin-left: 5px;
  font-size: ${({ theme }) => theme.fontSizes.normal ?? '1em'};
  color: ${({ theme }) => theme.colors.neutralPrimary };
`;
