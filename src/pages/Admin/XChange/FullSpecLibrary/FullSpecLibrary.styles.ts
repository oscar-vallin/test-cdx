import styled from 'styled-components';
import { DetailsList } from '@fluentui/react';

export const FullSpecList = styled(DetailsList)`
  .ms-GroupHeader-title {
    span {
        color: ${({ theme }) => theme.colors.themePrimary};
        text-decoration: underline;
    }
    .headerCount-228 {
        color: white;
    }
  }
  .ms-DetailsHeader-cell {
    &:first-child {
        [data-icon-name*='Chevron'] {
            font-size: 0em;
          }
    }
  }
  .groupHeaderContainer-227 {
      [data-icon-name*='Chevron'] {
        font-size: 0.75em;
        cursor: pointer;
        transform: translateY(2px);
        color: ${({ theme }) => theme.colors.black};
        font-weight: ${({ theme }) => theme.fontWeights.semiBold};
      }
  }
`;
