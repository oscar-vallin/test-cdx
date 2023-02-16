import styled from 'styled-components';
import { DetailsList } from '@fluentui/react';

export const FullSpecList = styled(DetailsList)`
  overflow: hidden;
  .ms-GroupHeader-title {
    span {
        color: white;
        &:first-child {
          color: ${({ theme }) => theme.colors.themePrimary};
          text-decoration: underline;
        }
    }
  }
  .ms-DetailsHeader-cell {
    &:first-child {
        [data-icon-name*='Chevron'] {
            font-size: 0em;
          }
    }
  }
  .ms-GroupHeader-expand {
    [data-icon-name*='Chevron'] {
      font-size: 0.80em;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.black};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    }
  }

  .ms-TooltipHost {
    margin: auto;
  }
`;

export const StyledParenSpecOptions = styled.div`
  width: 242px;
  border: 0px solid black;
  position: absolute;
  z-index: 1;
  top: 544px;
  background-color: #fff;

`