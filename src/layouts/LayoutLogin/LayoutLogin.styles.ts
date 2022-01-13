import styled from 'styled-components';
import { Box, Row as LayoutRow } from 'src/components/layouts';
import { Image } from 'src/components/images/Image';
import { Text } from 'src/components/typography';
import { Card } from 'src/components/cards';
import { PrimaryButton } from '@fluentui/react';

export const BoxStyled = styled(Box)`
  background: linear-gradient(45deg, rgba(0, 166, 202, 1) 0%, rgba(0, 107, 181, 1) 35%, rgba(0, 46, 99, 1) 100%);
  width: 100vw;
  height: 100vh;
`;
export const CenteredWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  min-width: 300px;
  max-width: 600px;
  width: 45vw;
`;

export const K2ULogo = styled(Image)`
  width: 100%;
`;
export const BigTitle = styled(Text)`
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
export const LogoRow = styled(LayoutRow)`
  && {
    margin-bottom: '15px';

    padding: 0px 8px;
  }
`;
export const Card500 = styled(Card)`
  margin: 0 auto;
  padding-bottom: 30px;
  min-width: 300px;
  max-width: 600px;
  width: 45vw;
`;

export const PrimaryButton100 = styled(PrimaryButton)`
  margin-top: ${(props) => props.theme.spacing.normal};
  width: 100%;
`;
