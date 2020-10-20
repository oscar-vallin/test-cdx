import styled from 'styled-components';
import { Box, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { Card } from '../../../components/cards';
import { Button } from '../../../components/buttons/Button';
import { ButtonAction } from '../../../components/buttons/ButtonAction';
import { Image } from '../../../components/images/Image';
import { Text } from '../../../components/texts/Text';

export const StyledBox = styled(Box)``;

export const StyledCard = styled(Card)`
  /* max-width: 30%; */
`;

export const StyledRow = styled(LayoutRow)`
  && {
    padding: 0px 8px;
  }
`;

export const StyledColumn = styled(LayoutColumn)`
  && {
    padding: 0px 8px;
  }
`;

export const StyledMenuButton = styled(ButtonAction)`
  /* text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')}; */
  font-weight: ${({ theme, selected }) => (selected ? theme.fontWeights.bold : theme.fontWeights.normal)};
  color: ${({ theme }) => theme.colors.white};
  /* text-underline-position: under; */
  border-bottom: white;
  border-bottom-width: 2px;
  border-bottom-style: ${({ selected }) => (selected ? 'double' : 'none')};
`;
