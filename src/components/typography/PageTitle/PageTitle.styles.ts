import styled from 'styled-components';
import { Spinner } from '@fluentui/react';

export const SubTitle = styled.span`
  display: none;

  @media (min-width: 770px) {
    display: inline;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-flow: column nowrap;

  
  & span {
    font-size: 0.900rem;
  }

  & span: last-child {
    font-size: 0.700rem;
  }
  
  @media (min-width: 770px) {
    display: inline;
    & span {
      font-size: 1.15rem;
      font-weight: 700;
      text-indent: 5px;
    }
    & span: last-child {
      font-size: 1.15rem;
    }
  }
`

export const PaddedSpinner = styled(Spinner)`
  margin-right: 9px;
`;
