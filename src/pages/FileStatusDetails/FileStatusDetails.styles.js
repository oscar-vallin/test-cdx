import styled from 'styled-components';
import { Box as LayoutBox } from '../../components/layouts';
import { DetailsRow, DetailsHeader } from 'office-ui-fabric-react/lib/DetailsList';

export const StyledBox = styled(LayoutBox)`
  padding: ${({ theme }) => `0 ${theme.spacing.double}`};
  transform: ${({ theme }) => `translateY(-${theme.spacing.triple})`};
`;

export const StyledHeaderRow = styled.div`
  display: flex;

  div {
    font-size: 14px;
    font-weight 600;
    text-align: left;
    width: 300px;

    &:first-child {
      width: 500px;
    }
  }
`;

export const StyledHeader = styled(DetailsHeader)`
  [role="columnheader"] {
    padding: 0;
    width: 150px !important;

    &:first-child {
      display: none;
    }

    &:nth-child(2) {
      width: 500px !important;
    }

    & span {
      padding: 0;
    }
  }
`;

export const StyledRow = styled(DetailsRow)`
  .ms-DetailsRow-cell {
    padding: 0;
    width: 150px !important;

    &:first-child {
      width: 470px !important;
    }
  }
`;