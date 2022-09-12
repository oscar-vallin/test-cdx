import styled from 'styled-components';
import { Spinner } from '@fluentui/react';
import { device } from 'src/styles/GlobalStyles';

export const SubTitle = styled.span`
  display: none;

  @media ${device.tablet} {
    display: inline;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-flow: column nowrap;

  .dQDNPY {
    font-size: 0.700rem;
  }
  
  .goQYeA {
    font-size: 0.900rem;
  }

  @media ${device.tablet} {
    display: inline;
    .dQDNPY {
      font-size: 1.15rem;
      font-weight: 700;
      text-indent: 5px;
    }
    .goQYeA {
      font-size: 1.15rem;
    }
  }
`

export const PaddedSpinner = styled(Spinner)`
  margin-right: 9px;
`;
