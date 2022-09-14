import { PrimaryButton, SearchBox } from '@fluentui/react';
import styled from 'styled-components';
import { device } from 'src/styles/GlobalStyles';
import { Column } from 'src/components/layouts';

export const PrimaryButtonStyled = styled(PrimaryButton)`
  position: relative;
  bottom: 25px;

  @media ${device.mobileL} {
    position: static;
  }
`;

export const SearchBoxStyled = styled(SearchBox)`
  position: relative;
  bottom: 10px;

  @media (min-width: 770px) {
    position: sticky;
}
`;
export const ColumnStyled = styled(Column)`
  @media (min-width: 770px) {
    align-items: flex-end;
    width: 16%
}
`;
