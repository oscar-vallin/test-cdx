import styled from 'styled-components';
import { DetailsRow, DetailsHeader } from '@fluentui/react';

export const ShadowBox = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadows['smallest']};
  border: none;
  border-radius: ${({ theme }) => theme.radius.normal};
  font: ${({ theme }) => theme.fontStyles.normal};
  min-width: unset;
  max-width: unset;
  padding: 10px 15px 15px;
  margin: 0 20px 20px 20px;
`;

export const FileMetaDetails = styled.div`
  margin-left: 41px;
`;

export const StyledHeaderRow = styled.div`
  display: flex;

  div {
    font-size: 0.875rem;
    font-weight 600;
    text-align: left;
    width: 300px;

    &:first-child {
      width: 500px;
    }
  }
`;

export const StyledVendorHeaderRow = styled(StyledHeaderRow)`
  div {
    &:first-child {
      width: 470px;
    }
  }
`;

export const StyledHeader = styled(DetailsHeader)`
  [role='columnheader'] {
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
    align-items: center;
    display: flex;
    padding: 0;
    width: 150px !important;

    &:first-child {
      width: 470px !important;
    }
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  margin: 10px 0 0;

  div {
    font-size: 0.875rem;
    font-weight 600;
    text-align: left;
    width: 300px;

    &:first-child {
      width: 470px;
    }
  }
`;

export const BadgeWrapper = styled.span`
  & span {
    margin-left: .5em;
    height: 1.5em;
  }
`