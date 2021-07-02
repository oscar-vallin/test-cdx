import styled from 'styled-components';
import { Box as LayoutBox, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { Button } from '../../../components/buttons/Button';

export const Container = styled(LayoutBox)`
  width: 80%;
`;

export const Box = styled(LayoutBox)`
  width: 100%;
`;

export const Row = styled(LayoutRow)`
  width: 100%;
  margin: 50px 0 10px;
`;

export const Column = styled(LayoutColumn)`
  width: 40%;
  max-width: 300px;
`;

export const RightColumn = styled(LayoutColumn)`
  width: 40%;
`;

export const StyledButtonAction = styled(Button)`
  /* background-color: ${({ selected }) => (selected ? 'gray' : 'white')}; */
  &&& {
    background: ${({ selected, theme }) => (selected ? theme.colors.themePrimary : theme.colors.neutralLight)};
    color: ${({ selected, theme }) => (selected ? theme.colors.neutralLight : theme.colors.themePrimary)};
    font-weight: ${({ selected, theme }) => (selected ? theme.fontWeights.bold : theme.fontWeights.normal)};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.themePrimary};
  }
`;
