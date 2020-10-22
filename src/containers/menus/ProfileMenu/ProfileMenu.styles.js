import styled from 'styled-components';
import { Box, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { Card } from '../../../components/cards';
import { Button } from '../../../components/buttons/Button';
import { ButtonAction } from '../../../components/buttons/ButtonAction';
import { Image } from '../../../components/images/Image';
import { Text } from '../../../components/texts/Text';

export const StyledBox = styled(Box)`
  padding: 0px 0px;
`;

export const StyledCard = styled(Card)`
  /* max-width: 30%; */
`;

export const StyledRow = styled(LayoutRow)`
  && {
  }
`;

export const StyledColumn = styled(LayoutColumn)`
  && {
    padding: 0px 2px;
  }
`;

export const StyledRowBottom = styled(LayoutRow)`
  && {
    width: 45vw;
    max-width: 500px;
    min-width: 300px;
    margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '15px')};
    padding: 0px 8px;
  }
`;

export const StyledButton = styled(Button)`
  min-width: 0;
  padding: 0;
  border: none;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

export const StyledButtonIcon = styled(ButtonAction)``;

export const StyledImage = styled(Image)`
  width: 100%;
`;

export const StyledText = styled(Text)`
  width: 100%;
`;

export const StyledTitle = styled(Text)`
  font: ${({ theme }) => theme.fontStyles.logo};
  width: 100%;
`;

export const Stylesheet = {
  CardSection: {
    padding: '15px',
  },
};
