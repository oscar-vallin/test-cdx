import styled from 'styled-components';
import { Card } from 'src/components/cards';
import { Button } from 'src/components/buttons';
import { Image } from 'src/components/images/Image';
import { Text } from 'src/components/typography';
import { Box, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';

export const StyledBox = styled(Box)<StyledBoxProps>`
  padding: 0px 0px;
`;

type StyledBoxProps = {
  noStyle: boolean;
};

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

export const StyledRowBottom = styled(LayoutRow)<StyledRowBottomProps>`
  && {
    width: 45vw;
    max-width: 500px;
    min-width: 300px;
    margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '15px')};
    padding: 0px 8px;
  }
`;

type StyledRowBottomProps = {
  marginBottom: boolean;
};

export const StyledButton = styled(Button)`
  min-width: 0;
  padding: 0;
  border: none;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

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
