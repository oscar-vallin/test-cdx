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
  min-width: 300px;
  max-width: 530px;
  width: 45vw;
`;

export const StyledCard = styled(Card)`
  margin: 0 auto;
  padding-bottom: 30px;
  min-width: 300px;
  max-width: 530px;
  width: 45vw;
`;

export const StyledRow = styled(LayoutRow)<StyledRowProps>`
  && {
    margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '15px')};

    padding: 0px 8px;
  }
`;

type StyledRowProps = {
  marginTop?: boolean;
};

export const StyledRowBottom = styled(LayoutRow)<StyledRowBottomProps>`
  && {
    margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '15px')};

    padding: 0px 8px;
  }
`;

type StyledRowBottomProps = {
  marginBottom?: boolean;
};

export const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing.normal};

  width: 100%;
`;

// type StyledButtonProps = {
//   onClick?: () => null;
// };

export const StyledButtonIcon = styled(ButtonAction)``;

// type StyledButtonIconProps = {
//   onClick?: () => null;
// };

export const StyledImage = styled(Image)`
  width: 100%;
`;

export const StyledText = styled(Text)`
  width: 100%;
`;

export const StyledTitle = styled(Text)`
  font: ${({ theme }) => theme.fontStyles.logo};
  width: 100%;
  font-size: 4vw;

  @media (min-width: 1250px) {
    font-size: 3.125rem;
  }

  @media (max-width: 750px) {
    font-size: 1.875rem;
  }
`;