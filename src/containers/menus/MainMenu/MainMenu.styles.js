import styled from 'styled-components';
import { Box, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { Card } from '../../../components/cards';
import { ButtonAction } from '../../../components/buttons/ButtonAction';
import { ButtonIcon } from '../../../components/buttons/ButtonIcon';

export const StyledBox = styled(Box)``;

export const StyledCard = styled(Card)`
  /* max-width: 30%; */
`;

export const StyledRow = styled(LayoutRow)`
  && {
    padding: 0px 8px;
    @media (max-width: 1137px) {
      display: flex;
      flex-direction: column;
      z-index: 10000;
      background-color: ${({ theme }) => theme.colors.themePrimary};
      width: ${({ collapse }) => (collapse ? '205px' : '50px')};
      position: absolute;
      top: -17px;
      left: 0;
    }
  }
`;

export const StyledColumn = styled(LayoutColumn)`
  && {
    padding: 0px 8px;
  }
`;

export const StyledMenuButton = styled(ButtonAction)`
  font-weight: ${({ theme, selected }) => (selected ? theme.fontWeights.bold : theme.fontWeights.normal)};
  color: #fff;
  border-bottom: white;
  border-bottom-width: 2px;
  border-bottom-style: ${({ selected }) => (selected ? 'double' : 'none')};
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.colors.neutralLight};
  }

  @media (max-width: 1137px) {
    display: ${({ collapse }) => (collapse ? 'inline-block' : 'none')};
    font-size: 14px;
  }
`;

export const StyledButtonIcon = styled(ButtonIcon)`
  && {
    border: none !important;
    color: #fff !important;
    padding: 0px 8px;
    min-width: 0px;
    display: none;
    @media (max-width: 1137px) {
      display: inline-block;
    }
  }
`;
