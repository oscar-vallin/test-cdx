import styled from 'styled-components';
import { Box, Row as LayoutRow, Column as LayoutColumn } from '../../../components/layouts';
import { ButtonAction } from '../../../components/buttons/ButtonAction';
// import { Image } from '../../../components/images/Image';
import { Text } from '../../../components/texts/Text';

export const StyledBox = styled(Box)`
  background: ${({ theme }) => theme.colors.navbar};
  height: 48px;
`;

export const StyledRow = styled(LayoutRow)`
  && {
    padding: 0px 8px;
  }
`;

export const StyledColumn = styled(LayoutColumn)`
  && {
    padding: ${({ noPadding }) => (noPadding ? '0px' : '0px 8px')};
  }
`;

export const StyledTitle = styled(Text)`
  font: ${({ theme }) => theme.fontStyles.headerTitle};
  color: ${({ theme }) => theme.colors.white};
  max-width: 20vw;
`;

export const StyledButtonProfile = styled(ButtonAction)`
  && {
    width: 45vw;
    max-width: 500px;
    min-width: 300px;
    margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '15px')};
    padding: 0px 8px;
  }
`;
