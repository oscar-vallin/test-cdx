import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../layouts';
import { DatePicker } from '@fluentui/react';

export const Box = styled(LayoutBox)`
  width: 100%;
`;

export const Row = styled(LayoutRow)`
  flex-wrap: nowrap;
  width: 100%;

  .ms-DatePicker {
    width: 100%;
  }
`;

export const Column = styled(LayoutColumn)``;

export const ThemedDatePicker = styled(DatePicker)`
  input {
    background-color: ${({ theme }) => theme.colors.neutralLight};
    color: ${({ theme }) => theme.colors.neutralSecondary};
  }
`