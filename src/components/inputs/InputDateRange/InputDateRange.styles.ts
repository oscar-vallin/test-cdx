import styled from 'styled-components';
import { DatePicker } from '@fluentui/react';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../layouts';

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
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.neutralSecondary};
  }
`;
