import styled from 'styled-components';
import { DocumentCard } from '@fluentui/react';
import { device } from 'src/styles/GlobalStyles';

export const CardColumn = styled.div`
  display: block;
  margin-top: -60px;
`;

export const CardStyled = styled(DocumentCard)`
  background: ${({ theme }) => theme.colors.neutralLighter};
  border: none;
  border-radius: ${({ theme }) => theme.radius.normal};
  font: ${({ theme }) => theme.fontStyles.normal};
  min-width: unset;
  max-width: unset;
  min-height: 200px;
  width: 100%;
  margin-top: 90px;
  bottom: 70px;

  @media ${device.tablet} {
    margin-top: 0;    
  }

  .ms-DocumentCard {
    &:hover {
      &::after {
        border: none;
      }
    }
  }
`;

export const ContainerInput = styled.div`
  width: 270px;
  margin: 0 auto;
`;

export const StyledIconsComments = styled.div`
  display: flex;
  align-items: center;

  [data-icon-name*='Save'] {
    font-size: 0.9em;
    color: #0078d4;
  }
  [data-icon-name*='Cancel'] {
    font-size: 0.9em;
    color: #0078d4;
    padding-left: 10px;
  }
`;

export const StyledVendorOptions = styled.div`
  width: 242px;
  border: 0px solid black;
  position: absolute;
  z-index: 1;
  top: 65px;
  background-color: #fff;

`
