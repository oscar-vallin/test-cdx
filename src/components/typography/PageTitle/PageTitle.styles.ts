import styled from 'styled-components';
import { Spinner } from '@fluentui/react';
import { device } from 'src/styles/GlobalStyles';

export const SubTitle = styled.span`
  display: none;

  @media ${device.mobileL} {
    display: inline;
  }
`;

export const PaddedSpinner = styled(Spinner)`
  margin-right: 9px;
`;
