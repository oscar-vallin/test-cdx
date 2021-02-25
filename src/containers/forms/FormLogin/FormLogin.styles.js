import styled from 'styled-components';
import { Box, Row as LayoutRow } from '../../../components/layouts';
import { Card } from '../../../components/cards';
import { Button } from '../../../components/buttons/Button';
import { ButtonAction } from '../../../components/buttons/ButtonAction';
import { Image } from '../../../components/images/Image';
import { Text } from '../../../components/typography/Text';

export const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const StyledCard = styled(Card)`
  margin: 0 auto;
  max-width: 530px;
  width: 100%;
  padding-bottom: 30px;
`;

export const StyledRow = styled(LayoutRow)`
  && {
    margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '15px')};

    padding: 0px 8px;
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
  margin-top: ${(props) => props.theme.spacing.normal};

  width: 100%;
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
