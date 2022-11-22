import styled from 'styled-components';
import { ActionButton, DetailsRow, IconButton, Stack } from '@fluentui/react';
import { device } from 'src/styles/GlobalStyles';

export const ShadowBox = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadows['smallest']};
  border: none;
  border-radius: ${({ theme }) => theme.radius.normal};
  font: ${({ theme }) => theme.fontStyles.normal};
  min-width: unset;
  max-width: unset;
  padding: 10px 15px 15px;
  margin: 0px 5px 20px 5px;

  .ms-CommandBar-primaryCommand {
    justify-content: flex-end;
  }
  
  @media ${device.tablet} {
    margin: 0px 20px 20px 20px;
  }
`;

export const FileMetaDetails = styled.div`

  @media ${device.tablet} {
    margin-top: 10px;
    margin-left: 41px;
  }
`;

export const FileTitle = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.normal};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.neutralPrimary};
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.large};
  }
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

export const WhiteButton = styled(ActionButton)`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px;
  border-radius: 5px;
`;

export const Archive = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadows['smallest']};
  border: none;
  border-radius: ${({ theme }) => theme.radius.normal};
  font: ${({ theme }) => theme.fontStyles.normal};
  min-width: unset;
  max-width: unset;
  width: 100%;
  padding: 10px 10px 0 10px;
  margin-bottom: 10px;

  & a {
    display: inline-block;
    margin-bottom: 10px;
  }
  & span {
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;

export const HeaderStack = styled(Stack)`
  height: 44px;
   
  @media ${device.tablet} {
    margin-left: 25px;
  }
`;

export const PanelFooter = styled.div`
  & .ms-StackItem {
    margin-right: 10px;
  }
`;

export const TabBody = styled.div`
  display: block;
  width: 100%;
  margin: 0;
  padding: 15px 0px;
  
  @media ${device.tablet} {
    padding 15px;
  }
`

export const HelpButton = styled(IconButton)`
  top: -10px;
  height: 25px;
  width: 25px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.neutralLight };
  & i.ms-Icon {
    font-size: ${({ theme }) => theme.fontSizes.small };
    font-weight: bold;
  }
`
