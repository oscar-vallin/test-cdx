import styled from 'styled-components';
import { DetailsRow } from '@fluentui/react';

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
  margin-top: 10px;
  margin-left: 41px;
`;

export const FileTitle = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.large};  
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};  
  text-overflow: ellipsis;
  white-space: nowrap;
`

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
    padding-bottom: 15px;
    
    &:first-child {
      width: 350px;
    }
    
    &:nth-child(2) {
      width: 150px;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
`;

export const StatsRow = styled(DetailsRow)`
  .ms-DetailsRow-cell {
    align-items: center;
    display: flex;
    padding: 0;
    width: 150px !important;

    &:first-child {
      flex-direction: column;
      align-items: flex-start;
      width: 350px !important;
    }
    
    &:nth-child(2) {
      width: 150px;
      flex-direction: column;
      align-content: center;
      align-items: center;
      text-align: center;
    }
  }
`;

export const StatsFooter = styled.div`
  display: flex;
  margin: 10px 0 0;

  div {
    font-size: 0.875rem;
    font-weight 600;
    text-align: left;
    width: 300px;

    &:first-child {
      flex-direction: column;
      align-items: flex-start;
      width: 350px;
    }
    
    &:nth-child(2) {
      width: 150px;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
`;

export const BadgeWrapper = styled.span`
  & span {
    margin-left: .5em;
    height: 1.5em;
  }
`