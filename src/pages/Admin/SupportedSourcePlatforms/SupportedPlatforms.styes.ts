import styled from 'styled-components';
import { DocumentCard } from '@fluentui/react';
import { device } from 'src/styles/GlobalStyles';

export const CardSupportedStyled = styled(DocumentCard)`
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
  margin-top: 10px;    
  bottom: 0px;
}

.ms-DocumentCard {
  &:hover {
    &::after {
      border: none;
    }
  }
}
`;
